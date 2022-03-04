const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  mainLoadStudy,
  loadCommentStudy,
  deleteComment,
  createComment,
  loadOneStudy,
  updateStudy,
  loadStudy,
  createStudy,
  deleteStudy,
} = require("../../controllers/studyCtrl");
const { Study } = require("../../models");

router.get("/", loadStudy);
router.get("/main", mainLoadStudy);
router.get("/:page", loadOneStudy);
router.get("/:study/comment", loadCommentStudy);
router.post("/", auth, createStudy);
router.post("/:study/comment", auth, createComment);
router.put("/:page", auth, updateStudy);
router.delete("/", auth, deleteStudy);
router.delete("/:study/comment", auth, deleteComment);

module.exports = router;
