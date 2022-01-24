const { User } = require("../models/");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    //구글 로그인
    if (req.user && !req.headers.authorization) {
      return next();
    }
    const token = await jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET
    );
    const user = await User.findOne({ _id: token.data });
    if (user) {
      req.user = user;
      req.token = req.headers.authorization;
      return next();
    }
    return res.clearCookie("rft").json({
      success: false,
      auth: false,
      message: "유저를 찾을 수 없습니다",
    });
  } catch (error) {
    try {
      const token = await jwt.verify(
        req.cookies.rft,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findOne({ _id: token.data });
      if (user) {
        const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 30;
        const accessToken = await jwt.sign(
          {
            exp: accessTokenExp,
            data: user._id.toString(),
          },
          process.env.TOKEN_SECRET
        );

        req.user = user;
        req.token = accessToken;
        return next();
      }
      return res.clearCookie("rft").json({
        success: false,
        auth: false,
        message: "유저를 찾을 수 없습니다",
      });
    } catch (error) {
      if (req.cookies.rft) {
        return res.clearCookie("rft").json({
          expire: true,
          success: false,
          auth: false,
          message: "세션 만료! 재로그인 해주세요",
        });
      } else {
        return res.json({
          success: false,
          auth: false,
          message: "로그인이 필요합니다",
        });
      }
    }
  }
};

module.exports = { auth };
