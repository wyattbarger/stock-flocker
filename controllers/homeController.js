const router = require('express').Router(); // Import the router object of express with const 'router'.
const {Stock} = require('../models'); // Import the Stock model using a deconstructor in case jdgiancola needs the data on the front-end. 
// GET router for the homepage of the web app.
router.get('/', async (req, res) => {
    try { // Added try-catch block to handle potential errors. 
        const stockPrices = await Stock.findAll({ // Declare stockPrices const to get stock data.
            attributes: ['id', 'ticker', 'company', 'currentPrice', 'historicalPrices'], // Added the attributes as outlined in the Stock model.
            order: [['company', 'ASC']], // Order the results by the company name.
        });
        res.json(stockPrices); // Sends the stock data as a JSON response.
    } catch (err) { // Catch for the try-catch block.
        console.error(err); // Log for any errors that may occur.
        res.status(500).json({ message: 'Internal server error.'}) // Display a message to the user in the case of a bad 
    }
});

module.exports = router; // Added module.exports allow the routes defined here to be used elsewhere in the application.
