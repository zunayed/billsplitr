var assert = require("assert")
var calculate = require('../calculate');

describe('calculate', function(){
  describe('#calculateSubtotal()', function(){
    it('should return real subtotal for two items', function(){
    	var items = [{"qty":3,"price":5,"description":"beer"},{"qty":1,"price":12,"description":"burger"}];
    	var result = calculate.calculateSubtotal(items);
    	assert.equal(27, result.itemCost)
    	assert.equal(34.25625, result.subtotal)
    })

    it('should return 0 as itemCost and subtotal when items is empty array', function(){
      var result = calculate.calculateSubtotal([]);
      assert.equal(0, result.itemCost)
      assert.equal(0, result.subtotal)
    })

    it('should return proper subtotal for one item', function(){
      var items = [{"qty":1,"price":5,"description":"beer"}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(5, result.itemCost)
      assert.equal(6.34375, result.subtotal)
    })

  })
})
