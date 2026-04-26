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
    }
};
