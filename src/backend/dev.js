const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const server = express();
const config = require('../../webpack.config.js');
const compiler = webpack(config);

const app = require('./app')

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
server.use(webpackDevMiddleware(compiler, {
  publicPath: config[0].output.publicPath,
}))

app(server)
const PORT = 8080
server.listen(PORT, function () {
  console.log(`Dev server listening on port ${PORT}`);
});