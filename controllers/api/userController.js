const { User, Comment } = require('../../models');
const router = require('express').Router(); // Import the router object of express with const 'router'.


router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Comment }]
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}); 

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Comment }]
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
router.get('/register', (req,res) => { // Added a GET route that will show the register page when the route /api/users/register is hit.
  res.render('register', {layout: 'main'}); // Added code to properly target the register view while utilizing the main layout, created by jdgiancola. 
});

router.get('/login', async (req,res) => {
    res.render('login', {layout: 'main'}); // Added code to render the login route with the main layout, created by jdgiancola.
})

router.post('/login', async (req,res) => { // Added a POST route for logging in.
  try {
    const userInfo = await User.fineOne({where: { username: req.body.username} }); // Added code to find one user based on their username, this will be given an unique property in the model 
  }
})
// ... additional CRUD operations as necessary ...


module.exports = router;
