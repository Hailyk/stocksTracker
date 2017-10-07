'use strict';

const storage =  require('./lib/storage.js');

// @constructor
// @parma location relative location of json storage file
function keyValueStorage(location){
    this.location = location;
    this.$storage = new storage(location);
    this.json = this.$storage.readFileSync();
    this.json.lastRead = Date.now();
    
}

function updateModifiedtime(time){
    if(time == undefined){
        time = Date.now();
    }
    this.json.lastModifiedTime = time;
}

function getValue(key){
    if(key == undefined){
        return this.json;
    }
    return this.json[key];
}

function setValue(key,value){
    if(key == undefined){
        throw new Error("undefined key value");
    }
    this.json[key] = value;
}

function syncJson(callback){
    this.$storage.readFile(function(err,data){
       if(err){
           return callback(err);
       }
       if(data.lastModifiedTime == this.json.lastModifiedTime){
           return callback();
       }
       else if(data.lastModifiedTime > this.json.lastModifiedTime){
           console.warn("Warning: Unsafe opperation, there may be another process accessing: "+ this.location);
       }
       this.json = data;
       return callback();
    });
}

exports.keyValueStorage = keyValueStorage;
exports.updateModifiedtime = updateModifiedtime;
exports.getValue = getValue;
exports.setValue = setValue;
exports.syncJson = syncJson;