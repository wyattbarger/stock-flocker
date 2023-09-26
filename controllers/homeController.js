const router = require('express').Router(); // Import the router object of express with const 'router'.
const {Stock} = require('../models'); // Import the Stock model using a deconstructor in case jdgiancola needs the data on the front-end. 
// GET router for the homepage of the web app.
router.get('/', async (req, res) => {
    try { // Added try-catch block to handle potential errors. 
        const stockPrices = await Stock.findAll({ // Declare stockPrices const to get stock data.
            attributes: { include: ['id', 'ticker', 'company', 'currentPrice']}, // Added the attributes as outlined in the Stock model.
            order: [['company', 'ASC']], // Order the results by the company name.
        });
        const stock = stockPrices.map((product) => product.get({ plain: true })) // Added .map to stockPrices so that the data will pass properly as an array.
        res.render('homebody', { layout: 'main', stock}); // Added res.render to render the main template and pass it stockPrices. Accomplished by pathing into layouts setting the view as main, using the same layout.
        console.log(stockPrices);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'There was an error rendering the homepage!' });
        }
});

module.exports = router; // Added module.exports allow the routes defined here to be used elsewhere in the application.
