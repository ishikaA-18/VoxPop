'use strict';

const logger = require('./logger');
const { STATUS } = require('../constants');

/**
 * @description Middleware factory to validate required fields in request body.
 * Returns a 400 error if any required field is missing or empty.
 * @param {string[]} requiredFields - Array of field names that must be present
 * @returns {Function} Express middleware function
 */
const validateFields = (requiredFields) => {
    /**
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Next middleware function
     */
    return (req, res, next) => {
        for (const field of requiredFields) {
            if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
                logger.warn(`Missing required field: ${field}`);
                return res.status(STATUS.BAD_REQUEST).json({
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
