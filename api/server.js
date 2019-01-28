require('dotenv').config();
const express = require('express');
const session = require('express-session');
const server = express();
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ShopifyAuth = require('express-shopify-auth');

const router = require('./router');

const { PORT = 3000, SHOPIFY_API_KEY, SHOPIFY_API_SECRET, BASE_URL } = process.env;

const dev = process.env.NODE_ENV !== 'production';

// use Next
const app = next({ dev });
const handle = app.getRequestHandler()

// auth for shopify
const auth = ShopifyAuth.create({
  appKey: SHOPIFY_API_KEY,
  appSecret: SHOPIFY_API_SECRET,
  baseUrl: BASE_URL,
  authPath: '/auth',
  authCallbackPath: '/callback',
  authSuccessUrl: '/', // this will redirect to react page (pages folder)
  authFailUrl: '/fail',
  scope: ['read_products'],
  shop: function (req, done) {
    return done(null, req.query.shop);
  },
  onAuth: function (req, res, shop, accessToken, done) {
    // save auth info to session
    req.session.shopify = { shop: shop, accessToken: accessToken };
    return done();
  }
});

// create session
const express_session = session({
  secret: 'your session secret',
  resave: false,
  saveUninitialized: true
})

// listen
app.prepare().then(() => {
  server.use(express_session)
    .use(morgan('tiny'))
    .use(auth)
    .use(cookieParser())
    .use(bodyParser.json())
    .use(router)
    .get('*', (req, res) => {
      return handle(req, res)
    })
    .listen(PORT || 3000, () => {
      console.log(`App running on port ${PORT} !!!`);
    });
})
