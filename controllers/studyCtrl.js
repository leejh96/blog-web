const { Study } = require("../models");

const studyCtrl = {
  mainLoadStudy: async (req, res) => {
    try {
      const studies = await Study.find()
        .sort({ updatedAt: -1 })
        .select("subject link")
        .limit(8);
      if (studies) {
        return res.status(200).json({
          success: true,
          studies,
        });
      }
      return res.status(404).json({
        success: false,
        message: "최근 게시물을 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB서버 에러!",
        success: false,
      });
    }
  },
  loadStudy: async (req, res) => {
    try {
      const studies = await Study.find();
      if (studies) {
        return res.status(200).json({
          success: true,
          studies,
        });
      }
      return res.status(404).json({
        success: false,
        message: "스터디 목록을 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  loadOneStudy: async (req, res) => {
    try {
      const study = await Study.findOne({ subject: req.params.page }).populate({
        path: "comment",
        populate: {
          path: "user",
          select: "_id img nick",
        },
      });
      if (study) {
        return res.status(200).json({
          success: true,
          study,
        });
      }
      return res.status(404).json({
        success: false,
        message: "스터디 데이터를 불러오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB서버 에러!",
        success: false,
      });
    }
  },
  createStudy: async (req, res) => {
    try {
      await Study.create({
        subject: req.body.text,
        link: `/study/${req.body.text}`,
      });
      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB서버 에러!",
        success: false,
      });
    }
  },
  updateStudy: async (req, res, next) => {
    try {
      const study = await Study.findOneAndUpdate(
        { subject: req.params.page },
        {
          text: req.body.text,
        }
      );
      if (study) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "컨텐츠를 업데이트 하는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  deleteStudy: async (req, res) => {
    try {
      await Study.deleteOne({
        _id: req.query.id,
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
  loadCommentStudy: async (req, res) => {
    try {
      const study = await Study.findOne({
        subject: req.params.study,
      })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            select: "_id img nick",
          },
        })
        .select("_id comment");
      return res.status(200).json({
        success: true,
        comment: study.comment,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "댓글 데이터를 가져오는데 실패했습니다",
      });
    }
  },
  createComment: async (req, res) => {
    try {
      const study = await Study.findOneAndUpdate(
        {
          subject: req.params.page,
        },
        {
          $push: {
            comment: {
              user: req.user._id,
              comment: req.body.comment,
              date: req.body.date,
            },
          },
        }
      );
      if (study) {
        return res.status(201).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "댓글을 생성하는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const study = await Study.findOneAndUpdate(
        {
          subject: req.params.page,
        },
        {
          $pull: {
            comment: {
              _id: req.query.commentId,
            },
          },
        }
      );
      if (study) {
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
        message: "DB서버 에러!",
        success: false,
      });
    }
  },
};

module.exports = studyCtrl;
