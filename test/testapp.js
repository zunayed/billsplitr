var assert = require("assert");
var calculate = require('../calculate');
var models = require('../models');

describe('Billsplitr test', function(){
  describe('#calculateSubtotal()', function(){
    it('should return real subtotal for two items', function(){
      var items = [{"qty":3,"price":5,"description":"beer"},{"qty":1,"price":12,"description":"burger"}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(27, result.itemCost);
      assert.equal(34.25625, result.subtotal);
    });

    it('should return 0 as itemCost and subtotal when items is empty array', function(){
      var result = calculate.calculateSubtotal([]);
      assert.equal(0, result.itemCost);
      assert.equal(0, result.subtotal);
    });

    it('should return proper subtotal for one item', function(){
      var items = [{"qty":1,"price":5,"description":"beer"}];
      var result = calculate.calculateSubtotal(items);
      assert.equal(5, result.itemCost);
      assert.equal(6.34375, result.subtotal);
    });

  });

  describe('#model test()', function(){
    //intial setup
    before(function(){
      this.person = new models.Person("test_person");
      this.app = new models.App();
    });

    it('should return an app class object, intialized data should be clean', function(){
      assert.equal(0, this.app.people.length);
      assert.equal(0, this.app.group_total);

    });

    it('intialized person should retun person object and item data matching pass params', function(){
      var person = this.person;
      assert.equal(0, this.person.items);    
      assert.equal("test_person", this.person.name);    
    });

    //add items
    //"qty":3,"price":5,"description":"beer"
    it('add an item to a person and see if params match', function(){
      var person = this.person;
      var beer = {"quantity":3,"price":5,"description":"beer"}
      assert.equal(0, this.person.items.length);  
      person.addItem(beer)
      assert.equal(1, this.person.items.length);  
      assert.equal(3, this.person.items[0].quantity);  
      assert.equal(5, this.person.items[0].price);
      assert.equal('beer', this.person.items[0].description);  
         
    });

    it('duplicate item is rejected from persons item list', function(){
      var person = this.person;
      var beer = {"quantity":3,"price":5,"description":"beer"}
      var beer2 = {"quantity":2,"price":6,"description":"beer"}

      person.addItem(beer)
      assert.equal(1, this.person.items.length);  
      person.addItem(beer2)
      assert.equal(1, this.person.items.length);  

      assert.equal(3, this.person.items[0].quantity);  
      assert.equal(5, this.person.items[0].price);  
      assert.equal('beer', this.person.items[0].description); 
    });

    //remove item
  });
});
