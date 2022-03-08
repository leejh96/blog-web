const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  logout,
  findUser,
  newPassword,
  uploadImage,
} = require("../../controllers/userCtrl");
const { auth } = require("../../middleware/auth");
const upload = require("../../modules/multerModule");

router.get("/", auth, getUser);
router.get("/logout", auth, logout);
router.get("/find", findUser);
router.post("/register", register);
router.post("/login", login);
router.post("/password", newPassword);
router.post("/img", auth, upload.single("file"), uploadImage);

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

// const userImg = await User.findOne({ _id : req.user._id});
// if(userImg.img !== ''){
//     fs.unlink(`upload/${req.user.img}`, err => {
//         if (err) {
//             console.error(err);
//             return res.json({
//                 auth : true,
//                 success : false,
//                 message : '이미지 삭제 에러!',
//             });
//         }
//     });
// }
// const user = await User.findOneAndUpdate({ _id : req.user._id}, { img : req.file.filename});
// if(user){
//     return res.json({
//         success : true,
//         auth : true,
//         file : req.file.filename,
//     });
// }
// return res.json({
//     auth : true,
//     success : false,
//     message : '이미지 변경에 실패했습니다.'
// })
