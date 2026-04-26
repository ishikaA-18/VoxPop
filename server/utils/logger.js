'use strict';

/**
 * Simple logger to replace console.log
 */
const logger = {
    info: (...args) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('[INFO]', ...args);
        }
    },
    error: (...args) => {
        console.error('[ERROR]', ...args);
    },
    warn: (...args) => {
        console.warn('[WARN]', ...args);
    }
};

module.exports = logger;
