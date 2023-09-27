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
  try { // Added try-catch to handle errors.
    const userInfo = await User.fineOne({where: { username: req.body.username} }); // Added code to find one user based on their username, this has been given an unique property in the model
    if (!userInfo) { // Added a condition to make the the user info matches what is on record based on the the username, which was defined as unique by andmell in models/user.js.
      res.status(400).json({ message: 'Wrong username or password, please try again!' }); // Tell the user they entered some of their info incorrect and return.
      return;
    }
    req.session.save(() => { // If the users enters the correct info, save the session
      req.session.user_id = userInfo.id; // Store the session based on the user id that logged in.
      req.session.logged_in = true; // Set the session logged_in property to true so that users can view pages requiring authentication.
      res.json({ user: userInfo, message: 'You have successfully logged in. Welcome to Stock Flocker!'});
    });
  } catch (err) { 
    res.status(400).json(err);
  }
});
// ... additional CRUD operations as necessary ...


module.exports = router;
