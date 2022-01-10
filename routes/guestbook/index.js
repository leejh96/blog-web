const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  loadGuestBook,
  createGuestBook,
  deleteGusetBook,
} = require("../../controllers/guestbookCtrl");

router.get("/:page", loadGuestBook);
router.post("/", auth, createGuestBook);
router.delete("/", auth, deleteGusetBook);

module.exports = router;
