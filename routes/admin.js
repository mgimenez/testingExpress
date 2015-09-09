/* GET home page. */
var admin = require('../controllers/admin/index.js');
var user = require('../controllers/user.js');
var session = require('express-session');

var express = require('express');
var flash = require('express-flash');
var app = module.exports = express();
app.use(session({secret:'somesecrettokenhere'}));
app.use(flash());


app.get('/admin', user.login);
app.post('/admin', user.auth);
