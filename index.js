var WifiDog = require('./lib/wifidog');
var express = require('express');
var app = express();

app.use(WifiDog);
app.listen(80);
