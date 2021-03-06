var WifiDog = require('./lib/wifidog');
var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var conf = require('./conf');
var fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);

var key = fs.readFileSync(conf.ssl.key);
var cert = fs.readFileSync(conf.ssl.cert);
var redisStore = new RedisStore();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(WifiDog(redisStore));

http.createServer(app).listen(80);

https.createServer({
    key: key,
    cert: cert
}, app).listen(443);
