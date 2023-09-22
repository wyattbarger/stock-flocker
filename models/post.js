const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
    // Add other columns as needed (e.g., date, author)

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;

// 
// When querying the posts, you can use the createdAt field to sort the posts by their creation date, like this:


// Post.find()
//   .sort({ createdAt: -1 })
//   .exec((err, posts) => {
//     // Handle the sorted posts data
//   });

// In this example, the sort() method is used to sort the posts in descending order based on the createdAt field. This will give you the posts in the order of their creation date, with the most recent posts appearing first.

