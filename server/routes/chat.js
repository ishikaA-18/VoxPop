'use strict';

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');
const { DEFAULTS, LIMITS, MODELS, PERSONALITY_LIMITS } = require('../constants');
const logger = require('../utils/logger');
const { validateFields } = require('../utils/validation');

const { CHAT_SYSTEM_PROMPT, FALLBACK_MESSAGES } = require('../prompts');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder');

// Rate limiting
const chatLimiter = rateLimit({
    windowMs: LIMITS.CHAT_RATE_LIMIT_WINDOW,
    max: LIMITS.CHAT_RATE_LIMIT_MAX,
    message: { error: 'Too many requests, please try again later.' }
});

// Cache for chat responses
const chatCache = new Map();

/**
 * @description POST /api/chat - Handles AI chat interactions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/', chatLimiter, validateFields(['message']), async (req, res) => {
    try {
        const {
            message,
            country = DEFAULTS.COUNTRY,
            electionType = DEFAULTS.ELECTION_TYPE,
            personalityMode = DEFAULTS.PERSONALITY_MODE,
            conversationHistory = [],
            selectedLanguage = DEFAULTS.LANGUAGE
        } = req.body;

        // Check cache
        const cacheKey = `${message}|${country}|${personalityMode}|${selectedLanguage}`;
        const cachedResponse = chatCache.get(cacheKey);
        if (cachedResponse && (Date.now() - cachedResponse.timestamp < LIMITS.CACHE_TTL)) {
            logger.info('Serving from cache:', cacheKey);
            return res.json({ reply: cachedResponse.reply, cached: true });
        }

        let sanitizedMessage = message.replace(/<[^>]*>?/gm, '').trim();

        if (sanitizedMessage.length === 0) {
            return res.status(400).json({
                error: 'Message content is invalid or empty after sanitization.',
                field: 'message'
            });
        }

        if (sanitizedMessage.length > LIMITS.CHAT_MESSAGE_MAX_LENGTH) {
            sanitizedMessage = sanitizedMessage.substring(0, LIMITS.CHAT_MESSAGE_MAX_LENGTH);
        }

        const systemPrompt = CHAT_SYSTEM_PROMPT(
            selectedLanguage,
            personalityMode,
            country,
            electionType,
            PERSONALITY_LIMITS.genZ,
            PERSONALITY_LIMITS.classic,
            PERSONALITY_LIMITS.simple
        );

        const model = genAI.getGenerativeModel(
            { model: MODELS.CHAT_MODEL, systemInstruction: systemPrompt },
            { apiVersion: 'v1beta' }
        );

        const formattedHistory = conversationHistory.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content || msg.text }]
        }));

        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(sanitizedMessage);
        const reply = result.response.text();

        // Store in cache
        chatCache.set(cacheKey, { reply, timestamp: Date.now() });

        res.json({ reply });
    } catch (error) {
        logger.error('Chat error:', error);
        const lang = req.body.selectedLanguage || DEFAULTS.LANGUAGE;
        const fallback = FALLBACK_MESSAGES[lang] || FALLBACK_MESSAGES['English'];
        res.json({ reply: fallback });
    }
});

module.exports = router;