const { Stock, HistoricalPrice, Post } = require("../../models");
const router = require("express").Router(); // Import the router object of express with const 'router'.
const withAuth = require('../../auth');

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
    const stock = await Stock.findByPk(req.params.id, {
      include: [{ model: HistoricalPrice, as: "historicalPrices" }],
    });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found!" });
    }
    res.status(200).json(stock);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
