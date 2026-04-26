const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

// Rate limiting
const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: { error: 'Too many requests, please try again later.' }
});

router.post('/', chatLimiter, async (req, res) => {
    try {
        const { message, country, electionType, personalityMode, conversationHistory = [], selectedLanguage = 'English' } = req.body;

        let sanitizedMessage = message || '';
        sanitizedMessage = sanitizedMessage.replace(/<[^>]*>?/gm, '');
        sanitizedMessage = sanitizedMessage.trim();
        if (sanitizedMessage.length > 500) {
            sanitizedMessage = sanitizedMessage.substring(0, 500);
        }

        const systemPrompt = `You are VoxPop, a friendly non-partisan election education assistant serving voters across all of India and the world.

Language instruction: The user has selected ${selectedLanguage}. You MUST respond entirely in that language. If the language uses a non-Latin script (Bengali, Tamil, Telugu, Hindi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Urdu, Assamese etc.) — write in that script, not transliteration. If selectedLanguage is English, respond in English.

Personality: ${personalityMode}. Country: ${country}. Election type: ${electionType}.

Rules:
1) Never express political opinions or favor any party.
2) Never hallucinate election laws or dates — if uncertain, say so.
3) For India reference ECI guidelines and helpline 1950 (voters.eci.gov.in).
4) Always encourage voting.
5) On safety/secrecy questions: confidently explain ballot is 100% anonymous under the Representation of the People Act 1951.
6) Keep responses under word limit for personality mode.
7) End with one engaging follow-up question in the same language.
8) genZ mode: casual, memes/pop culture analogies, max 80 words.
9) classic mode: formal, cite laws/articles, historical context, max 200 words.
10) simple mode: friendly analogy first sentence, zero jargon, max 60 words.`;

        const model = genAI.getGenerativeModel(
            { model: 'gemini-2.0-flash', systemInstruction: systemPrompt },
            { apiVersion: 'v1beta' }
        );

        const formattedHistory = conversationHistory.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content || msg.text }]
        }));

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(sanitizedMessage);
        const reply = result.response.text();

        res.json({ reply });
    } catch (error) {
        console.error('Chat error:', error);
        res.json({ reply: "VoxPop is thinking... I'm having a little trouble connecting to my AI brain right now. Please try again in a moment! In the meantime, remember that your vote is your voice! 🗳️" });
    }
});

module.exports = router;