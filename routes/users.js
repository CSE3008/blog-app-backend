const express = require("express");
const User = require("../models/Users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({ deleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    });
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
       updatedAt: Date.now(),
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/delete/:id", async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndUpdate(req.params.id, {
      deleted: true,
      deletedAt: Date.now(),
    });
    res.json(userDeleted);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
