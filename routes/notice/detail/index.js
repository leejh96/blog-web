const express = require("express");
const router = express.Router();
const { loadOneNotice } = require("../../../controllers/noticeCtrl");
const { auth } = require("../../../middleware/auth");

router.get("/:postId", auth, loadOneNotice);

module.exports = router;
