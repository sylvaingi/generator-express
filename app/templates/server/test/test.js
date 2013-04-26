/*global describe it */
'use strict';

var expect = require('chai').expect;
var foo = 'bar';
var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('test', function () {
    it('should work', function () {
        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.length(3);
        expect(beverages).to.have.property('tea').with.length(3);
    });
});
