const router = require('express').Router();

// Install app
const app = require('./resources/app');
router.get('/auth', app.auth);
router.get('/callback', app.callback);
router.get('/success', app.success);
router.get('/fail', app.fail);

module.exports = router
