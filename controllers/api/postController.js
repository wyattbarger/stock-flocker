//TODO: write this controller
const { Post, Stock, Comment } = require("../../models");
const router = require("express").Router(); // Import the router object of express with const 'router'.
const withAuth = require("../../auth");
// Import all necessary files

//DELETE route for a post that a user no longer wants
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    console.log(req.session.user_id);
    console.log(post.user_id);
    if (req.session.user_id !== post.user_id) {
      res.status(401).json("That is not your post.");
    } else {
      await post.destroy();
      res.status(200).json("Post deleted.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/comments", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment],
    });
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: post.id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/comments/:id", withAuth, async (req, res) => {
  // Added put route for a authenticated user to update their choosen comment.
  try {
    // Added a try-catch block for handling errors.
    const comment = await Comment.findByPk(req.params.id); // Declare commentId variable set to request the comment id.
    if (req.session.user_id !== comment.user_id) {
      res.status(401).json("That is not your comment");
    } else {
      await comment.update({
        ...req.body,
      });
      res.status(500).json("Changes applied");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/comments", withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment],
    });
    const newComment = await Comment.findAll({
      where: {
        post_id: post.id,
      },
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
