'use strict';

module.exports = {
    DEFAULTS: {
        COUNTRY: 'India',
        LANGUAGE: 'English',
        PERSONALITY_MODE: 'simple',
        ELECTION_TYPE: 'General Election',
        DIFFICULTY: 'Medium'
    },
    LIMITS: {
        CHAT_MESSAGE_MAX_LENGTH: 500,
        CHAT_HISTORY_MAX_LENGTH: 10,
        CHAT_RATE_LIMIT_MAX: 10,
        CHAT_RATE_LIMIT_WINDOW: 60 * 1000,
        QUIZ_RATE_LIMIT_MAX: 5,
        QUIZ_RATE_LIMIT_WINDOW: 60 * 1000,
        QUIZ_QUESTION_COUNT: 5,
        CACHE_TTL: 5 * 60 * 1000 // 5 minutes
    },
    MODELS: {
        CHAT_MODEL: 'gemini-2.0-flash',
        QUIZ_MODEL: 'gemini-2.0-flash-lite',
        PREDICT_MODEL: 'gemini-2.0-flash-lite'
    },
    PERSONALITY_LIMITS: {
        genZ: 80,
        classic: 200,
        simple: 60
    },
    MESSAGES: {
        ERROR_INTERNAL: 'Something went wrong!',
        ERROR_CORS: 'Not allowed by CORS',
        ERROR_RATE_LIMIT: 'Too many requests, please try again later.',
        ERROR_INVALID_MESSAGE: 'Message content is invalid or empty after sanitization.',
        ERROR_PAYLOAD_TOO_LARGE: 'Request body exceeds the 10kb size limit.',
        ERROR_INVALID_JSON: 'Request body contains invalid JSON.',
        HEALTH_OK: 'ok',
        APP_NAME: 'VoxPop',
        APP_VERSION: '1.0.0'
    },
    ROLES: {
        USER: 'user',
        MODEL: 'model',
        BOT: 'bot'
    },
    DIFFICULTIES: ['Easy', 'Medium', 'Hard'],
    STATUS: {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        TOO_LARGE: 413,
        INTERNAL_SERVER_ERROR: 500
    }
};
