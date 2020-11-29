const express = require('express');

const router = express.Router();

const transactionsApi = require('./transactions');

router.use('/v1', transactionsApi);

module.exports = router;



