'use strict';

let AlphaVantage = require('../libs/AlphaVantage.js');

let expect = require('chai').expect;

let testObject;


describe('Constructor',()=>{
    it('Construct Object',()=>{
        testObject = new AlphaVantage();
        expect(testObject).to.be.an('object');
    });
});
describe('requestData',()=>{

});