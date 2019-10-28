
const query = require("./routes/query")
const add = require("./routes/add")
const order = require("./routes/order")
/* Load packages */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
/* App initialization */
const API_PORT = 3001;
const app = express();
const router = express.Router();
/* App configurations */
app.use(
  bodyParser.urlencoded(
    {
      extended: false
    }
  )
);
app.use(
  bodyParser.json()
);
app.use(
  logger('dev')
);
/* Root route */
router.get(
  '/',
  (
    req,
    res
  ) => {
    res.send('hello')
  }
);




/* Append /api for HTTP requests */
app.use('/query',query);
app.use('/add',add);
app.use('/order',order);
/* Launch backend into a port */
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
