var assert = require('assert');
var subject = require('./service');

describe('service', function() {

  describe('calculate orders', () => {
    it('should return 3 orders for sam', () => {
      assert.equal(subject.getOrderCountForUser('sam'), 3, 'number of users incorrect')
    })
  })
  
  describe('calculate number of products', () => {
    it('should return 2 orders for hammer', () => {
      assert.equal(subject.getOrderCountForProduct('hammer'), 2, 'number of hammer orders incorrect');
    });

    it('should return 1 orders for toothbrush', () => {
        assert.equal(subject.getOrderCountForProduct('toothbrush'), 1, 'number of toothbrush orders incorrect');
    });

    it('should return 1 orders for spoon', () => {
        assert.equal(subject.getOrderCountForProduct('spoon'), 1, 'number of spoon orders incorrect');
    });

    it('should return 3 orders for chair', () => {
        assert.equal(subject.getOrderCountForProduct('chair'), 3, 'number of chair orders incorrect');
    })
  });

  describe('return names of customers that bought item', () => {
    it('should return bob & sue for chair', () => {
      assert.deepEqual(subject.getCustomerNamesForProduct('chair'), ['bob', 'sue'], 'customer name didnt match')
    })
  });

  describe('return name of the most popular procduct', () => {
    it('should return chair', () => {
      assert.deepEqual(subject.getMostPopularProduct(), ['chair'], 'most popular product incorrect')
    })
  })  

});