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
  
function getCustomerNamesForProduct(productName) {
  // return ['bob', 'sue']

    //get productId
    let productId;
    for (product of products) {
      if (productName === product.productName) {
        productId = product.productId;
      }
    }


    //product not found
    if (!productId) {
      console.log("********* Product Not Found");
      return [];
    }

    let productAndCustomersNamesObj = {
        //id: { customersNames: []
                  //}
    };

    let customersNamesByIdObj = {};
    users.forEach(user => {
      customersNamesByIdObj[user.userId] = user.name;
    });


    for (product of products) {
      if (!productAndCustomersNamesObj[product.productId]) {
          productAndCustomersNamesObj[product.productId] = {};
      }
    }

    orders.forEach((order => {
      let foundProductId = order.productId;
      if (productAndCustomersNamesObj[foundProductId]) {
        //check customers array is already there
          if ((productAndCustomersNamesObj[foundProductId]).customersNames) {
            //check if already a customer of the product
              if (!(productAndCustomersNamesObj[foundProductId]).customersNames.includes(order.userId)) {
                  (productAndCustomersNamesObj[foundProductId]).customersNames = [customersNamesByIdObj[order.userId], ...((productAndCustomersNamesObj[order.productId]).customersNames)]
              }
          } else {
            //create it and add customer
              (productAndCustomersNamesObj[order.productId]).customersNames = [customersNamesByIdObj[order.userId]]
          }
      }
    }));

    let customersNamesForProduct = ((productAndCustomersNamesObj[productId]).customersNames);

    //sorted to make tests results predictable and thus reliable
    let uniqueCustomersNamesForProduct = customersNamesForProduct.filter( (customer, i, arr) => {
      return arr.indexOf(customer) === i
    }).sort();

    console.log(uniqueCustomersNamesForProduct);
    return uniqueCustomersNamesForProduct;

} 
  
const getMostPopularProduct = () => {
  // return ['chair']

};


// getOrderCountForProduct("hammer");
// getCustomerNamesForProduct("chair");
  
module.exports = {
  getOrderCountForUser,
  getOrderCountForProduct,
  getCustomerNamesForProduct,
  getMostPopularProduct
};