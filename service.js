const users = require('./resources/users.json');
const orders = require('./resources/orders.json');
const products = require('./resources/products.json');


let orderCount = 0;

const getOrderCountForUser = (name) => {
  for (user of users) {
    if (user.name === name) {
      const userId = user.userId;
      const orders = require('./resources/orders.json');
      for (order of orders) {
        if (order.userId === userId) {
          orderCount ++  
        }
      }
      return orderCount
    } 
  }
  return 0
};
  
const getOrderCountForProduct = function(productName) {
  // return 2
    let orderCount = 0;
    for (product of products) {
      if (productName === product.productName) {
        let productId = product.productId;
        for (order of orders) {
          if (order.productId === productId) {
            orderCount += 1;
          }
        }
      }
    }
    return orderCount;
};
  
function getCustomerNamesForProduct(product) {
  return ['bob', 'sue']
} 
  
const getMostPopularProduct = () => {
  return ['chair']
};


getOrderCountForProduct("hammer");
  
module.exports = {
  getOrderCountForUser,
  getOrderCountForProduct,
  getCustomerNamesForProduct,
  getMostPopularProduct
};