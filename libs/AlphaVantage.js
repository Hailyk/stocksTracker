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
    // @parma callback Function
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
            url += "outputsize=compact";
        }
        else {
            url += "outputsize=compact";
        }
        url += "datatype=json";

        request(url, function (error, response, body) {
            if (error) {
                return callback(error);
            }
            if (response.statusCode !== 200) {
                return callback(new Error("Error while requesting data from alphaVentage: /n" + response + "/n" + "body"));
            }

        });
    }
}

module.exports = AlphaVantage;