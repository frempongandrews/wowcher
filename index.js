const express = require('express');
const app = express();
const service = require('./service');
const PORT = 3007;

console.log(process.env.NODE_ENV);

let userCount = 0;

app.get('/', (req, res) => {res.send('Status: OK')});

//get all customers and customer count
app.get('/users', (req, res) => {
  const results = require('./resources/users.json');
  userCount += results.length;
  const payload = {results, 'userCount': userCount};
  res.send(payload)
});

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

//customers who've ordered a product
app.get('/users/product/:product', (req, res) => {
  const productName = req.params.product;
  const customers = service.getCustomerNamesForProduct({'customerOrdered': productName});
  res.send(customers);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));