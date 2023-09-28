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

router.put('/edit/comment/id:', withAuth, async (req,res) => { // Added put route for a authenticated user to update their choosen comment.
  try { // Added a try-catch block for handling errors.
    const commentId = req.params.id; // Declare commentId variable set to request the comment id. 
    const content = req.body.text; // Declare content variable set to the users updated text.
    const editedComment = await Comment.update(
      {text},
      { where: { id: commentId }}
    );
    res.status(200).json({ messaage: 'Your changes have been updated.' })
  } catch (err) {
    res.status(500).json({ message: 'We were unable to process you edit request. Please try again later.'})
  } 
});

// ... additional CRUD operations as necessary ...


module.exports = router;
