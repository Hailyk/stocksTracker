'use strict';

let AlphaVantage = require('../libs/AlphaVantage.js');
let config = require('../config/alphaVantage.json');

let expect = require('chai').expect;


describe('Constructor',function(){
    it('Construct Object',()=>{
        let testObject = new AlphaVantage(config.key, config.interval, false);
        expect(testObject).to.be.an('object');
    });
});
describe('requestData',function(){
    let testObject = "";
    let error = "";
    let data = "";
    before(function(done){
        testObject = new AlphaVantage(config.key, config.interval, false);
        testObject.requestData('GOOGL',(e,d)=>{
            error = e;
            data = d;
            console.log(data);
            done();
        });
    });
    it('Error should be null', function(done){
        expect(error).to.be.a('null');
        done();
    });
    it('Data should be Json Object',function(done){
        expect(data).to.be.a('object');
        done();
    });
});