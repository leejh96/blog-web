const { User } = require("../models/");
const { verify, expSetting, sign } = require("../modules/jwtModule");

const auth = async (req, res, next) => {
  // 구글 로그인
  if (req.user) {
    return next();
  }

  try {
    const token = verify(req.headers.authorization, false);
    try {
      const user = await User.findOne({ _id: token.data }).select(
        "_id role refreshToken img motto provider username nick email"
      );
      req.user = user;
      req.token = req.headers.authorization;
      return next();
    } catch (error) {
      return res.clearCookie("rft").status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  } catch (error) {
    try {
      const token = verify(req.cookies.rft, true);
      try {
        const user = await User.findOne({ _id: token.data }).select(
          "_id role refreshToken img motto provider username nick email"
        );
        const accessTokenExp = expSetting(false);
        const accessToken = sign(accessTokenExp, user._id, false);

        req.user = user;
        req.token = accessToken;

        return next();
      } catch (error) {
        return res.clearCookie("rft").status(500).json({
          success: false,
          message: "DB서버 에러!",
        });
      }
    } catch (error) {
      return res
        .status(401)
        .clearCookie("rft")
        .clearCookie("oauth")
        .clearCookie("connect.sid")
        .json({
          success: false,
          message: "토큰 만료! 재로그인 해주세요",
        });
    }
  }
};

module.exports = { auth };
