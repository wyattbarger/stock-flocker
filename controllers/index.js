const router = require('express').Router();

// Import all the individual route files
const apiRoutes = require('./api')
const homeRoutes = require('./homeController');

// Use these routes
router.use('/api', apiRoutes); // Named and declared router for the /api
router.use('/', homeRoutes); // Named and declared router for the / route

module.exports = router;
