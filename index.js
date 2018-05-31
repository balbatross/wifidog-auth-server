var WifiDog = require('./lib/wifidog');
var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var conf = require('./conf');
var fs = require('fs');

var key = fs.readFileSync(conf.ssl.key);
var cert = fs.readFileSync(conf.ssl.cert);

app.use(WifiDog);

http.createServer();

http.get('*', (req, res) => {
    res.redirect('https://'+req.headers.host + req.url);
});

http.listen(80);

https.createServer({
    key: key,
    cert: cert
}, app).listen(443);
