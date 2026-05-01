'use strict';

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');
const { DEFAULTS, LIMITS, MODELS, MESSAGES, DIFFICULTIES } = require('../constants');
const logger = require('../utils/logger');
const runWithRetry = require('../utils/ai-retry');
const { QUIZ_FALLBACK_QUESTIONS } = require('../prompts');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

// Rate limiting
const quizLimiter = rateLimit({
    windowMs: LIMITS.QUIZ_RATE_LIMIT_WINDOW,
    max: LIMITS.QUIZ_RATE_LIMIT_MAX,
    message: { error: MESSAGES.ERROR_RATE_LIMIT }
});

/**
 * @description Generates the AI prompt for quiz generation
 * @param {string} electionType - The type of election
 * @param {string} country - The country
 * @param {string} difficulty - The difficulty level
 * @param {string} language - The selected language
 * @returns {string} The formatted prompt
 */
const generateQuizPrompt = (electionType, country, difficulty, language) => {
    return `Generate exactly ${LIMITS.QUIZ_QUESTION_COUNT} MCQ questions about the ${electionType} election process in ${country}. Difficulty: ${difficulty}. Respond in ${language} using the correct script. Return ONLY valid JSON array: [{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}]. No markdown, no preamble.`;
};

/**
 * @description Parses and cleans the AI response text into JSON
 * @param {string} responseText - Raw text response from AI
 * @returns {Array} Parsed JSON questions array
 * @throws {Error} If JSON parsing fails
 */
const parseQuizResponse = (responseText) => {
    try {
        const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJson);
    } catch (parseError) {
        logger.error('Failed to parse Gemini JSON:', parseError);
        throw new Error('JSON parsing failed');
    }
};

/**
 * @description Fetches quiz questions from Gemini AI
 * @param {string} prompt - The generated prompt
 * @returns {Promise<Array>} Array of questions
 */
const fetchQuizFromAI = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: MODELS.QUIZ_MODEL }, { apiVersion: 'v1beta' });
    const result = await runWithRetry(() => model.generateContent(prompt));
    return parseQuizResponse(result.response.text());
};

/**
 * @description POST /api/quiz - Generates or retrieves election quiz questions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/', quizLimiter, async (req, res) => {
    try {
        const {
            country = DEFAULTS.COUNTRY,
            electionType = DEFAULTS.ELECTION_TYPE,
            difficulty = DEFAULTS.DIFFICULTY,
            selectedLanguage = DEFAULTS.LANGUAGE
        } = req.body;

        const finalDifficulty = DIFFICULTIES.includes(difficulty) ? difficulty : DEFAULTS.DIFFICULTY;
        const prompt = generateQuizPrompt(electionType, country, finalDifficulty, selectedLanguage);
        
        const questions = await fetchQuizFromAI(prompt);
        res.json({ questions });

    } catch (error) {
        logger.error('Quiz error:', error);
        res.json({ questions: QUIZ_FALLBACK_QUESTIONS });
    }
});

module.exports = router;
