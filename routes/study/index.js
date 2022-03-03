const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");
const {
  mainLoadStudy,
  loadCommentStudy,
} = require("../../controllers/studyCtrl");
const { Study } = require("../../models");

router.get("/", async (req, res, next) => {
  try {
    const studies = await Study.find();
    if (studies) {
      return res.json({
        success: true,
        studies,
      });
    }
    return res.json({
      success: false,
      message: "스터디 목록을 조회하는데 실패했습니다",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/main", mainLoadStudy);

router.post("/", auth, async (req, res, next) => {
  try {
    const study = await Study.create({
      subject: req.body.text,
      link: `/study/${req.body.text}`,
    });
    if (study) {
      return res.json({
        auth: true,
        success: true,
        study,
      });
    }
    return res.json({
      message: "추가항목 생성에 실패했습니다",
      auth: true,
      success: false,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const del = await Study.deleteOne({
      _id: req.body.id,
    });
    if (del.ok) {
      return res.json({
        auth: true,
        success: true,
      });
    }
    return res.json({
      message: "해당 데이터를 삭제하는데 실패했습니다",
      auth: true,
      success: false,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:page", async (req, res, next) => {
  try {
    const page = await Study.findOne({ subject: req.params.page });
    if (page) {
      return res.json({
        success: true,
        page,
      });
    }
    return res.json({
      message: "해당 데이터를 불러오는데 실패했습니다",
      success: false,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:study/comment", loadCommentStudy);

router.post("/:study/create", auth, async (req, res, next) => {
  try {
    const text = await Study.create({
      subject: req.body.study,
      text,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:study/comment", auth, async (req, res, next) => {
  try {
    const study = await Study.findOneAndUpdate(
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
    if (study) {
      return res.json({
        auth: true,
        success: true,
      });
    }
    return res.json({
      auth: true,
      success: false,
      message: "댓글 생성에 실패했습니다",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:page", auth, async (req, res, next) => {
  try {
    const findStudy = await Study.findOneAndUpdate(
      { subject: req.params.page },
      {
        text: req.body.text,
      }
    );
    if (findStudy) {
      return res.json({
        auth: true,
        success: true,
      });
    }
    return res.json({
      auth: true,
      success: false,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:study/deletecomment", auth, async (req, res, next) => {
  try {
    const study = await Study.findOneAndUpdate(
      {
        subject: req.params.study,
      },
      {
        $pull: {
          comment: {
            _id: req.body.id,
          },
        },
      }
    );
    if (study) {
      return res.json({
        success: true,
        auth: true,
        comment: study.comment,
      });
    }
    return res.json({
      message: "댓글을 삭제하는데 실패했습니다",
      auth: true,
      success: false,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
