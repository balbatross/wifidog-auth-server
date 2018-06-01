var DB = require('./db');

class Clients {
    constructor(){
        this.db = new DB();
    }
    
    updateClient(ip, gateway, mac, url){
        var client = {
            ip: ip,
            gateway: gateway,
            mac: mac,
            redir_url: url
        }
        this.db.client.collection('clients').update({mac: mac}, client, {upsert: true}); 
    }    
    

    getClientByMac(mac, cb){
//        var ip = client_ip.replace('::ffff:', '');
        console.log(ip);
        this.db.client.collection('clients').findOne({mac: mac}, (err, data) => {
            cb(err, data);
        });
    }
}

module.exports = () => {
    return new Clients();
}
