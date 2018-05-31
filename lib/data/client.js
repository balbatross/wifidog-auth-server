var db = require('./db')();

class Clients {
    constructor(){

    }

    get(client_ip){
        var ip = client_ip.replace('::ffff:', '');
        console.log(ip);
    }
}

module.exports = () => {
    return new Clients();
}
