const User = require("./User");
const Stock = require("./Stock");
const Comment = require("./Comment");

User.hasMany(Comment, { as: "comments" });

Comment.belongsTo(User, { foreignKey: "user_id" });

Stock.hasMany(Comment, { as: "comments" });

Comment.belongsTo(Stock, { foreignKey: "stock_id" });

module.exports = {User, Comment, Stock};