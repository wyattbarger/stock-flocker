const User = require("./User");
const Stock = require("./Stock");
const Comment = require("./Comment");

User.hasMany(Comment, { foreignKey: "user_id" });

Comment.belongsTo(User, { foreignKey: "user_id" });

Stock.hasMany(Comment, { foreignKey: "stock_id" });

Comment.belongsTo(Stock, { foreignKey: "stock_id" });

module.exports = {User, Comment, Stock};