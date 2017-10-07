'use strict';

const jsonfile = require("jsonfile"); // https://www.npmjs.com/package/jsonfile


// @constructor
// @parma location relative location of json storage file
function storage(location){
    this.location = location;
}

function readFile(callback){
    try{
        jsonfile.readFile(this.location, function(error, data){
            return callback(error,data);
        });
    }
    catch(error){
        callback(error);
    }
    return callback(new Error('computer broke :<('))
}

function readFileSync(){
    try{
        let data = jsonfile.readFileSync(this.location);
        return data;
    }
    catch(error){
        return error;
    }
}

function writeFile(data, callback){
    jsonfile.watchFile(this.location, data, function(error){
        return callback(error);
    })
}
exports.storage= storage;
exports.readFile = readFile;
exports.readFileSync = readFileSync;
exports.writeFile = writeFile;