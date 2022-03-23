const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  loadNotice,
  countNotice,
  mainNotice,
  searchNotice,
  createComment,
  deleteNotice,
  addLike,
  deleteLike,
  createNotice,
  updateNotice,
  deleteCommnet,
  loadOneNotice,
} = require("../../controllers/noticeCtrl");

// 페이지네이션을 위한 전체 갯수
router.get("/count", countNotice);
// main에 공지사항 가져오기
router.get("/detail/:postId", loadOneNotice);
router.get("/main", mainNotice);
router.get("/search", searchNotice);
router.get("/:page", loadNotice);
router.post("/", auth, createNotice);
router.post("/comment", auth, createComment);
router.put("/:postId", auth, updateNotice);
router.post("/:postId/like", auth, addLike);
router.delete("/:postId", auth, deleteNotice);
router.delete("/:postId/like", auth, deleteLike);
router.delete("/:postId/:commentId", auth, deleteCommnet);
module.exports = router;
