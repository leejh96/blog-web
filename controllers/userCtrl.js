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
          message: "아이디 및 비밀번호를 다시한번 확인해주시기 바랍니다.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "아이디 및 비밀번호를 다시한번 확인해주시기 바랍니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB에러!",
      });
    }
  },
  getUser: (req, res) => {
    if (req.user) {
      return res.status(200).json({
        success: true,
        user: req.user || "",
        token: req.token || "",
        auth: true,
      });
    }
    return res.status(401).json({
      success: false,
      auth: true,
      message: "유저 인증에 실패했습니다",
    });
  },
  logout: async (req, res) => {
    if (req.user.provider === "local") {
      try {
        await User.findOneAndUpdate(
          { _id: req.user._id },
          {
            refreshToken: "",
            refreshTokenExp: 0,
          }
        );
        return res.status(200).clearCookie("rft").json({
          success: true,
          auth: true,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          auth: true,
          message: "DB서버 에러",
        });
      }
    }
    if (req.user.provider === "google") {
      req.logout();
      return res
        .clearCookie("connect.sid")
        .clearCookie("oauth")
        .status(200)
        .json({
          success: true,
          auth: true,
        });
    }
  },
  findUser: async (req, res) => {
    const { email, username } = req.query;
    try {
      const user = await User.findOne({
        email,
        username,
      }).select("_id");
      if (user) {
        return res.status(200).json({
          success: true,
          user: user._id,
        });
      }
      return res.status(400).json({
        success: false,
        message: "해당하는 유저가 없습니다",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  newPassword: async (req, res) => {
    const { password, id } = req.body;
    const hashData = await hashPassword(password);
    if (!hashData.success) {
      return res.status(510).json({
        success: false,
        message: "패스워드 암호화 오류",
      });
    }
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { password: hashData.password }
      );
      if (user) {
        return res.status(200).json({
          success: true,
        });
      }
      return res.status(404).json({
        success: false,
        message: "유저가 존재하지 않습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  uploadImage: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { img: req.file.location }
      );
      if (user) {
        return res.status(200).json({
          success: true,
          auth: true,
          file: req.file.location,
        });
      }
      return res.status(400).json({
        auth: true,
        success: false,
        message: "로그인 유저를 찾는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  deleteImage: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
        }
      );
      if (user) {
        return res.status(200).json({
          auth: true,
          success: true,
          img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
        });
      }
      return res.status(400).json({
        auth: true,
        success: false,
        message: "로그인 유저를 찾는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  updateMotto: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { motto: req.body.text }
      );
      if (user) {
        return res.status(200).json({
          auth: true,
          success: true,
          motto: req.body.text,
        });
      }
      return res.status(400).json({
        auth: true,
        success: false,
        message: "유저를 가져오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  changeNick: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { nick: req.body.nick }
      );
      if (user) {
        return res.status(200).json({
          auth: true,
          success: true,
          message: "닉네임이 변경되었습니다.",
        });
      }
      return res.status(400).json({
        auth: true,
        success: false,
        message: "유저를 가져오는데 실패했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (user) {
        const comparePassword = await compare(req.body.password, user.password);
        if (!comparePassword.success) {
          return res.status(509).json({
            success: false,
            message: "패스워드 암호화 비교 오류",
          });
        }
        if (comparePassword.tf) {
          return res.status(410).json({
            auth: true,
            success: false,
            message:
              "기존의 비밀번호와 일치합니다. 다른 비밀번호를 입력하세요.",
          });
        }
        const hashedPassword = await hashPassword(req.body.password);
        if (!hashedPassword.success) {
          return res.status(510).json({
            success: false,
            message: "패스워드 암호화 오류",
          });
        }
        try {
          const updateUser = await User.findOneAndUpdate(
            { _id: req.user._id },
            { password: hashedPassword.password }
          );
          return res.status(200).json({
            auth: true,
            success: true,
            message: "비밀번호가 변경되었습니다.",
            user: updateUser,
          });
        } catch (error) {
          return res.status(400).json({
            auth: true,
            success: false,
            message: "유저를 찾을 수 없습니다.",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (user) {
        const comparePassword = await compare(req.body.password, user.password);
        if (!comparePassword.success) {
          return res.status(509).json({
            success: false,
            message: "패스워드 암호화 비교 오류",
          });
        }

        if (!comparePassword.tf) {
          return res.status(411).json({
            success: false,
            auth: true,
            message: "비밀번호가 일치하지 않습니다.",
          });
        }

        try {
          await User.findOneAndDelete({ _id: req.user._id });
          return res.clearCookie("rft").status(200).json({
            success: true,
            auth: true,
            message: "회원탈퇴가 완료되었습니다.",
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            auth: true,
            message: "회원탈퇴 에러가 발생했습니다.",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
  deleteOauthUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.user._id });
      if (user) {
        req.logout();
        return res.clearCookie("connect.sid").status(200).json({
          success: true,
          message: "회원탈퇴가 완료되었습니다",
        });
      }
      return res.status(400).json({
        success: false,
        auth: true,
        message: "회원탈퇴 에러가 발생했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        auth: true,
        message: "DB서버 에러",
      });
    }
  },
};

module.exports = userCtrl;
