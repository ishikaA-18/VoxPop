'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./utils/logger');
const { MESSAGES, STATUS } = require('./constants');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(compression());

/**
 * @description Helmet security headers with Content-Security-Policy
 */
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",          // required for inline scripts in index.html
                "https://www.gstatic.com",  // Firebase SDK
                "https://apis.google.com"   // Google APIs
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",          // required for inline styles
                "https://fonts.googleapis.com"
            ],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: [
                "'self'",
                "https://generativelanguage.googleapis.com",  // Gemini API
                "https://*.googleapis.com",
                "https://*.firebaseio.com"
            ],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    crossOriginEmbedderPolicy: false  // Disable to allow Firebase/Google scripts
}));

const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:8080'];
app.use(cors({
    origin: function (origin, callback) {
        /**
         * @description Validates the origin of the request for CORS
         * @param {string|undefined} origin - The origin of the request
         * @param {function} callback - The CORS callback function
         */
        logger.info('Incoming origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.error('CORS blocked origin:', origin);
            callback(new Error(MESSAGES.ERROR_CORS));
        }
    }
}));

/**
 * @description Parse JSON bodies with a 10kb size limit to prevent abuse
 */
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, '../public')));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Health check endpoint
/**
 * @description Health check endpoint to verify service status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/health', (req, res) => {
    res.json({
        status: MESSAGES.HEALTH_OK,
        service: MESSAGES.APP_NAME,
        version: MESSAGES.APP_VERSION,
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/chat', require('./routes/chat'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/predict', require('./routes/predict'));

// Serve index.html for all other routes (SPA)
/**
 * @description Serves the single page application for all non-API routes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * @description Handles PayloadTooLarge errors when request body exceeds the 10kb limit
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next middleware function
 */
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(STATUS.TOO_LARGE).json({ error: MESSAGES.ERROR_PAYLOAD_TOO_LARGE });
    }
    if (err instanceof SyntaxError && err.status === STATUS.BAD_REQUEST && 'body' in err) {
        return res.status(STATUS.BAD_REQUEST).json({ error: MESSAGES.ERROR_INVALID_JSON });
    }
    logger.error(err.stack);
    // Always respond with a generic message — never forward err.message or err.stack
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.ERROR_INTERNAL });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
