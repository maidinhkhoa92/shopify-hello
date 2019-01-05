const router = require('express').Router();

// Install app
const app = require('./resources/app');
router.get('/', app.install);
router.get('/callback', app.callback)

module.exports = router
