var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');
// var users = require('./routes/user');
var index = require('./routes/index');
var product = require('./routes/category');
var category = require('./routes/product');
var admin = require('./routes/admin');
// var session = require('express-session');
// var flash = require('express-flash');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// app.use(users);
app.use(index);
app.use(product);
app.use(category);
app.use(admin);
// app.use(session({secret:'somesecrettokenhere'}));
// app.use(flash());

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/* Conection to DB */
//mongoose.connect('mongodb://localhost/testingExpresss');
mongoose.connect('mongodb://localhost:27017/testingExpress',function(err){
    if(err) console.log(err);
    if(!err) console.log('connect callback');
});

mongoose.connection.on('connected', function (callback) {
  console.log('connected event trigged');
});

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to Mongo server...');
  console.log(err);
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



/* load all files in models dir */
/*
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});
*/

/* dynamically include routes (Controller) */
/*
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;