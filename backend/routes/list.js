const express = require('express');
const List = require('../controller/List');

const router = express.Router();
router.post('/', (req, res) => {
  if (typeof List[req.body.method] === 'function') {
    //valid method
    List[req.body.method](req.body).then(results => {
      res.send(results);
    });

  } else {
    res.status(404).send('Invalid method');
  }
});

module.exports = router;


