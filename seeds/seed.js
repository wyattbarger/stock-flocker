const sequelize = require('../config/connection');
const { User, Stock, HistoricalPrice, Comment, Post, } = require('../models');

const userData = require('./userData.json');
const rawStockData = require('./stockData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const historicalData = require('./historicalData.json');

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

  const stocks = await Stock.bulkCreate(rawStockData, {
    returning: true,
  });

  // Seed historical prices after stocks
  // for (let i = 0; i < stocks.length; i++) {
  //   const currentStock = stocks[i];
  //   const currentRawStock = rawStockData[i];

  //   const historicalPrices = currentRawStock.historicalPrices.map(price => ({
  //     stock_id: currentStock.id,
  //     price: price,
  //     date: date,
  //   }));

  //   await HistoricalPrice.bulkCreate(historicalPrices);
  // }

  await HistoricalPrice.bulkCreate(historicalData, {
    returning: true,
  })

  await Post.bulkCreate(postData, {
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
