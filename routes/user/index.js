const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers/userCtrl");
const { auth } = require("../../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, (req, res, next) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        user: req.user || "",
        token: req.token || "",
        auth: true,
      });
    }
    return res.json({
      success: false,
      auth: true,
      message: "유저 인증에 실패했습니다",
    });
  } catch (error) {
    next(error);
  }
});
// router.post("/findpassword", async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//       username: req.body.name,
//     });
//     if (user) {
//       return res.status(200).json({
//         success: true,
//         user: user._id,
//       });
//     }
//     return res.json({
//       success: false,
//       message: "해당하는 유저가 없습니다",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/newpassword", async (req, res, next) => {
//   try {
//     const saltRounds = 10;
//     const hash = await bcrypt.hash(req.body.password, saltRounds);
//     const user = await User.findOneAndUpdate(
//       { _id: req.body.id },
//       { password: hash }
//     );
//     if (user) {
//       return res.status(200).json({
//         success: true,
//       });
//     }
//     return res.json({
//       success: false,
//       message: "비밀번호 변경에 실패했습니다",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/logout", auth, async (req, res, next) => {
//   try {
//     if (req.user.provider === "local") {
//       const user = await User.findOneAndUpdate(
//         { _id: req.user._id },
//         {
//           refreshToken: "",
//           refreshTokenExp: 0,
//         }
//       );
//       if (user) {
//         return res.status(200).clearCookie("rft").json({
//           success: true,
//           auth: true,
//         });
//       }
//       return res.json({
//         success: false,
//         auth: true,
//         message: "로그아웃에 실패했습니다.",
//       });
//     }
//     if (req.user.provider === "google") {
//       req.logout();
//       return res.clearCookie("connect.sid").json({
//         success: true,
//         auth: true,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/nick", auth, async (req, res, next) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { nick: req.body.nick }
//     );
//     if (user) {
//       return res.json({
//         auth: true,
//         success: true,
//         message: "변경을 완료했습니다",
//         user,
//       });
//     }
//     return res.json({
//       auth: true,
//       success: false,
//       message: "닉네임 변경에 실패했습니다.",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/password", auth, async (req, res, next) => {
//   try {
//     const saltRounds = 10;
//     const user = await User.findOne({ _id: req.user._id });
//     if (user) {
//       const TF = await bcrypt.compare(req.body.password, user.password);
//       if (TF) {
//         return res.json({
//           auth: true,
//           success: false,
//           message: "기존의 비밀번호와 일치합니다. 다른 비밀번호를 입력하세요.",
//         });
//       }
//       const password = await bcrypt.hash(req.body.password, saltRounds);
//       if (password) {
//         const updateUser = await User.findOneAndUpdate(
//           { _id: req.user._id },
//           { password }
//         );
//         return res.json({
//           auth: true,
//           success: true,
//           message: "비밀번호가 변경되었습니다.",
//           user: updateUser,
//         });
//       }
//     }
//     return res.json({
//       auth: true,
//       success: false,
//       message: "유저를 찾을 수 없습니다.",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/img", auth, upload.single("file"), async (req, res, next) => {
//   try {
//     // const userImg = await User.findOne({ _id : req.user._id});
//     // if(userImg.img !== ''){
//     //     fs.unlink(`upload/${req.user.img}`, err => {
//     //         if (err) {
//     //             console.error(err);
//     //             return res.json({
//     //                 auth : true,
//     //                 success : false,
//     //                 message : '이미지 삭제 에러!',
//     //             });
//     //         }
//     //     });
//     // }
//     // const user = await User.findOneAndUpdate({ _id : req.user._id}, { img : req.file.filename});
//     // if(user){
//     //     return res.json({
//     //         success : true,
//     //         auth : true,
//     //         file : req.file.filename,
//     //     });
//     // }
//     // return res.json({
//     //     auth : true,
//     //     success : false,
//     //     message : '이미지 변경에 실패했습니다.'
//     // })
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { img: req.file.location }
//     );
//     if (user) {
//       return res.json({
//         success: true,
//         auth: true,
//         file: req.file.location,
//       });
//     }
//     return res.json({
//       auth: true,
//       success: false,
//       message: "이미지 변경에 실패했습니다",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/deleteimg", auth, async (req, res, next) => {
//   try {
//     // fs.unlink(`upload/${req.body.img}`, err => {
//     //     if (err) {
//     //         console.error(err);
//     //         return res.json({
//     //             auth : true,
//     //             success : false,
//     //             message : '이미지 삭제 에러!',
//     //         });
//     //     }
//     // });
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       {
//         img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
//       }
//     );
//     if (user) {
//       return res.json({
//         auth: true,
//         success: true,
//         img: "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png",
//       });
//     }
//     return res.json({
//       auth: true,
//       success: false,
//       message: "이미지 삭제에 실패했습니다.",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/motto", auth, async (req, res, next) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { motto: req.body.text }
//     );
//     if (user) {
//       return res.json({
//         auth: true,
//         success: true,
//         motto: req.body.text,
//       });
//     }
//     return res.json({
//       auth: true,
//       success: false,
//       message: "유저를 가져오는데 실패했습니다.",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/", auth, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ _id: req.user._id });
//     if (user) {
//       const TF = await bcrypt.compare(req.body.password, user.password);
//       if (TF) {
//         // if(req.user.img){
//         //     fs.unlink(`upload/${req.user.img}`, err => {
//         //         if (err) {
//         //             console.error(err);
//         //             return res.json({
//         //                 success : false,
//         //                 auth : true,
//         //                 message : '이미지 제거에 실패했습니다.',
//         //             });
//         //         }
//         //     });
//         // }
//         await User.findOneAndDelete({ _id: req.user._id });
//         return res.clearCookie("rft").json({
//           success: true,
//           auth: true,
//           message: "회원탈퇴가 완료되었습니다.",
//         });
//       }
//       return res.json({
//         success: false,
//         auth: true,
//         message: "비밀번호가 일치하지 않습니다.",
//       });
//     }
//     return res.json({
//       success: false,
//       auth: true,
//       message: "회원탈퇴 에러가 발생했습니다.",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/oauth", async (req, res, next) => {
//   try {
//     // if(req.user.img){
//     //     fs.unlink(`upload/${req.user.img}`, err => {
//     //         if (err) {
//     //             return res.json({
//     //                 success : false,
//     //                 message : '이미지 제거에 실패했습니다'
//     //             });
//     //         }
//     //     });
//     // }
//     const user = await User.findOneAndDelete({ _id: req.user._id });
//     if (user) {
//       req.logout();
//       return res.clearCookie("connect.sid").json({
//         success: true,
//         message: "회원탈퇴가 완료되었습니다",
//       });
//     }
//     return res.json({
//       success: false,
//       message: "유저를 찾을 수 없습니다",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
