const express = require('express');
const app = express();
const service = require('./service');
const PORT = 3007;
const users = require('./resources/users.json');
const orders = require('./resources/orders.json');
const products = require('./resources/products.json');
const usersObj = require("./resources/usersObj");
const productsObj = require("./resources/productsObj");

console.log(process.env.NODE_ENV);

let userCount = 0;

app.get('/', (req, res) => {res.send('Status: OK')});

//***************Added endpoints ***************

app.get("/orders", (req, res) => {

    const ordersCount = orders.length;

    let ordersWithUserAndProduct = orders.map(order => {
        let result = {
            orderId: order.orderId,
            user: usersObj[order.userId + ""],
            product: productsObj[order.productId + ""]
        };
        return result;
    });

  return res.json({
      orders: ordersWithUserAndProduct,
      ordersCount
  })
});

app.get("/orders/by-user", (req, res) => {
    //unique customers from orders
    let uniqueOrderUsers = {};
    let uniqueOrdersUsersNamesArr = [];
    for (let order of orders) {
        if (!uniqueOrderUsers[order.userId]) {
            let currentUserId = order.userId;
            uniqueOrderUsers[currentUserId] = usersObj[currentUserId];
            uniqueOrdersUsersNamesArr.push(usersObj[currentUserId].name);
        }
    }

    // console.log(uniqueOrderUsers);
    // console.log(uniqueOrdersUsersNamesArr);

    let ordersByUserArr = uniqueOrdersUsersNamesArr.map(userName => {
        return {
            customerName: userName,
            orderCount: service.getOrderCountForUser(userName)
        };
    });


    let sortedOrdersByUserArr = ordersByUserArr.sort((a, b) => {
        return a.orderCount - b.orderCount;
    });

    return res.json({
        orders: sortedOrdersByUserArr
    })
});

app.get("/products", (req, res) => {

    let productObj = {
        productId: "",
        productName: "",
        orderCount: "",
        customers: [],
    };

    let productsWithOrdersAndUsers = products.map(product => {
        return {
            productId: product.productId,
            productName: product.productName,
            orderCount: service.getOrderCountForProduct(product.productName),
            customers: service.getCustomerNamesForProduct(product.productName),
        }
    });

  const productsCount = products.length;

    return res.json({
        products: productsWithOrdersAndUsers,
        productsCount
    })
});

app.get("/products/most-popular", (req, res) => {
    let mostPopularProduct = service.getMostPopularProduct();

});

app.get("/users", (req, res) => {
    const customersCount = users.length;
    return res.json({
        customers: users,
        customersCount
    })
});

//***************End Added endpoints ***************

//number of orders by a customer
app.get('/orders/user/:name', (req, res) => {
    const userName = req.params.name;
    const orderAmount = service.getOrderCountForUser(userName);
    res.send({'ordersByCustomer': orderAmount});
});

//get number of orders by product
app.get('/orders/product/:product', (req, res) => {
    const productName = req.params.product;
    const orderAmount = service.getOrderCountForProduct(productName);
    res.send({'numberOfOrders': orderAmount});
});

//get all customers and customers count
app.get('/users', (req, res) => {
  const results = require('./resources/users.json');
  userCount += results.length;
  const payload = {results, 'userCount': userCount};
  res.send(payload)
});

//customers who've ordered a product
app.get('/users/product/:product', (req, res) => {
  const productName = req.params.product;
  const customers = service.getCustomerNamesForProduct({'customerOrdered': productName});
  res.send(customers);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));