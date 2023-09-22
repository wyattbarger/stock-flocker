const sequelize = require('../config/connection');
const { User, Stock, HistoricalPrice } = require('../models');

const userData = require('./userData.json');
const rawStockData = require('./stockData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Transform raw stock data
  const stockData = rawStockData.map(stock => ({
    symbol: stock.ticker,
    company: stock.company,
    currentPrice: stock.currentPrice
  }));

  const stocks = await Stock.bulkCreate(stockData, {
    returning: true,
  });

  // Seed historical prices after stocks
  for (let i = 0; i < stocks.length; i++) {
    const currentStock = stocks[i];
    const currentRawStock = rawStockData[i];

    const historicalPrices = currentRawStock.historicalPrices.map(price => ({
      stock_id: currentStock.id,
      price: price
      // date: ... // If you need specific dates, make sure to include them in rawStockData.
    }));

    await HistoricalPrice.bulkCreate(historicalPrices);
  }

  process.exit(0);
};

seedDatabase();
