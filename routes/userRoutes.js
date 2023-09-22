const router = require('express').Router();
const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add other CRUD routes for users as needed...

module.exports = router;
