const express = require('express');
const router = express.Router();

router.get('/wait-time', (req, res) => {
    res.json({ waitTime: '15 mins' });
});

module.exports = router;
