const express = require("express");
const router = express.Router();
const guestBookRouter = require("./guestbook");
const noticeRouter = require("./notice");
const studyRouter = require("./study");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/guestbook", guestBookRouter);
router.use("/notice", noticeRouter);
router.use("/study", studyRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
