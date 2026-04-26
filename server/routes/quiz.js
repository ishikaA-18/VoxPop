'use strict';

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');
const { DEFAULTS, LIMITS, MODELS } = require('../constants');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

// Rate limiting
const quizLimiter = rateLimit({
    windowMs: LIMITS.QUIZ_RATE_LIMIT_WINDOW,
    max: LIMITS.QUIZ_RATE_LIMIT_MAX,
    message: { error: 'Too many requests, please try again later.' }
});

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

        const validDifficulties = ['Easy', 'Medium', 'Hard'];
        const finalDifficulty = validDifficulties.includes(difficulty) ? difficulty : DEFAULTS.DIFFICULTY;

        const prompt = `Generate exactly ${LIMITS.QUIZ_QUESTION_COUNT} MCQ questions about the ${electionType} election process in ${country}. Difficulty: ${finalDifficulty}. Respond in ${selectedLanguage} using the correct script. Return ONLY valid JSON array: [{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}]. No markdown, no preamble.`;

        const model = genAI.getGenerativeModel({ model: MODELS.QUIZ_MODEL }, { apiVersion: 'v1beta' });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        try {
            let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const questions = JSON.parse(cleanJson);
            res.json({ questions });
        } catch (parseError) {
            logger.error('Failed to parse Gemini JSON:', parseError);
            throw new Error('JSON parsing failed');
        }

    } catch (error) {
        logger.error('Quiz error:', error);
        // Fallback questions (ensure 5 items)
        const fallbackQuestions = [
            {
                question: "What is the minimum voting age in India?",
                options: ["16", "18", "21", "25"],
                correctIndex: 1,
                explanation: "The minimum voting age in India is 18 years, established by the 61st Constitutional Amendment Act in 1988."
            },
            {
                question: "What does EVM stand for?",
                options: ["Electronic Voting Machine", "Election Verification Method", "Electoral Vote Monitor", "Early Voting Mechanism"],
                correctIndex: 0,
                explanation: "EVM stands for Electronic Voting Machine, which is used to record votes in Indian elections securely."
            },
            {
                question: "Who conducts the Lok Sabha elections in India?",
                options: ["Supreme Court of India", "President of India", "Election Commission of India", "Parliament"],
                correctIndex: 2,
                explanation: "The Election Commission of India (ECI) is the autonomous constitutional authority responsible for administering election processes in India."
            },
            {
                question: "How often are general elections held in India?",
                options: ["Every 4 years", "Every 5 years", "Every 6 years", "Every 10 years"],
                correctIndex: 1,
                explanation: "General elections for the Lok Sabha are held every five years, unless the house is dissolved earlier."
            },
            {
                question: "What is the color of the ink used to mark a voter's finger?",
                options: ["Red", "Blue", "Purple (Indelible Ink)", "Black"],
                correctIndex: 2,
                explanation: "Indelible ink, which is purple in color, is applied to the left forefinger of voters to prevent multiple voting."
            }
        ];
        res.json({ questions: fallbackQuestions });
    }
});

module.exports = router;
