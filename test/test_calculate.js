var assert = require('assert');
var calculate = require('../calculate');
var models = require('../models');

describe('Billsplitr tests', function(){

  describe('#calculateSubtotal()', function(){
    it('should return real subtotal for two items', function(){
      var items = [{'quantity':3,'price':5,'description':'beer'},{'quantity':1,'price':12,'description':'burger'}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(34.25625, result);
    });

    it('should return 0 as itemCost and subtotal when items is empty array', function(){
      var result = calculate.calculateSubtotal([]);
      assert.equal(0, result);
    });

    it('should return proper subtotal for one item', function(){
      var items = [{'quantity':1,'price':5,'description':'beer'}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(6.34375, result);
    });

    it('should return the proper group total', function(){
      var items = [{'quantity':1,'price':5,'description':'beer'}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(6.34375, result);
    });
  });
});
