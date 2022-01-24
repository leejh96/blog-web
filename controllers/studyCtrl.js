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
      return res.json({
        message: "최근 게시물을 불러오는데 실패했습니다",
        success: false,
      });
    }
  },
};

module.exports = studyCtrl;
