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
  deleteImage,
  updateMotto,
  changeNick,
  changePassword,
  deleteUser,
  deleteOauthUser,
} = require("../../controllers/userCtrl");
const { auth } = require("../../middleware/auth");
const upload = require("../../modules/multerModule");
router.get("/", auth, getUser);
router.get("/find", findUser);
router.post("/", register);
router.post("/logout", auth, logout);
router.post("/login", login);
router.post("/password", newPassword);
router.post("/img", auth, upload.single("file"), uploadImage);
router.delete("/img", auth, deleteImage);
router.put("/motto", auth, updateMotto);
router.put("/nick", auth, changeNick);
router.put("/password", auth, changePassword);
router.delete("/", auth, deleteUser);
router.delete("/oauth", auth, deleteOauthUser);

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
