const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

// Rate limiting
const quizLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute per IP
    message: { error: 'Too many requests, please try again later.' }
});

router.post('/', quizLimiter, async (req, res) => {
    try {
        const { country = 'India', electionType = 'General Election', difficulty = 'Medium', selectedLanguage = 'English' } = req.body;

        const prompt = `Generate exactly 5 MCQ questions about the ${electionType} election process in ${country}. Difficulty: ${difficulty}. Respond in ${selectedLanguage} using the correct script. Return ONLY valid JSON array: [{"question":"...","options":["...","...","...","..."],"correctIndex":0,"explanation":"..."}]. No markdown, no preamble.`;

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' }, { apiVersion: 'v1beta' });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        try {
            // Attempt to parse the JSON
            let cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const questions = JSON.parse(cleanJson);
            res.json({ questions });
        } catch (parseError) {
            console.error('Failed to parse Gemini JSON:', parseError);
            console.error('Raw response:', responseText);
            throw new Error('JSON parsing failed');
        }

    } catch (error) {
        console.error('Quiz error:', error);
        // Fallback questions
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
            }
        ];
        res.json({ questions: fallbackQuestions });
    }
});

module.exports = router;
