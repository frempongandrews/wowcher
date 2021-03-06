const users = require('./resources/users.json');
const orders = require('./resources/orders.json');
const products = require('./resources/products.json');




const getOrderCountForUser = (name) => {

  let orderCount = 0;
  for (user of users) {
    if (user.name.trim().toLowerCase() === name.trim().toLowerCase()) {
      const userId = user.userId;
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
      if (productName.trim().toLowerCase() === product.productName.trim().toLowerCase()) {
        let productId = product.productId;
        for (order of orders) {
          if (order.productId === productId) {
            orderCount += 1;
          }
        }
      }
    }
    // console.log(orderCount);
    return orderCount;
};
  
const getCustomerNamesForProduct = (productName) => {
  // return ['bob', 'sue']

    //get productId
    let productId;
    for (product of products) {
      if (productName.trim().toLowerCase() === product.productName.trim().toLowerCase()) {
        productId = product.productId;
      }
    }


    //product not found
    if (!productId) {
      console.log("********* Product Not Found");
      return [];
    }

    let productAndCustomersNamesObj = {};

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

    // console.log(uniqueCustomersNamesForProduct);
    return uniqueCustomersNamesForProduct;

};

//another endpoint
const getMostPopularProduct = () => {

    //get order count per product
    //deep clone
    let productsCopyStr = JSON.stringify(products);
    let productsCopy = JSON.parse(productsCopyStr);
    let orderCountPerProductObj = productsCopy.reduce((acc, currentValue, currentIndex, arr) => {
        acc[currentValue.productName] = getOrderCountForProduct(currentValue.productName);
        return acc;
    }, {});

    //console.log(orderCountPerProductObj);

    let orderCountPerProductArr = [];

    for (let prop in orderCountPerProductObj) {
        orderCountPerProductArr = orderCountPerProductArr.concat({productName: prop, orderCount: orderCountPerProductObj[prop]})
    }


    let mostPopularProductsArr = [];
    let highestOrderCount = 0;

    orderCountPerProductArr.forEach( (prod, i, arr) => {
        // console.log(prod);
        if (prod.orderCount >= highestOrderCount) {
            highestOrderCount = prod.orderCount;
            mostPopularProductsArr = [prod.productName];
        }
    });


    //case of 2 or more products with same orderCount
    orderCountPerProductArr.forEach( (prod, i, arr) => {
        // console.log(prod);
        if (prod.orderCount >= highestOrderCount) {
            if (!mostPopularProductsArr.includes(prod.productName)) {
                mostPopularProductsArr = [prod.productName, ...mostPopularProductsArr];
            }
        }
    });

    // console.log(mostPopularProductsArr);
    return mostPopularProductsArr;
};

// getOrderCountForProduct("hammer");
// getCustomerNamesForProduct("chair");
// getOrderCountForProduct("chair");
// getMostPopularProduct();

module.exports = {
  getOrderCountForUser,
  getOrderCountForProduct,
  getCustomerNamesForProduct,
  getMostPopularProduct
};