const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const {
  addList,
  getLists,
  getList,
  updateList,
  deleteList,
} = require("../controllers/list");

router.post("/list", addList);
router.get("/lists", getLists);
router.get("/list/:id", getList);
router.patch("/list/:id", updateList);
router.delete("/list/:id", deleteList);

module.exports = router;
