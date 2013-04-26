/*global describe, beforeEach, afterEach, it */
'use strict';
var should = require('chai').should();
var sinon = require('sinon');

var post = require('../../controllers/post');

var app = {
    get: sinon.spy()
};

describe('Post controller', function() {
    beforeEach(function(){
        this.controller = post(app);
    });

    describe('GET /post route ', function(){
        it('should be defined', function(){
            app.get.calledWith('/post').should.to.be.true;
        });
    });

});