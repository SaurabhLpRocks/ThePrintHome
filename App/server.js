/**
 * Module dependencies
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var join = require('path').join;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require('./config/config');
var port = process.env.PORT || 3000;
//add for Mongo support
var mongoose = require('mongoose');

/**
 * Expose
 */
var app = express();

// Bootstrap models
fs.readdirSync(join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/models', file));
});

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();
function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

// Connect to mongodb

app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat'
}));
module.exports = app;