const { Comment, User, Stock } = require('../../models');
const router = require('express').Router(); // Import the router object of express with const 'router'.
const withAuth = require('../../auth')

router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User }, { model: Stock }]
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
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
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      
    })
  }
})


  // ... additional CRUD operations as necessary ...


module.exports = router;
