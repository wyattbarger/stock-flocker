const { Comment, User, Stock, Post } = require('../../models');
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

<<<<<<< HEAD
// Check discord for Andrews delete code block.
// ... additional CRUD operations as necessary ...
=======
// finish and test this route in insomnia
router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.post_id;
    const user = req.user.id;
    const content = req.body;
    const newComment = await Comment.create({
      content,
      postId,
      user
    });
    res.status(201).json(comment)
  } catch (err) {
    res.status(500).json('We had trouble posting your comment. Try again?')
  }
});


  // ... additional CRUD operations as necessary ...
>>>>>>> main


module.exports = router;
