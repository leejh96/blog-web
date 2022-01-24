const express = require("express");
const router = express.Router();
const guestBookRouter = require("./guestbook");
const noticeRouter = require("./notice");
const studyRouter = require("./study");

router.use("/guestbook", guestBookRouter);
router.use("/notice", noticeRouter);
router.use("/study", studyRouter);
module.exports = router;
