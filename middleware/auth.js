const { User } = require("../models/");
const { verify, expSetting } = require("../modules/jwtModule");

const auth = async (req, res, next) => {
  try {
    //구글 로그인
    if (req.user && !req.headers.authorization) {
      return next();
    }
    const token = verify(req.headers.authorization, false);
    const user = await User.findOne({ _id: token.data }).select(
      "_id role refreshToken img motto provider username nick email"
    );
    if (user) {
      console.log(token);
      req.user = user;
      req.token = req.headers.authorization;
      return next();
    }
    return res.clearCookie("rft").status(401).json({
      success: false,
      auth: false,
      message: "유저를 찾을 수 없습니다",
    });
  } catch (error) {
    try {
      const token = verify(req.cookies.rft, true);
      const user = await User.findOne({ _id: token.data }).select(
        "_id role refreshToken img motto provider username nick email"
      );
      if (user) {
        const accessTokenExp = expSetting(false);
        const accessToken = sign(accessTokenExp, user._id, false);
        console.log(accessToken);
        req.user = user;
        req.token = accessToken;
        return next();
      }
      return res.clearCookie("rft").status(401).json({
        success: false,
        auth: false,
        message: "유저를 찾을 수 없습니다",
      });
    } catch (error) {
      if (req.cookies.rft) {
        return res.status(401).clearCookie("rft").json({
          expire: true,
          success: false,
          auth: false,
          message: "세션 만료! 재로그인 해주세요",
        });
      }
      // else {
      //   return res.status(401).json({
      //     success: false,
      //     auth: false,
      //     message: "로그인이 필요합니다",
      //   });
      // }
    }
  }
};

module.exports = { auth };
