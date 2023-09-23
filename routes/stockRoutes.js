const router = require('express').Router();
const { Stock, HistoricalPrice } = require('../models');

// GET all stocks
router.get('/', async (req, res) => {
  try {
    const stockData = await Stock.findAll({
      include: [{ model: HistoricalPrice, as: 'historicalPrices' }]
    });
    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add other CRUD routes for stocks as needed...

module.exports = router;
