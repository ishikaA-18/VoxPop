const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

router.post('/', async (req, res) => {
    try {
        const { country, state, voterCardDate, electionType } = req.body;

        let knownElections = [];
        try {
            const dataPath = path.join(__dirname, '../../data/elections.json');
            const fileData = fs.readFileSync(dataPath, 'utf8');
            knownElections = JSON.parse(fileData).elections || [];
        } catch (err) {
            console.error('Error reading elections.json', err);
        }

        // Try to find a known election
        const knownMatch = knownElections.find(e =>
            e.country.toLowerCase() === (country || '').toLowerCase() &&
            e.type.toLowerCase() === (electionType || '').toLowerCase()
        );

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

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' }, { apiVersion: 'v1beta' });
        const result = await model.generateContent(prompt);
        let responseText = result.response.text();

        let prediction;
        try {
            let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            prediction = JSON.parse(cleanJson);
        } catch (e) {
            console.error('Failed to parse Gemini prediction JSON:', e);
            prediction = {
                nextElectionDate: "Unknown",
                electionName: electionType || "General Election",
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
        console.error('Prediction error:', error);
        // Fallback prediction
        res.json({
            nextElectionDate: "Upcoming (Check official ECI schedule)",
            electionName: req.body.electionType || "General Election",
            whatVotingFor: "Democratic Representatives",
            isHappeningNow: false,
            isEligible: true,
            disclaimer: "We're currently having trouble connecting to our AI. Please check the official Election Commission website for the most accurate dates."
        });
    }
});

module.exports = router;
