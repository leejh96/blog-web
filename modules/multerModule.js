const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, cb){
//             // 현재위치가 아닌 맨처음에서 시작하는 듯
//             cb(null, 'upload/');
//         },

//         filename(req, file, cb){
//             const ext = path.extname(file.originalname);
//             cb(null, file.originalname.split('.')[0] + Date.now() + ext);
//         }
//     }),
//     limits: {fileSize: 5 * 1024 *1024}
// });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "julog-app/uploads",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read", //읽기만 가능
    key: (req, file, cb) => {
      //파일이름 설정하는 곳
      const ext = path.extname(file.originalname);
      cb(null, file.originalname.split(".")[0] + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
