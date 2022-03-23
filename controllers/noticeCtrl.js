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
      if (notices) {
        return res.status(200).json({
          success: true,
          notices,
        });
      }
      return res.status(404).json({
        success: false,
        message: "공지사항을 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  countNotice: async (req, res) => {
    try {
      const notices = await Notice.find();
      if (notices) {
        return res.status(200).json({
          success: true,
          count: notices.length,
        });
      }
      return res.status(404).json({
        success: false,
        message: "공지사항 갯수를 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  mainNotice: async (req, res) => {
    try {
      const notices = await Notice.find()
        .populate({ path: "author", select: "nick" })
        .sort("-date")
        .limit(8);
      if (notices) {
        return res.status(200).json({
          success: true,
          notices,
        });
      }
      return res.status(404).json({
        success: false,
        message: "공지사항 데이터를 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
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
        if (notices) {
          return res.status(200).json({
            success: true,
            notices,
          });
        }
        return res.status(404).json({
          success: false,
          message: "검색한 데이터를 찾을 수 없습니다.",
        });
      }
      // find에 바로 regex를 줄 수 없는 것은 author는 objectId이고
      // type 변수는 author 즉 string 이기때문에 호환불가능
      if (type === "author") {
        const notices = await Notice.find()
          .sort("-date")
          .populate({ path: "author", select: "_id nick" });
        if (notices) {
          const searchNotices = notices.filter((notice) => {
            return notice.author.nick.search(regex) !== -1;
          });
          return res.status(200).json({
            success: true,
            notices: searchNotices,
          });
        }
        return res.status(404).json({
          success: false,
          message: "검색한 데이터를 찾을 수 없습니다.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  loadOneNotice: async (req, res) => {
    const { postId } = req.params;
    try {
      const oid = mongoose.Types.ObjectId.isValid(postId);
      if (!oid) {
        return res.status(400).json({
          success: false,
          message: "부정확한 요청입니다.",
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

      if (notice) {
        return res.status(200).json({
          success: true,
          notice,
        });
      }
      return res.status(404).json({
        success: false,
        message: "공지사항을 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  createNotice: async (req, res) => {
    const { input, date } = req.body;
    const { title, text } = input;
    try {
      await Notice.create({
        title,
        text,
        date,
        author: req.user._id,
      });
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  createComment: async (req, res) => {
    const { text, postId, date } = req.body;
    try {
      const notice = await Notice.findByIdAndUpdate(postId, {
        $push: {
          comment: {
            user: req.user._id,
            comment: text,
            date,
          },
        },
      });
      if (notice) {
        return res.status(201).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "댓글작성에 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  deleteCommnet: async (req, res) => {
    const { postId, commentId } = req.params;
    try {
      const notice = await Notice.findByIdAndUpdate(postId, {
        $pull: {
          comment: {
            _id: commentId,
          },
        },
      });
      if (notice) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "댓글 삭제에 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  deleteNotice: async (req, res) => {
    try {
      await Notice.deleteOne({
        _id: req.params.postId,
      });
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  addLike: async (req, res) => {
    try {
      const notice = await Notice.findByIdAndUpdate(req.params.postId, {
        $addToSet: { like: req.user._id },
      });
      if (notice) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "좋아요를 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  deleteLike: async (req, res) => {
    try {
      const notice = await Notice.findByIdAndUpdate(req.params.postId, {
        $pull: { like: req.user._id },
      });
      if (notice) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "좋아요 취소를 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  updateNotice: async (req, res) => {
    const { date, input } = req.body;
    const { title, text } = input;
    try {
      const notice = await Notice.findByIdAndUpdate(req.params.postId, {
        title,
        text,
        date,
      });
      if (notice) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "공지사항 수정에 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
};

module.exports = noticeCtrl;
