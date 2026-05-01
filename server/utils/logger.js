'use strict';

/**
 * @description Simple server-side logger that wraps console methods.
 * Info logging is suppressed in production.
 */
const logger = {
    /**
     * @description Log informational messages (suppressed in production)
     * @param {...*} args - Arguments to log
     */
    info: (...args) => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('[INFO]', ...args);
        }
    },
    /**
     * @description Log error messages
     * @param {...*} args - Arguments to log
     */
    error: (...args) => {
        console.error('[ERROR]', ...args);
    },
    /**
     * @description Log warning messages
     * @param {...*} args - Arguments to log
     */
    warn: (...args) => {
        console.warn('[WARN]', ...args);
    }
};

module.exports = logger;
