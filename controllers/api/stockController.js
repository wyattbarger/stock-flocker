const { Stock, HistoricalPrice } = require('../../models');
const router = require('express').Router(); // Import the router object of express with const 'router'.


  router.get('/stock', async (req, res) => {
    try {
      const stocks = await Stock.findAll({
        include: [{ model: HistoricalPrice, as: 'historicalPrices' }]
      });
      res.status(200).json(stocks);
    } catch (err) {
      res.status(500).json(err);
    }
  }); 

  router.get('/stock/id:', async (req, res) => {
    try {
      const stock = await Stock.findByPk(req.params.id, {
        include: [{ model: HistoricalPrice, as: 'historicalPrices' }]
      });
      if (!stock) {
        return res.status(404).json({ message: 'Stock not found!' });
      }
      res.status(200).json(stock);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // ... additional CRUD operations as necessary ...

module.exports = router;
