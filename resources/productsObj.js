let products = require("./products.json");
let productsObj = products.reduce(function (acc, currentValue, currentIndex, arr){

    acc[currentValue.productId] = currentValue;
    return acc;

}, {});

module.exports = productsObj;