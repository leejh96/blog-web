const { User } = require("../models");
const { hashPassword, compare } = require("../modules/bcryptModule");
const { expSetting, sign } = require("../modules/jwtModule");
const userCtrl = {
  register: async (req, res) => {
    try {
      const findUser = await User.findOne({ email: req.body.email });
      if (findUser) {
        return res.json({
          success: false,
          message: "이미 존재하는 이메일 입니다.",
        });
      }
      const hashData = await hashPassword(req.body.password);
      if (!hashData.success) {
        return res.status(510).json({
          success: false,
          message: "패스워드 암호화 오류",
        });
      }
      const user = await User.create({
        username: req.body.username,
        password: hashData.password,
        nick: req.body.nick,
        email: req.body.email,
        img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
      });
      if (user) {
        return res.status(200).json({
          success: true,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "회원가입에 실패했습니다",
      });
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const comparePassword = await compare(req.body.password, user.password);
        if (!comparePassword.success) {
          return res.status(509).json({
            success: false,
            message: "패스워드 암호화 비교 오류",
          });
        }
        if (comparePassword.tf) {
          const refreshTokenExp = expSetting(true);
          const accessTokenExp = expSetting(false);

          const accessToken = sign(accessTokenExp, user._id, false);
          const refreshToken = sign(refreshTokenExp, user._id, true);
          user.refreshToken = refreshToken;
          user.refreshTokenExp = refreshTokenExp;
          await user.save();
          return res
            .status(200)
            .cookie("rft", refreshToken, {
              httpOnly: true,
              secret: true,
            })
            .json({
              success: true,
              user,
              accessToken,
            });
        }
        return res.status(401).json({
          success: false,
          message: "아이디 및 비밀번호를 다시한번 확인해주시기 바랍니다",
        });
      }
      return res.status(204).json({
        success: false,
        message: "해당하는 유저가 없습니다",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB에러!",
      });
    }
  },
};

module.exports = userCtrl;
