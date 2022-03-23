const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PassportConfig = require("../passport");
const indexRouter = require("../routes");

PassportConfig(passport);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongoDB connected ...");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const option = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
  },
};
if (process.env.NODE_ENV === "production") {
  option.cookie.secret = true;
}
app.use(session(option));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

//api들보다 위에 있다면 api를 가기전에 get을 실행하기 때문에 db를 가져올 수 없다 따라서 api들과 err처리 미들웨어 밑에 넣어준다.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server ${port}port connected ...`);
});
