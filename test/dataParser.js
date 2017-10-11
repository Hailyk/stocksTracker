'use strict';

let dataParser =  require("../libs/DataParser.js");
let testData =  require("./testData.json");

let expect = require('chai').expect;

let dataParserObject;

describe('dataParser',()=>{
    describe('Constructor',()=>{
        it('Construct Object',()=>{
            dataParserObject = new dataParser(testData);
            expect(dataParserObject).to.be.an('object');
        });
        it('Should have no parsed data',()=>{
            expect(Object.keys(dataParserObject.dataParsed).length === 0);
        });
    });
    describe('parseMeta',()=>{
        it('Should return null',()=>{
            expect(dataParserObject.parseMeta()).to.be.a('null');
        });
        it('Should parse meta data',()=>{
            expect(Object.keys(dataParserObject.dataParsed).length).to.be.at.above(0);
        });
        it('Should have at least 5 meta data',()=>{
            expect(Object.keys(dataParserObject.dataParsed).length).to.be.at.least(5);
        });
        it('Should have properties',()=>{
            expect(dataParserObject.dataParsed, 'missing info property').to.have.property("info");
            expect(dataParserObject.dataParsed, 'missing symbol property').to.have.property("symbol");
            expect(dataParserObject.dataParsed, 'missing lastRefresh property').to.have.property("lastRefresh");
            expect(dataParserObject.dataParsed, 'missing interval property').to.have.property("interval");
            expect(dataParserObject.dataParsed, 'missing fullSize property').to.have.property("fullSize");
        });
    });
    describe('parseBody',()=>{
        dataParserObject = new dataParser(testData);
        it('Should return null',()=>{
            expect(dataParserObject.parseBody()).to.be.a('null');
        });
        it('Should parse body',()=>{
            expect(Object.keys(dataParserObject.dataParsed).length).to.be.at.above(0);
        });
        it('Should be an Array',()=>{
            expect(dataParserObject.dataParsed.timeSeriesData).to.be.an('array');
        });
        it('Should have a dataLength',()=>{
            expect(dataParserObject.dataParsed).to.have.property("dataLength");
        });
        it('dataLength should have a value equal to length of data array',()=>{
            expect(dataParserObject.dataLength).to.be.equal(dataParserObject.dataParsed.timeSeriesData.length);
        });
    });
    describe('innerDataParser',()=>{
        dataParserObject = new dataParser(testData);
        let innerData = dataParserObject.dataParsed;
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
});