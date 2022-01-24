const { Notice } = require("../models");
const mongoose = require("mongoose");

const noticeCtrl = {
  loadNotice: async (req, res) => {
    try {
      const { page } = req.params;
      const notices = await Notice.find()
        .populate({ path: "author", select: "_id nick" })
        .sort("-date")
        .skip((parseInt(page) - 1) * 10)
        .limit(10);
      return res.status(200).json({
        success: true,
        notices,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "공지사항을 불러오는데 실패했습니다.",
      });
    }
  },

  countNotice: async (req, res) => {
    try {
      const notices = await Notice.find();
      return res.status(200).json({
        success: true,
        count: notices.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "총 공지사항 갯수를 가져오는데 실패했습니다.",
      });
    }
  },

  mainNotice: async (req, res) => {
    try {
      const notices = await Notice.find()
        .populate({ path: "author", select: "nick" })
        .sort("-date")
        .limit(8);
      return res.status(200).json({
        success: true,
        notices,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "공지사항을 불러오는데 실패했습니다.",
      });
    }
  },
  searchNotice: async (req, res) => {
    const { type, text } = req.query;
    const regex = new RegExp(text, "i");
    try {
      if (type === "title") {
        const notices = await Notice.find({
          title: regex,
        })
          .sort("-date")
          .populate({ path: "author", select: "_id nick" });
        return res.status(200).json({
          success: true,
          notices,
        });
      }
      // find에 바로 regex를 줄 수 없는 것은 author는 objectId이고
      // type 변수는 author 즉 string 이기때문에 호환불가능
      if (type === "author") {
        const notices = await Notice.find()
          .sort("-date")
          .populate({ path: "author", select: "_id nick" });

        const searchNotices = notices.filter((notice) => {
          return notice.author.nick.search(regex) !== -1;
        });
        return res.status(200).json({
          success: true,
          notices: searchNotices,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "검색한 데이터를 조회하는데 실패했습니다.",
      });
    }
  },

  loadOneNotice: async (req, res) => {
    const { postId } = req.params;
    try {
      const oid = mongoose.Types.ObjectId.isValid(postId);
      if (!oid) {
        return res.status(400).json({
          auth: true,
          success: false,
          valid: false,
        });
      }
      const notice = await Notice.findOne({
        _id: postId,
      })
        .populate("author")
        .populate({
          path: "comment",
          populate: {
            path: "user",
            select: "img nick _id role",
          },
        });
      return res.status(200).json({
        auth: true,
        success: true,
        notice,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        valid: true,
        message: "공지사항을 불러오는데 실패했습니다",
      });
    }
  },
  createNotice: async (req, res) => {
    const { title, text, date } = req.body;
    try {
      await Notice.create({
        title,
        text,
        date,
        author: req.user._id,
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "공지사항을 만드는 데 실패했습니다",
      });
    }
  },
  createComment: async (req, res) => {
    const { text, postId, date } = req.body;
    try {
      await Notice.findByIdAndUpdate(postId, {
        $push: {
          comment: {
            user: req.user._id,
            comment: text,
            date,
          },
        },
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "댓글 작성에 실패했습니다",
      });
    }
  },
  deleteCommnet: async (req, res) => {
    const { postId, commentId } = req.params;
    try {
      await Notice.findByIdAndUpdate(postId, {
        $pull: {
          comment: {
            _id: commentId,
          },
        },
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "댓글을 지우는데 실패했습니다",
      });
    }
  },
  deleteNotice: async (req, res) => {
    try {
      await Notice.deleteOne({
        _id: req.params.postId,
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "공지사항을 지우는데 실패했습니다",
      });
    }
  },

  addLike: async (req, res) => {
    try {
      await Notice.findByIdAndUpdate(req.params.postId, {
        $addToSet: { like: req.user._id },
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "좋아요에 실패했습니다",
      });
    }
  },

  deleteLike: async (req, res) => {
    try {
      await Notice.findByIdAndUpdate(req.params.postId, {
        $pull: { like: req.user._id },
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "좋아요를 취소하는데 실패했습니다",
      });
    }
  },

  updateNotice: async (req, res) => {
    const { title, text } = req.body;
    try {
      const notice = await Notice.findByIdAndUpdate(req.params.postId, {
        title,
        text,
      });
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "공지사항 수정에 실패했습니다",
      });
    }
  },
};

module.exports = noticeCtrl;
