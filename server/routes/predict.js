'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { DEFAULTS, MODELS, MESSAGES, STATUS } = require('../constants');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');
const runWithRetry = require('../utils/ai-retry');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

/**
 * @description Loads known elections from the JSON data file
 * @returns {Array} Array of known elections
 */
const loadKnownElections = () => {
    try {
        const dataPath = path.join(__dirname, '../../data/elections.json');
        if (!fs.existsSync(dataPath)) return [];
        const fileData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileData).elections || [];
    } catch (err) {
        logger.error('Error reading elections.json', err);
        return [];
    }
};

/**
 * @description Finds a matching election from known data
 * @param {Array} elections - List of known elections
 * @param {string} country - The country name
 * @param {string} electionType - The type of election
 * @param {string} state - The state name (optional)
 * @returns {Object|null} Matching election object or null
 */
const findKnownMatch = (elections, country, electionType, state) => {
    const c = (country || '').toLowerCase();
    const t = (electionType || '').toLowerCase();
    const s = (state || '').toLowerCase();

    // Prefer exact state match
    let match = elections.find(e =>
        e.country.toLowerCase() === c &&
        e.type.toLowerCase() === t &&
        e.state && e.state.toLowerCase() === s
    );

    // fallback to country-wide match
    if (!match) {
        match = elections.find(e =>
            e.country.toLowerCase() === c &&
            e.type.toLowerCase() === t &&
            !e.state
        );
    }
    return match;
};

/**
 * @description Checks voter eligibility based on voter card date
 * @param {string} voterCardDate - The date on the voter card
 * @returns {boolean} Whether the user is likely eligible
 */
const checkEligibility = (voterCardDate) => {
    if (!voterCardDate) return true;
    const currentYear = new Date().getFullYear();
    const voterYear = new Date(voterCardDate).getFullYear();
    return (currentYear - voterYear >= 18);
};

/**
 * @description Interacts with AI to estimate an election date
 * @param {string} country - The country
 * @param {string} electionType - The type of election
 * @param {string} state - The state (optional)
 * @returns {Promise<Object>} Estimated prediction object
 */
const fetchAIPrediction = async (country, electionType, state) => {
    const prompt = `Estimate the next ${electionType} election date for ${state ? state + ', ' : ''}${country}. 
Respond with ONLY a valid JSON object in this exact format:
{
  "nextElectionDate": "Month Year or Year",
  "electionName": "Name of the election",
  "whatVotingFor": "Brief description of what is being voted for",
  "isHappeningNow": boolean
}
Do not include any markdown formatting, backticks, or other text.`;

    const model = genAI.getGenerativeModel({ model: MODELS.PREDICT_MODEL }, { apiVersion: 'v1beta' });
    const result = await runWithRetry(() => model.generateContent(prompt));
    const responseText = result.response.text();

    try {
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (e) {
        logger.error('Failed to parse Gemini prediction JSON:', e);
        return {
            nextElectionDate: "Unknown",
            electionName: electionType,
            whatVotingFor: "Representatives",
            isHappeningNow: false
        };
    }
};

/**
 * @description POST /api/predict - Predicts the next election date for a given location
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/', validateFields(['country', 'electionType']), async (req, res) => {
    try {
        const { country, state, voterCardDate, electionType = DEFAULTS.ELECTION_TYPE } = req.body;
        const currentYear = new Date().getFullYear();
        const knownElections = loadKnownElections();
        const knownMatch = findKnownMatch(knownElections, country, electionType, state);
        const isEligible = checkEligibility(voterCardDate);

        if (knownMatch) {
            return res.json({
                nextElectionDate: knownMatch.year.toString(),
                electionName: knownMatch.type,
                whatVotingFor: `Representatives in ${knownMatch.country}`,
                isEligible,
                isHappeningNow: knownMatch.year === currentYear,
                disclaimer: "This date is from our local database and may be subject to change."
            });
        }

        const prediction = await fetchAIPrediction(country, electionType, state);
        res.json({
            ...prediction,
            isEligible,
            disclaimer: "This is an AI-estimated date and may not be 100% accurate. Please verify with official election commission sources."
        });

    } catch (error) {
        logger.error('Prediction error:', error);
        res.json({
            nextElectionDate: "Upcoming (Check official ECI schedule)",
            electionName: req.body.electionType || DEFAULTS.ELECTION_TYPE,
            whatVotingFor: "Democratic Representatives",
            isHappeningNow: false,
            isEligible: true,
            disclaimer: MESSAGES.ERROR_INTERNAL
        });
    }
});

module.exports = router;
