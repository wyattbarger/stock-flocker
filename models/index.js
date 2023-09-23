const User = require("./User");
const Stock = require("./Stock");
const Comment = require("./Comment");
const Post = require("./post");
const HistoricalPrice = require("./HistoricalData"); // Import the new model

// User and Comment Relationship
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//User-post associations
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//Post-Comment associations
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Stock and post Relationship
Stock.hasMany(Post, {
  foreignKey: "stock_id",
  onDelete: "CASCADE",
});
Post.belongsTo(Stock, { foreignKey: "stock_id" });

// Stock and HistoricalPrice Relationship
Stock.hasMany(HistoricalPrice, {
  foreignKey: "stock_id",
  as: "historicalPrices", // Aliasing for ease of use when querying
});

HistoricalPrice.belongsTo(Stock, {
  foreignKey: "stock_id",
});

module.exports = { User, Comment, Stock, HistoricalPrice, Post }; // Export all the models
