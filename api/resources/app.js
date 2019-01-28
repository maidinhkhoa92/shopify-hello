const request = require('request-promise');
const crypto = require('crypto');
const nonce = require('nonce')();
const querystring = require('querystring');
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES, BASE_URL } = process.env;

const auth = (req, res) => {

}

const callback = (req, res) => {

}
const success = (req, res) => {
  res.json(req.session.shopify);
}
const fail = (req, res) => {
  res.send('Authentication failed');
}
module.exports = {
  auth,
  callback,
  success,
  fail
}
