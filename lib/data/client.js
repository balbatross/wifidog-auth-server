var DB = require('./db');

class Clients {
    constructor(){
        this.db = new DB();
    }
    
    updateClient(ip, gateway, mac){
        var client = {
            ip: ip,
            gateway: gateway,
            mac: mac
        }
        this.db.client.collection('clients').update({mac: mac}, client, {upsert: true}); 
    }    

    get(client_ip){
        var ip = client_ip.replace('::ffff:', '');
        console.log(ip);
    }
}

module.exports = () => {
    return new Clients();
}
