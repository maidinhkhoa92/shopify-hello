const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./src/router');
const { PORT } = process.env;

// listen
app
  .use(cookieParser())
  .use(bodyParser.json());
  .use('/shopify', router)
  .listen(PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
  });
