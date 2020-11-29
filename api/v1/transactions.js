const express = require('express');

const router = express.Router();

const routeHelper = require('../RouteHelper');

router.get('/transaction/:txId', function (req, res) {

  return routeHelper.perform(req, res, 'Transaction');

});

module.exports = router;