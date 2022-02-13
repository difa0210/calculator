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
const { getUsers, deleteUser } = require("../controllers/user");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getTransaction,
  userTransactions,
  updateTransaction,
} = require("../controllers/transaction");

// Route
// add route register here
router.post("/register", register);

// add route login here
router.post("/login", login);

// add route user here
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

// add route products here
router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);
router.delete("/product/:id", auth, deleteProduct);

// add route topping here
router.post("/topping", auth, uploadFile("image"), addTopping);
router.get("/toppings", getToppings);
router.get("/topping/:id", getTopping);
router.patch("/topping/:id", auth, uploadFile("image"), updateTopping);
router.delete("/topping/:id", auth, deleteTopping);

// add route transaction here
router.post("/transaction", auth, addTransaction);
router.get("/transactions/:userid", auth, getTransactions);
router.get("/transaction/:id", auth, getTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);
router.get("/my-transactions", auth, userTransactions);

// add route topping here
// router.get("/user/:id", getUser);
// router.patch("/user/:id", updateUser);

module.exports = router;
