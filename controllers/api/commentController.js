const { Comment, User, Stock } = require('../../models');

const commentController = {
  // Get all comments
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        include: [{ model: User }, { model: Stock }]
      });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single comment by ID
  getCommentById: async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id, {
        include: [{ model: User }, { model: Stock }]
      });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found!' });
      }
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // ... additional CRUD operations as necessary ...
};

module.exports = commentController;
