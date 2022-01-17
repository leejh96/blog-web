const { Guestbook } = require("../models");

const guestBookCtrl = {
  loadGuestBook: async (req, res) => {
    const { page } = req.params;
    try {
      const guests = await Guestbook.find()
        .populate({ path: "writer", select: "nick _id" })
        .sort("-date") // -는 내림차순
        .skip((parseInt(page) - 1) * 10)
        .limit(10);
      if (guests) {
        return res.status(200).json({
          success: true,
          guests,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "방명록을 불러오는데 실패했습니다",
      });
    }
  },

  countGuestBook: async (req, res) => {
    try {
      const count = await Guestbook.find().select("_id");
      return res.status(200).json({
        success: true,
        count: count.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "방명록을 불러오는데 실패했습니다",
      });
    }
  },

  createGuestBook: async (req, res, next) => {
    try {
      const guestbook = await Guestbook.create({
        writer: req.user._id,
        text: req.body.text,
        date: req.body.date,
      });
      if (guestbook) {
        return res.status(200).json({
          auth: true,
          success: true,
          createContent: guestbook,
        });
      }
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "방명록 등록에 실패했습니다.",
      });
    }
  },
  deleteGusetBook: async (req, res, next) => {
    try {
      const guestbook = await Guestbook.findOneAndDelete({ _id: req.body.id });
      if (guestbook) {
        return res.status(200).json({
          auth: true,
          success: true,
          guestbook,
        });
      }
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "삭제하는데 실패했습니다.",
      });
    }
  },
};

module.exports = guestBookCtrl;
