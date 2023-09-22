const User = require("./User");
const Stock = require("./Stock");
const Comment = require("./Comment");
const HistoricalPrice = require("./HistoricalPrice"); // Import the new model

// User and Comment Relationship
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Stock and Comment Relationship
Stock.hasMany(Comment, { foreignKey: "stock_id" });
Comment.belongsTo(Stock, { foreignKey: "stock_id" });

// Stock and HistoricalPrice Relationship
Stock.hasMany(HistoricalPrice, {
  foreignKey: 'stock_id',
  as: 'historicalPrices' // Aliasing for ease of use when querying
});

HistoricalPrice.belongsTo(Stock, {
  foreignKey: 'stock_id',
});

module.exports = { User, Comment, Stock, HistoricalPrice };  // Export all the models
