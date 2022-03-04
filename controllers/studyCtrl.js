const { Study } = require("../models");

const studyCtrl = {
  mainLoadStudy: async (req, res) => {
    try {
      const studies = await Study.find()
        .sort({ updatedAt: -1 })
        .select("subject link")
        .limit(8);
      return res.status(200).json({
        success: true,
        studies,
      });
    } catch (error) {
      return res.status(500).json({
        message: "최근 게시물을 불러오는데 실패했습니다",
        success: false,
      });
    }
  },
  loadStudy: async (req, res) => {
    try {
      const studies = await Study.find();
      return res.status(200).json({
        success: true,
        studies,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "스터디 목록을 조회하는데 실패했습니다",
      });
    }
  },
  loadOneStudy: async (req, res) => {
    try {
      const page = await Study.findOne({ subject: req.params.page });
      return res.status(200).json({
        success: true,
        page,
      });
    } catch (error) {
      return res.status(500).json({
        message: "해당 데이터를 불러오는데 실패했습니다",
        success: false,
      });
    }
  },
  createStudy: async (req, res) => {
    try {
      const study = await Study.create({
        subject: req.body.text,
        link: `/study/${req.body.text}`,
      });
      if (study) {
        return res.status(200).json({
          auth: true,
          success: true,
          study,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "추가항목 생성에 실패했습니다",
        auth: true,
        success: false,
      });
    }
  },
  updateStudy: async (req, res, next) => {
    try {
      await Study.findOneAndUpdate(
        { subject: req.params.page },
        {
          text: req.body.text,
        }
      );
      return res.status(200).json({
        auth: true,

        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
      });
    }
  },
  deleteStudy: async (req, res) => {
    try {
      const del = await Study.deleteOne({
        _id: req.body.id,
      });
      if (del.ok) {
        return res.status(200).json({
          auth: true,
          success: true,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "해당 데이터를 삭제하는데 실패했습니다",
        auth: true,
        success: false,
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
      await Study.findOneAndUpdate(
        {
          subject: req.params.study,
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
      return res.status(200).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "댓글 생성에 실패했습니다",
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const study = await Study.findOneAndUpdate(
        {
          subject: req.params.study,
        },
        {
          $pull: {
            comment: {
              _id: req.query.commentId,
            },
          },
        }
      );
      return res.status(200).json({
        success: true,
        auth: true,
        comment: study.comment,
      });
    } catch (error) {
      return res.status(500).json({
        message: "댓글을 삭제하는데 실패했습니다",
        auth: true,
        success: false,
      });
    }
  },
};

module.exports = studyCtrl;
