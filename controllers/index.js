const router = require('express').Router();

// Import all the individual route files
const stockRoutes = require('../routes/stockRoutes');
const userRoutes = require('../routes/userRoutes');
const commentRoutes = require('../routes/commentRoutes');

// Use these routes
router.use('/stocks', stockRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
