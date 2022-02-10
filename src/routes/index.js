require("dotenv").config();
const express = require("express");

const router = express.Router();

// Controller
// import controller here
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

// Route
// add route here
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
// router.get("/user/:id", getUser);
// router.patch("/user/:id", updateUser);

module.exports = router;
