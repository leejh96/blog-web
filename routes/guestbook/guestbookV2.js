const express = require("express");
const router = express.Router();
const { Guestbook } = require("../../models");
const { auth } = require("../../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    const { page } = req.params;
    const guests = await Guestbook.find()
      .populate("writer")
      .sort("-date")
      .skip((parseInt(page) - 1) * 10)
      .limit(10); // -는 내림차순
    if (guests) {
      return res.json({
        success: true,
        guests,
      });
    }
    return res.json({
      success: false,
      message: "방명록을 불러오는데 실패했습니다",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const guestbook = await Guestbook.create({
      writer: req.user._id,
      text: req.body.text,
      date: req.body.date,
    });
    if (guestbook) {
      return res.json({
        auth: true,
        success: true,
        createContent: guestbook,
      });
    }
    return res.json({
      auth: true,
      success: false,
      message: "방명록 등록에 실패했습니다.",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {
    const guestbook = await Guestbook.findOneAndDelete({ _id: req.body.id });
    if (guestbook) {
      return res.json({
        auth: true,
        success: true,
        guestbook,
      });
    }
    return res.json({
      auth: true,
      success: false,
      message: "삭제하는데 실패했습니다.",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;

/*
const express = require('express');
const router = express.Router();
const { Guestbook } = require('../models');
const {auth} = require('../middleware/auth');

router.get('/', async(req, res, next) => {
    try {
        const guests = await Guestbook.find().populate('writer').sort('-date'); // -는 내림차순
        if(guests){
            return res.json({
                success : true,
                guests
            })            
        }
        return res.json({
            success : false,
            message : '방명록을 불러오는데 실패했습니다'
        })
    } catch (error) {
        next(error);
    }
});

router.post('/', auth, async(req, res, next) => {
    try {
        const guestbook = await Guestbook.create({
            writer : req.user._id,
            text : req.body.text,
            date : req.body.date,
        })
        if(guestbook){
            return res.json({
                auth : true,
                success : true,
                createContent : guestbook
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '방명록 등록에 실패했습니다.'
        })
    } catch (error) {
        next(error);
    }

});

router.delete('/', auth, async(req, res, next) => {
    try {
        const guestbook = await Guestbook.findOneAndDelete({ _id : req.body.id });
        if(guestbook){
            return res.json({
                auth : true,
                success : true,
                guestbook
            })
        }
        return res.json({
            auth : true,
            success : false,
            message : '삭제하는데 실패했습니다.'
        })
    } catch (error) {
        next(error);
    }

});
module.exports = router;

*/
