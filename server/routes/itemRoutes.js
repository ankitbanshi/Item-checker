const express = require("express");
const router = express.Router();
const Item = require("../models/item");

router.post("/", async (req, res) => {
  try {
    const { name, type, description, coverImage, additionalImages } = req.body;

    const newItem = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages,
    });

    const savedItem = await newItem.save();
    res.status(201).json({
      message: "Item successfully added!",
      item: savedItem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
