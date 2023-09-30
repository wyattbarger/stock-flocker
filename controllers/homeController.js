const router = require("express").Router(); // Import the router object of express with const 'router'.
const { Stock } = require("../models"); // Import the Stock model using a deconstructor in case jdgiancola needs the data on the front-end.
// GET router for the homepage of the web app.
router.get("/", async (req, res) => {
  try {
    // Added try-catch block to handle potential errors.
    const logInStatus = req.session.logged_in;
    const stockPrices = await Stock.findAll({
      // Declare stockPrices const to get stock data.
      attributes: { include: ["id", "ticker", "company", "currentPrice"] }, // Added the attributes as outlined in the Stock model.
      order: [["company", "ASC"]], // Order the results by the company name.
    });

         const stocks = stockPrices.map((stock) => stock.get({ plain: true }));
         // Added try catch to test for errors rendering the homepage.
        res.render('homebody', {logInStatus,stocks}); // Added res.render to render the main template and pass it stockPrices. Accomplished by pathing into layouts setting the view as main, using the same layout.
        
    } catch (err) { // Catch for the try-catch block.
        console.error(err); // Log for any errors that may occur.
        res.status(500).json({ message: 'Internal server error.'}) // Display a message to the user in the case of a bad 
    }
});

//NOTE moved to homecontroller.js as it's not an API call.
router.get('/login', async (req,res) => {
  res.render('login', {layout: 'main'}); // Added code to render the login route with the main layout, created by jdgiancola.
});

router.get('/register', (req,res) => { // Added a GET route that will show the register page when the route /api/users/register is hit.
  res.render('register', {layout: 'main'}); // Added code to properly target the register view while utilizing the main layout, created by jdgiancola. 
});



module.exports = router; // Added module.exports allow the routes defined here to be used elsewhere in the application.