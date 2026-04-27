'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { DEFAULTS, MODELS } = require('../constants');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');
const runWithRetry = require('../utils/ai-retry');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

/**
 * @description POST /api/predict - Predicts the next election date for a given location
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/', validateFields(['country', 'electionType']), async (req, res) => {
    try {
        const {
            country,
            state,
            voterCardDate,
            electionType = DEFAULTS.ELECTION_TYPE
        } = req.body;

        let knownElections = [];
        try {
            const dataPath = path.join(__dirname, '../../data/elections.json');
            const fileData = fs.readFileSync(dataPath, 'utf8');
            knownElections = JSON.parse(fileData).elections || [];
        } catch (err) {
            logger.error('Error reading elections.json', err);
        }

        // Try to find a known election (prefer exact state match if state is provided)
        let knownMatch = knownElections.find(e =>
            e.country.toLowerCase() === (country || '').toLowerCase() &&
            e.type.toLowerCase() === (electionType || '').toLowerCase() &&
            e.state && e.state.toLowerCase() === (state || '').toLowerCase()
        );

        // If no state match, look for country-wide match
        if (!knownMatch) {
            knownMatch = knownElections.find(e =>
                e.country.toLowerCase() === (country || '').toLowerCase() &&
                e.type.toLowerCase() === (electionType || '').toLowerCase() &&
                !e.state
            );
        }

        const currentYear = new Date().getFullYear();
        let isEligible = true;

        if (voterCardDate) {
            const voterYear = new Date(voterCardDate).getFullYear();
            if (currentYear - voterYear < 18) {
                isEligible = false;
            }
        }

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

        // If not found, use Gemini to estimate
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
        let responseText = result.response.text();

        let prediction;
        try {
            let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            prediction = JSON.parse(cleanJson);
        } catch (e) {
            logger.error('Failed to parse Gemini prediction JSON:', e);
            prediction = {
                nextElectionDate: "Unknown",
                electionName: electionType,
                whatVotingFor: "Representatives",
                isHappeningNow: false
            };
        }

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
            disclaimer: "We're currently having trouble connecting to our AI. Please check the official Election Commission website for the most accurate dates."
        });
    }
});

module.exports = router;
