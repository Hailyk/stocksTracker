'use strict';

const request = require('request'); //https://www.npmjs.com/package/request

class AlphaVantage {

    // @constructor
    // @parma apiKey String, alphaVantage API key
    // @parma interval String, 1min, 5min, 15min, 30min, 60min 
    constructor(apiKey, interval, full) {
        this.key = apiKey;
        this.interval = interval;
        this.full = full;
    }
    
    // get data from alphaVantage
    // @parma symbol String, stock symbol
    // @parma callback Function, Function:
    // @Callback parma error Error Object
    // @Callback parma data Json Object
    requestData(symbol, callback) {
        if (symbol === undefined) {
            callback(new Error("No symbol specified"));
        }
        if (this.interval === undefined) {
            this.interval = "15min";
        }

        let url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY";
        url += "&symbol=" + symbol;
        url += "&interval=" + this.interval;
        if (this.full) {
            url += "&outputsize=compact";
        }
        else {
            url += "&outputsize=compact";
        }
        url += "&datatype=json";
        url += "&apikey="+this.key;
        request(url, function (error, response, body) {
            body = JSON.parse(body);
            if (error) {
                return callback(error);
            }
            else if (response.statusCode !== 200) {
                return callback(new Error("Error while requesting data from alphaVentage: /n" + response + "/n" + body));
            }
            else{
                return callback(null,body);
            }
        });
    }
}

module.exports = AlphaVantage;