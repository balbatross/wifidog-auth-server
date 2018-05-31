var db = require('./db')();

class Gateways {
    constructor(){
        
    }   

    updateGateway(id, ip, uptime, memory, load, gateway_uptime, ts){
        var gateway = {
            id: id,
            ip_addr: ip,
            sys_uptime: uptime,
            mem_free: memory,
            sys_load: load,
            wifidog_uptime: gateway_uptime,
            ts: ts
        }
        db.client().collection('gateway').update({id: id}, gateway, {upsert: true}, (err, d) => {
            console.log("Saved gateway id: ", id);
        });
    }
}

module.exports = () => {
    return new Gateways();
}
