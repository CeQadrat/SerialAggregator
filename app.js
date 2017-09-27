const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexRoute = require('./routes/index');
let generators = {};
const seriesRoute = require('./routes/getSeries')(generators);
const authRoute = require('./routes/authentication')(passport);

let app = express();

//mongoose config
require('./db/mongoose')(mongoose);

//passport navbar config
require('./auth/passportConfig')(passport);
require('./auth/oauthFacebook')(passport);
require('./auth/oauthGoogle')(passport);
require('./auth/oauthTwitter')(passport);
require('./auth/oauthVK')(passport);

let mongoStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24*60*60
});
mongoStore.on('destroy', (sessionID) => {
    delete generators[sessionID];
    console.log('destroy session');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/fonts', express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-social'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    name: 'sessionID',
    secret: 'keyboard cat',
    resave: false,
    cookie:  { path: '/', httpOnly: true, secure: false, maxAge: 24*60*60*1000 },
    saveUninitialized: true,
    store: mongoStore
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/', indexRoute);
app.use('/getSeries', seriesRoute);
app.use('/auth', authRoute);

module.exports = app;