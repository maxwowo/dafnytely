const express = require('express');
const Query = require('../controller/Query');

const router = express.Router();
router.post('/', (req, res) => {
  if (typeof Query[req.body.method] === 'function') {
    console.log('1');
    //valid method
    Query[req.body.method](req.body).then(results => {
      res.send(results);
    });

  } else {
    console.log('2');
    res.status(404).send('Invalid method');
  }
});

module.exports = router;


