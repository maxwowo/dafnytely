const express = require('express');
const Add = require('../controller/Add');

const router = express.Router();
router.post('/', (req, res) => {
  if (typeof Add[req.body.method] === 'function') {
    //valid method
    Add[req.body.method](req.body).then(results => {
      res.send(results);
    });

  } else {
    res.status(404).send('Invalid method');
  }
});

module.exports = router;


