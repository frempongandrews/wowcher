const express = require('express');
const app = express();
const service = require('./service');
const PORT = 3007;
const users = require('./resources/users.json');
const orders = require('./resources/orders.json');
const products = require('./resources/products.json');

console.log(process.env.NODE_ENV);

let userCount = 0;

app.get('/', (req, res) => {res.send('Status: OK')});

//***************Added endpoints ***************

app.get("/orders", (req, res) => {

    const ordersCount = orders.length;

  return res.json({
      orders,
      ordersCount
  })
});

app.get("/products", (req, res) => {

  const productsCount = products.length;

    return res.json({
        products,
        productsCount
    })
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

//get all customers and customer count
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