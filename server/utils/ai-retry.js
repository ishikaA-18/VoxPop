'use strict';

const logger = require('./logger');
const { STATUS } = require('../constants');

/**
 * @description Runs a function with exponential backoff on 429 (Too Many Requests) errors
 * @param {Function} fn - The async function to run
 * @param {number} [maxRetries=3] - Maximum number of retries
 * @param {number} [initialDelay=2000] - Initial delay in ms
 * @returns {Promise<any>} The result of the function execution
 * @throws {Error} The last error encountered if all retries fail
 */
async function runWithRetry(fn, maxRetries = 3, initialDelay = 2000) {
    let lastError;
    const TOO_MANY_REQUESTS = 429;

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            
            // Check if it's a 429 error (Rate limit exceeded)
            const isRateLimit = error.status === TOO_MANY_REQUESTS || 
                               (error.message && error.message.includes(TOO_MANY_REQUESTS.toString())) ||
                               (error.statusText && error.statusText.includes('Too Many Requests'));

            if (isRateLimit && i < maxRetries) {
                const delay = initialDelay * Math.pow(2, i);
                logger.warn(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error;
        }
    }
    throw lastError;
}

module.exports = runWithRetry;
