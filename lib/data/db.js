var MongoClient = require('mongodb').MongoClient;
var conf = require('../../conf');

class DB {
    constructor(opts){
        if(!opts)opts = {};
        this.host = opts.host || conf.mongo.host;
        this.db = opts.db || conf.mongo.db;
        
        MongoClient.connect(this.host, (err, client) => {
            this.clientContainer = client;    
            this.client = client.db(this.db);
        });
    }

    client(){
        return this.client;
    }
    
    close(){
        this.clientContainer.close();
    }
}

module.exports = (opts) => {
    return new DB(opts);
}
