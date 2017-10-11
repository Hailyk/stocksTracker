'use strict';

const request = require('request'); //https://www.npmjs.com/package/request


// @constructor
// @parma apiKey alphaVantage API key
function alphaVantage(apiKey, interval, full){
    this.key = apiKey;
    this.interval = interval;
    this.full = full;
}

function requestData(symbol, callback){
    if(symbol === undefined){
        callback(new Error("No symbol specified"));
    }
    if(this.interval === undefined){
        this.interval = "15min";
    }
    
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY";
    url += "&symbol=" + symbol;
    url += "&interval=" + this.interval;
    if(this.full){
        url += "outputsize=compact";
    }
    else{
        url += "outputsize=compact";
    }
    url += "datatype=json";
    
    request(url, function(error, response, body){
        if(error){
            return callback(error);
        }
        if(response.statusCode !== 200){
            return callback(new Error("Error while requesting data from alphaVentage: /n"+ response +"/n"+"body"));
        }
        
    });
}