const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Stock extends Model {}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    currentPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.STRING,
      allowNull: true,
      refrences: {
        model: "comment",
        key: "id",
      },
    },
    imageFilename: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "stock",
  }
);

module.exports = Stock;
