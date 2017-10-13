'use strict';

let AlphaVantage = require('../libs/AlphaVantage.js');
let config = require('../config/alphaVantage.json');

let expect = require('chai').expect;

let testObject, e,d;

describe('Constructor',function(){
    it('Construct Object',()=>{
        let testObject = new AlphaVantage(config.key, config.interval, false);
        expect(testObject).to.be.an('object');
    });
});
describe('requestData',function(){
    before(function (done) {
        testObject = new AlphaVantage(config.key, config.interval, false);
        testObject.requestData('GOOGL',(error,data)=> {
            e = error;
            d = data;
            done();
        });
    });
    it('Error should be null', function(){
        expect(e).to.be.a('null');
    });
    it('Data should be Json Object',function(){
        expect(d).to.be.a('object');
    });
    describe('Checking JSON structure', function () {
        it('Should have Meta Data and Time Series', function () {
            expect(d, 'missing Meta Data property').to.have.property('Meta Data');
            expect(d, 'missing Meta Data property').to.have.property('Time Series ('+config.interval+')');
        });
        it('Meta Data contain data', function () {
            expect(d['Meta Data']).to.have.all.keys("1. Information", "2. Symbol", "3. Last Refreshed", "4. Interval", "5. Output Size", "6. Time Zone");
        });
        it('Time Series Contain Data', function () {
            expect(d['Time Series ('+config.interval+')']).to.not.be.empty;
        })
    })
});