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
    res.status(201).json(newComment) // Changed comment to newComment to properly pass the newComment variable declared in line 36 with the 201 response.
  } catch (err) {
    res.status(500).json('We had trouble posting your comment. Try again?')
  }
});

router.put('/edit/comment/:id', withAuth, async (req,res) => { // Added put route for a authenticated user to update their choosen comment.
  try { // Added a try-catch block for handling errors.
    const commentId = req.params.id; // Declare commentId variable set to request the comment id. 
    const content = req.body.text; // Declare content variable set to the users updated text.
    const editedComment = await Comment.update(
      {text}, // Update the data stored in the text column of the Comment model that has been selected based off of the current comment id.
      { where: { id: commentId }}
    );
    res.status(200).json({ message: 'Your changes have been updated.' }) // Log that the selected comment has been updated.
  } catch (err) {
    res.status(500).json({ message: 'We were unable to process you edit request. Please try again later.'}) // Log that the edit request was unseccessful.
  } 
});

router.delete('/delete/comment/:id', withAuth, async (req,res) => { // Added a route to delete a comment based on the comments id.
  try { // Added a try-catch block for handling errors.
    const comment = await Comment.destroy({ // Declare a variable using the destroy method to delete the choosen comment.
      where: {
        id: req.params.id, // Added parameters so that the deleted comment targeted is done so with req.params.id, an double checks that the user is deleting a comment that belongs to them, and not someone else's.
        user_id: req.session.user_id,
      },
    });
    if (!comment) { // Added a conditional so that the user is notified the comment they are trying to delete is unable to be found with the choosen id.
      return res.status(404).json({ message: 'There was no comment found with that id. Confirm your selection and try again.' })
    }
    res.status(200).json(comment); // If the conditional isn't met then send a 200 response to the server.
  } catch (err) {
    res.status(500).json(err); // If there is an internal server issue throw an error.
  }
});

// ... additional CRUD operations as necessary ...


module.exports = router;
