'use strict';

let DataParser =  require("../libs/DataParser.js");
let testData =  require("./testData.json");

let expect = require('chai').expect;

let testObject;


describe('Constructor',()=>{
    it('Construct Object',()=>{
        testObject = new DataParser(testData);
        expect(testObject).to.be.an('object');
    });
    it('Should have no parsed data',()=>{
        expect(Object.keys(testObject.dataParsed).length === 0);
    });
});
describe('parseMeta',()=>{
    it('Should return null',()=>{
        expect(testObject.parseMeta()).to.be.a('null');
    });
    it('Should parse meta data',()=>{
        expect(Object.keys(testObject.dataParsed).length).to.be.at.above(0);
    });
    it('Should have at least 5 meta data',()=>{
        expect(Object.keys(testObject.dataParsed).length).to.be.at.least(5);
    });
    it('Should have properties',()=>{
        expect(testObject.dataParsed, 'missing info property').to.have.property("info");
        expect(testObject.dataParsed, 'missing symbol property').to.have.property("symbol");
        expect(testObject.dataParsed, 'missing lastRefresh property').to.have.property("lastRefresh");
        expect(testObject.dataParsed, 'missing interval property').to.have.property("interval");
        expect(testObject.dataParsed, 'missing fullSize property').to.have.property("fullSize");
    });
});
describe('parseBody',()=>{
    testObject = new DataParser(testData);
    it('Should return null',()=>{
        expect(testObject.parseBody()).to.be.a('null');
    });
    it('Should parse body',()=>{
        expect(Object.keys(testObject.dataParsed).length).to.be.at.above(0);
    });
    it('Should be an Array',()=>{
        expect(testObject.dataParsed.timeSeriesData).to.be.an('array');
    });
    it('Should have a dataLength',()=>{
        expect(testObject.dataParsed).to.have.property("dataLength");
    });
    it('dataLength should have a value equal to length of data array',()=>{
        expect(testObject.parsedData.dataLength).to.be.equal(testObject.dataParsed.timeSeriesData.length);
    });
});
describe('innerDataParser',()=>{
    testObject = new DataParser(testData);
    testObject.parseBody();
    let innerData = testObject.dataParsed;
    innerData = innerData.timeSeriesData[0];
    it('Should return Object(json)',()=>{
        expect(innerData).to.be.an('object');
    });
    it('Should have 6 properties',()=>{
        expect(Object.keys(innerData).length).to.be.eql(6);
    });
    it('Should have properties match',()=>{
        expect(innerData,'missing time property').to.have.property('time');
        expect(innerData,'missing open property').to.have.property('open');
        expect(innerData,'missing high property').to.have.property('high');
        expect(innerData,'missing low property').to.have.property('low');
        expect(innerData,'missing close property').to.have.property('close');
        expect(innerData,'missing volume property').to.have.property('volume');
    });
});