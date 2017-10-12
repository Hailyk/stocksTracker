'use strict';

class DataParser {
    // @constructor
    // @param data Object, alphaVantage time series data
    constructor(data){
    this.meta = data["Meta Data"];
    this.data = data["Time Series (" + this.meta["4. Interval"] + ")"];
    this.parsedData = {};
    }

    // parse the metadata from alphaVantage
    parseMeta() {
        this.parsedData.info = this.meta["1. Information"];
        this.parsedData.symbol = this.meta["2. Symbol"];
        this.parsedData.lastRefresh = this.meta["3. Last Refreshed"];
        this.parsedData.interval = this.meta["4. Interval"];
        this.parsedData.fullSize = this.meta["5. Output Size"] !== "Compact";
        return null;
    }

    // @param name string, name of parent json
    // @param innerJson Object, time series interval data
    // @return Object, of parsed data
    static innerDataParser(name, innerJson) {
        let innerDataParsed = {};
        innerDataParsed.time = name;
        innerDataParsed.open = innerJson["1. open"];
        innerDataParsed.high = innerJson["2. high"];
        innerDataParsed.low = innerJson["3. low"];
        innerDataParsed.close = innerJson["4. close"];
        innerDataParsed.volume = innerJson["5. volume"];
        return innerDataParsed;
    }

    // parse alphaVantage time series data.
    parseBody() {
        let keyArray = Object.keys(this.data);
        this.parsedData.dataLength = keyArray.length;
        let parsedData = [];
        for (let i = 0; i < this.parsedData.dataLength; i++) {
            let key = keyArray[i];
            let innerJson = this.data[key];
            parsedData[i] = this.constructor.innerDataParser(keyArray[i], innerJson);
        }
        this.parsedData.timeSeriesData = parsedData;
        return null;
    }

    get dataParsed() {
        return this.parsedData;
    }
}
module.exports = DataParser;