const express = require('express');
const Add = require('../controller/Add');

const add = express.Router();
add.post('/', (req, res) => {
  if (typeof Add[req.body.method] === 'function') {
    //valid method
    add[req.body.method](req.body).then(results => {
      res.send(results);
    });

  } else {
    res.status(404).send('Invalid method');
  }
});

module.exports = add;


