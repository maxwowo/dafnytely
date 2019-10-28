const express = require('express');
const Order = require('../controller/Order');
const order = express.Router();
order.post('/', (req, res) => {
  if (typeof Order[req.body.method] === 'function') {
    //valid method
    Order[req.body.method](req.body).then(results => {
      res.send(results);
    });

  } else {
    res.status(404).send('Invalid method');
  }
});

module.exports = order;


