var DB = require('./db');

class Gateways {
    constructor(){
        this.db =  new DB();        
    }   

    updateGateway(id, ip, uptime, memory, load, gateway_uptime, ts){
        var gateway = {
            id: id,
            ip_addr: ip.replace('::ffff:', ''),
            sys_uptime: uptime,
            mem_free: memory,
            sys_load: load,
            wifidog_uptime: gateway_uptime,
            ts: ts
        }
        this.db.client.collection('gateway').update({id: id}, gateway, {upsert: true}, (err, d) => {
            console.log("Saved gateway id: ", id);
        });
    }
}

module.exports = () => {
    return new Gateways();
}
