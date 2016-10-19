const express = require('express');
const routes = require('./routes/index');
const rout = require('./routes/getSeries');
const auth = require('./routes/authentication');
const path = require('path');
const firebase = require("firebase");

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));

app.use('/', routes);
app.use('/getSeries', rout);
app.use('/', auth);

module.exports = app;