'use strict';

const logger = require('./logger');

/**
 * Middleware to validate required fields in request body
 * @param {string[]} requiredFields - Array of field names that must be present
 * @returns {Function} Express middleware function
 */
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        for (const field of requiredFields) {
            if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
                logger.warn(`Missing required field: ${field}`);
                return res.status(400).json({
                    error: `${field} field is required`,
                    field: field
                });
            }
        }
        next();
    };
};

module.exports = {
    validateFields
};
