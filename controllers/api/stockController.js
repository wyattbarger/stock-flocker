const { Stock, HistoricalPrice, Post, Comment, User } = require("../../models"); // New Code Here: Include Comment
const router = require("express").Router(); // Import the router object of express with const 'router'.
const withAuth = require("../../auth");

router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: [{ model: HistoricalPrice, as: "historicalPrices" }],
    });
    const stock = stocks.map((product) => product.get({ plain: true }));
    res.render("stockPage", { layout: "main", stock });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const logInStatus = req.session.logged_in;
    const stockData = await Stock.findByPk(req.params.id, {
      include: [
        { model: HistoricalPrice
          // , as: "historicalPrices" 
        },
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [{ model: User, attributes: ["username"] }],
            },
            {
              model: User, attributes: ["username"]
            },
          ],
        }, // New Code Here: Include Posts and associated Comments
      ],
    });
    if (!stockData) {
      return res.status(404).json({ message: "Stock not found!" });
    }
    const plainStock = stockData.get({ plain: true }); // New Code Here: Convert to plain object
    res.render("stocks", { logInStatus, stock: plainStock }); // New Code Here: Render the stock in Handlebars view
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const stockData = await Stock.findByPk(req.params.id, {
//       include: [{ model: HistoricalPrice, as: "historicalPrices" }],
//     });
//     if (!stockData) {
//       return res.status(404).json({ message: "Stock not found!" });
//     }
//     const stock = stockData.map((product) => product.get({ plain: true }));
//     res.render("stocks", { layout: "main", stocks: stock });
//     console.log(stock);
//     // res.status(200).json(stock);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/:id/posts", async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.params.id, {
      include: [Post],
    });

    if (!stock.posts || stock.posts.length === 0) {
      return res.status(404).json({ message: "Stock has no posts...yet!" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/:id/posts", withAuth, async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.params.id, {
      include: [Post],
    });
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      stock_id: stock.id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newStock = await Stock.create({
      ...req.body,
    });
    res.status(200).json(newStock);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ... additional CRUD operations as necessary ...

module.exports = router;
