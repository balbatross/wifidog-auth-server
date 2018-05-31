var router = require('express').Router();
var moment = require('moment');
var Gateways = require('../data/gateway')();

router.get('/ping', (req, res) => {
    var now = moment();
    var ip = req.headers['x-forwared-for'] || req.connection.remoteAddress;

    //Update gateway info
    console.log(req.query.gw_id, ip);
    console.log(req.query.mem_free, req.query.sys_load);
    Gateways.updateGateway(req.query.gw_id, ip, req.query.sys_uptime, req.query.sys_memfree, req.query.sys_load, req.query.wifidog_uptime, Math.floor(now.format('x')));
 
    res.send('Pong');    
});

router.get('/auth', (req, res) => {
    console.log(req.query);    
});

module.exports = router;
