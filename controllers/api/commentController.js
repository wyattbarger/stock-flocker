const { Comment, User, Stock, Post } = require('../../models');
const router = require('express').Router(); // Import the router object of express with const 'router'.
const withAuth = require('../../auth')

// router.get('/comments', async (req, res) => {
//   try {
//     const comments = await Comment.findAll({
//       include: [{ model: User }, { model: Stock }]
//     });
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Unecessary route commented out.

// router.get('/comment/:id', async (req, res) => {
//   try {
//     const comment = await Post.findByPk(req.params.id, {
//       where: ,
//       include: [{ model: User }, { model: Stock }]
//     });
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found!' });
//     }
//     res.status(200).json(comment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// Unecessary route commented out.

// finish and test this route in insomnia
router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.post_id;
    const user = req.user.id;
    const content = req.body;
    const newComment = await Comment.create({ // The instances on content here may need changed to text if it can't communicate with the database
      content,
      postId,
      user
    });
    res.status(201).json(newComment) // Changed comment to newComment to properly pass the newComment variable declared in line 36 with the 201 response.
  } catch (err) {
    res.status(500).json('We had trouble posting your comment. Try again?')
  }
});
// The below put route was tested in insomnia and confirmed to work with MySql workbench.
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Identify which comment needs to be updated, by finding its corresponding ID
    const comment = await Comment.findByPk(req.params.id); 
    // Compare the user's id to the id of the user that posted the comment. A mismatch will not allow a user to edit the comment.
    if (req.session.user_id !== comment.user_id) {
      res.status(401).json("That is not your comment");
    } else {
      // This method will update the body of the comment.
      await comment.update({
        ...req.body,
      });
      res.status(200).json("Changes applied");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// Tested this route in Insomnia and MySql workebench, both confirmed working.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    console.log(req.session.user_id);
    console.log(comment.user_id);
    if (req.session.user_id !== comment.user_id) {
      res.status(401).json("That is not your comment.");
    } else {
      await comment.destroy();
      res.status(200).json("comment deleted.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// ... additional CRUD operations as necessary ...


module.exports = router;
