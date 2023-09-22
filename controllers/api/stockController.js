const { Stock, HistoricalPrice } = require('../models');

const stockController = {
  // Get all stocks
  getAllStocks: async (req, res) => {
    try {
      const stocks = await Stock.findAll({
        include: [{ model: HistoricalPrice, as: 'historicalPrices' }]
      });
      res.status(200).json(stocks);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single stock by ID
  getStockById: async (req, res) => {
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
  },

  // ... additional CRUD operations as necessary ...
};

module.exports = stockController;
