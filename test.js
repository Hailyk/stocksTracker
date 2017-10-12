'use strict';

function importTest(name, path){
    describe(name, ()=>{
        console.log('beginning '+name+' test');
        require(path);
        console.log(name+" test complete");
    });
}

describe('Stock Tracker Unit Test',()=>{
    importTest('DataParser','./test/dataParser.js');
    importTest('AlphaVantage','./test/alphaVantage.js');
});