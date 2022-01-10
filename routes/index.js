const express = require("express");
const router = express.Router();
const guestBookRouter = require("./guestbook");

router.use("/guestbook", guestBookRouter);

module.exports = router;
