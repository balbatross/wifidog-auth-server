var WifiDog = require('./lib/wifidog');
var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var conf = require('./conf');
var fs = require('fs');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var key = fs.readFileSync(conf.ssl.key);
var cert = fs.readFileSync(conf.ssl.cert);

app.use(cookieParser());
app.use(session({
    name: 'app.sid',
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(WifiDog);

http.createServer(app).listen(80);

https.createServer({
    key: key,
    cert: cert
}, app).listen(443);
