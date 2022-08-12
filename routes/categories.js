const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false });
    res.json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categories = await Category.findById(req.params.id);
    res.json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const categories = new Category({
        category: req.body.category,
        catDescription: req.body.catDescription,
            
    });
    const catSaved = await categories.save();
    res.json(catSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCat = await Category.findByIdAndUpdate(req.params.id, {
        category: req.body.category,
        catDescription: req.body.catDescription,
      updatedAt: Date.now(),
    });
    res.json(updatedCat);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch("/delete/:id", async (req, res) => {
  try {
    const catDeleted = await Category.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(catDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCat = await Category.deleteOne({ _id: req.params.id });
    res.json(deletedCat);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
