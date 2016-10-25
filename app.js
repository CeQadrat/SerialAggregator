const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const indexRoute = require('./routes/index');
const seriesRoute = require('./routes/getSeries');
const authRoute = require('./routes/authentication')(passport);

//mongoose config
require('./db/mongoose')(mongoose);

//passport navbar config
require('./auth/passportConfig')(passport);
require('./auth/oauthFacebook')(passport);
require('./auth/oauthGoogle')(passport);
require('./auth/oauthTwitter')(passport);
require('./auth/oauthVK')(passport);

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-social'));
app.use('/', express.static(__dirname + '/lib/font-awesome-4.6.3'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/', indexRoute);
app.use('/getSeries', seriesRoute);
app.use('/auth', authRoute);

module.exports = app;