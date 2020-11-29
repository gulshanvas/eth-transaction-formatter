const express = require('express');

const router = express.Router();

const v1Routes = require('./v1/index');

router.use('/api', function (req, res, next) {
  v1Routes(req, res, next);
});

module.exports = router;