'use strict';

function dataParser(data){
    this.meta = data["Meta Data"];
    this.data = data["Time Series ("+ this.meta.interval +")"];
    this.parsedData = {};
}

function parseMeta(){
    this.parsedData.info = this.meta["1. Information"];
    this.parsedData.symbol = this.meta["2. Symbol"];
    this.parsedData.lastRefresh = this.meta["3. Last Refreshed"];
    this.parsedData.interval = this.meta["4. Interval"];
    if(this.meta["5. Output Size"] == "Full size"){
        this.parsedData.fullSize = true;
    }
    else{
        this.parsedData.fullSize = false;
    }
}