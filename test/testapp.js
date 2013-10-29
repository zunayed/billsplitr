var assert = require('assert');
var calculate = require('../calculate');
var models = require('../models');

describe('Billsplitr tests', function(){
  describe('#model test()', function(){
    //intial setup
    beforeEach(function(){

      this.person = new models.Person('test_person');
      this.app = new models.App();
      this.person = new models.Person("test_person", this.app);
    });

    it('should return an app class object, intialized data should be clean', function(){
      assert.equal(0, this.app.people.length);
      assert.equal(0, this.app.group_total);

    });

    it('intialized person should return person object and item data matching pass params', function(){
      var person = this.person;
      assert.equal(0, person.items);
      assert.equal(0, person.subtotal);
      assert.equal('test_person', person.name);
    });

    it( 'tests adding a person to the app', function() {
      var app = this.app;
      app.addPerson( 'test_person' );
      assert.equal( 1, app.people.length );
      assert.equal( 'test_person', app.people[0].name );
      app.addPerson( 'zunayed' );
      test_list = ['zunayed','test_person'];
      people_list = app.people_list;
      assert.deepEqual(test_list, people_list);
    } );

    it( 'tests calculating the subtotal', function() {
      var items = [{'quantity':3,'price':5,'description':'beer'},{'quantity':1,'price':12,'description':'burger'}];
      var person = this.person;
      person.addItem( items[0] );
      assert.equal( 19.03125, person.subtotal );
      person.addItem( items[1] );
      assert.equal( 34.25625, person.subtotal );
    });

    it('intialized beer should retun beer object and item data matching pass params', function(){
      var person = this.person;
      var beer_data = {'quantity':3,'price':5,'description':'beer'};
      var beer = new models.Item( beer_data );
      assert.equal(3, beer.quantity);
      assert.equal(5, beer.price);
      assert.equal('beer', beer.description);
    });

    it( 'checks that a duplicate person cannot be added to an app', function() {
      var app = this.app;
      app.addPerson( 'test_person' );
      app.addPerson( 'test_person' );
      assert.equal( 1, app.people.length );
    });

    //'quantity':3,'price':5,'description':'beer'
    it('add an item to a person and see if params match', function(){
      var person = this.person;
      var beer = {'quantity':3,'price':5,'description':'beer'}
      assert.equal(0, this.person.items.length);
      person.addItem(beer)
      assert.equal(1, this.person.items.length);
      assert.equal(3, this.person.items[0].quantity);
      assert.equal(5, this.person.items[0].price);
      assert.equal('beer', this.person.items[0].description);

    });

    it('duplicate item is rejected from persons item list', function(){
      var person = this.person;
      var beer = {'quantity':3,'price':5,'description':'beer'}
      var beer2 = {'quantity':2,'price':6,'description':'beer'}

      person.addItem(beer);
      assert.equal(1, this.person.items.length);
      person.addItem(beer2);
      assert.equal(1, this.person.items.length);

      assert.equal(3, this.person.items[0].quantity);
      assert.equal(5, this.person.items[0].price);
      assert.equal('beer', this.person.items[0].description);
    });

    it( 'tests removing an item from a user', function() {
      var items = [{'quantity':3,'price':5,'description':'beer'},{'quantity':1,'price':12,'description':'burger'}];
      var person = this.person;
      person.addItem( items[0] );
      person.addItem( items[1] );
      assert.equal( 2, person.items.length );
      person.removeItem( 'beer' );
      assert.equal( 1, person.items.length );
      assert.equal( 'burger', person.items[0].description );
      assert.equal( 15.225, person.subtotal );
    } );

    it( 'tests that an app is keeping track of the group total', function() {
      var app = this.app;

      var beer   = {"quantity":3,"price":5,"description":"beer"};
      var burger = {"quantity":1,"price":12,"description":"burger"};

      app.addPerson( "shak" );
      assert.equal( 0, app.group_total );

      app.addPerson( "zunayed" );
      assert.equal( 0, app.group_total );

      var shak    = app.people[0];
      var zunayed = app.people[1];

      shak.addItem( beer );
      zunayed.addItem( burger );

      assert.equal( 34.25625, app.group_total );
      shak.addItem( burger );
      assert.equal( 15.225 + 34.25625, app.group_total );
      zunayed.removeItem( "burger" );
      assert.equal( 34.25625, app.group_total );
    } );

    it( 'should find a user', function() {
      var app = this.app;
      app.addPerson( 'shak' );
      app.addPerson( 'zunayed' );
      assert.equal( 'shak', app.people[app.getPerson('shak')].name );
      assert.equal( 'zunayed', app.people[app.getPerson('zunayed')].name );
    } );

    it( 'remove a user', function() {
      var app = this.app;
      app.addPerson( 'shak' );
      app.addPerson( 'zunayed' );
      app.removePerson( 'zunayed' );
      assert.equal( 'shak', app.people_list );
    } );
  });
});
