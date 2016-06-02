var sinon = require('sinon');
var should = require('should');
require('should-sinon');

var loader = require('../');
var context;
var someSass = '$primary-color: #333;'

describe('loader', function() {
  beforeEach(function() {
    context = {
      cacheable: sinon.spy(),
      addDependency: sinon.spy()
    }
  });

  it('should convert JSON numbers to Sass', function() {
    context.query = '?path=test/json/numbers.json'
    loader.call(context, someSass)
      .should.be.eql('$zIndex:100;\n$opacity:0.5;\n\n$primary-color: #333;');

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });

  it('should convert JSON strings to Sass', function() {
    context.query = '?path=test/json/strings.json'
    loader.call(context, someSass)
      .should.be.eql('$localNavHeight:50px;\n$fontSize:16px;\n\n$primary-color: #333;');

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });

  it('should convert JSON lists to Sass lists', function() {
    context.query = '?path=test/json/lists.json'
    loader.call(context, someSass)
      .should.be.eql('$defaultMargin:(10px,0,5px,0);\n$deepList:((1,2,3),(4,5,6));\n\n$primary-color: #333;');

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });

  it('should convert JSON objects to Sass maps', function() {
    context.query = '?path=test/json/objects.json'
    loader.call(context, someSass)
      .should.be.eql('$breakpoints:(portraitS:320px,portraitM:360px,portraitL:414px);\n$deepObject:(a:(b:c));\n\n$primary-color: #333;');

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });

  it('should convert empty string JSON to Sass', function() {
    context.query = '?path=test/json/emptyString.json'
    loader.call(context, someSass)
      .should.be.eql(someSass);

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });

  it('should convert empty object JSON to Sass', function() {
    context.query = '?path=test/json/emptyObject.json'
    loader.call(context, someSass)
      .should.be.eql(someSass);

    context.cacheable.should.have.callCount(1)
    context.addDependency.should.have.callCount(1)
  });
});
