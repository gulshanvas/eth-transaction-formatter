'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./api/index');
const server = express()
server.set('port', process.env.PORT || 8080);

server.use(bodyParser.json())
server.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Internal server error')
})

server.use('/eth', apiRoutes);

const start = () => {
  server.listen(server.get('port'), function () {
    console.log(`router started on http://localhost:${server.get('port')}; press Ctrl-C to terminate.`)
  })
}

start();