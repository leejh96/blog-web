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

  loadCommentStudy: async (req, res) => {
    try {
      const study = await Study.findOne({
        subject: req.params.study,
      })
        .populate({
          path: "comment",
          populate: {
            path: "user",
            // select: "_id img nick",
          },
        })
        .select("_id user date comment");
      console.log(study);
      if (study) {
        return res.json({
          success: true,
          comment: study.comment,
        });
      }
      return res.status(500).json({
        success: false,
        message: "댓글 데이터를 가져오는데 실패했습니다",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = studyCtrl;
