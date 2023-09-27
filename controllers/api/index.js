const router = require('express').Router(); // Import the router object of express with const 'router'.
const userRoutes = require('./userController')
const stockRoutes = require('./stockController')
const commentRoutes = require('./commentController')
const postRoutes = require('./postController');

router.use('/users', userRoutes);
router.use('/stocks', stockRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router; // Export all the routes from the api folder with proper naming convention.
