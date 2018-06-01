var express = require('express');
var router = require('express').Router();
var moment = require('moment');
var Gateways = require('../data/gateway')();
var Clients = require('../data/client')();
var authTypes = require('./authTypes');
var uuid = require('uuid');

module.exports = (store) => {

router.get('/ping', (req, res) => {
    var now = moment();
    var ip = req.headers['x-forwared-for'] || req.connection.remoteAddress;

    //Update gateway info
    Gateways.updateGateway(req.query.gw_id, ip, req.query.sys_uptime, req.query.sys_memfree, req.query.sys_load, req.query.wifidog_uptime, Math.floor(now.format('x')));
 
    res.send('Pong');    
});

router.get('/auth', (req, res) => {    
    console.log(req.query);    
    var auth = authTypes.AUTH_DENIED;
    var now = moment();
    var nowInSeconds = Math.floor(now.format('x'));
    
    Clients.getClientByMac(req.query.mac, (err, client) => {
        if(!err && client){
            
        }else{

        }
    }); 
});

router.post('/auth', (req, res) => {
    //Authenticate here
    Clients.getClientByMac(req.session.mac, (err, client) => {
        console.log(err, client);
    });
    console.log(req.session);
    store.get(req.cookies['app.sid'], (err, session) => {
        console.log(err, session);
    });
    console.log(req.cookies);
    console.log(req.signedCookies); 
});

router.get('/login', (req, res) => {
    var id = uuid.v4();
    Clients.updateClient(req.query.ip, req.query.gw_id, req.query.mac, req.query.url, id);

    res.cookie('session', id);
    res.sendFile(__dirname + '/portal/build/index.html');
});

router.use('/login', express.static(__dirname + '/portal/build'));

return router;
}

