const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Controller Register Login
const { register, login } = require("../controllers/auth");
// Controller Products
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

// Controller Topping
const {
  addTopping,
  getToppings,
  getTopping,
  updateTopping,
  deleteTopping,
} = require("../controllers/topping");

// Controller User
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const req = require("express/lib/request");

// Route
// add route register here
router.post("/register", register);

// add route login here
router.post("/login", login);

// add route user here
router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// add route products here
router.post("/product", uploadFile("image"), addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// add route topping here
router.post("/topping", addTopping);
router.get("/toppings", getToppings);
router.get("/topping/:id", getTopping);
router.patch("/topping/:id", updateTopping);
router.delete("/topping/:id", deleteTopping);

// add route topping here
// router.get("/user/:id", getUser);
// router.patch("/user/:id", updateUser);

module.exports = router;
