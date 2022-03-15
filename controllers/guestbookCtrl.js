const { Guestbook } = require("../models");

const guestBookCtrl = {
  loadGuestBook: async (req, res) => {
    const { page } = req.params;
    try {
      const guestbooks = await Guestbook.find()
        .populate({ path: "writer", select: "nick _id" })
        .sort("-date") // -는 내림차순
        .skip((parseInt(page) - 1) * 10)
        .limit(10);
      if (guestbooks) {
        return res.status(200).json({
          success: true,
          guestbooks,
        });
      }
      return res.status(404).json({
        success: false,
        message: "방명록 데이터를 불러오는 데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  countGuestBook: async (req, res) => {
    try {
      const count = await Guestbook.find().select("_id");
      if (count) {
        return res.status(200).json({
          success: true,
          count: count.length,
        });
      }
      return res.status(404).json({
        success: false,
        message: "방명록 데이터를 불러오는 데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  createGuestBook: async (req, res) => {
    const { text, date } = req.body;
    try {
      await Guestbook.create({
        writer: req.user._id,
        text,
        date,
      });
      return res.status(201).json({
        auth: true,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "방명록 등록에 실패했습니다.",
      });
    }
  },
  deleteGusetBook: async (req, res) => {
    try {
      const guestbook = await Guestbook.findOneAndDelete({ _id: req.query.id });
      if (guestbook) {
        return res.status(200).json({
          auth: true,
          success: true,
          guestbook,
        });
      }
      return res.status(404).json({
        auth: true,
        success: false,
        message: "지울 데이터를 찾는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        auth: true,
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
};

module.exports = guestBookCtrl;
