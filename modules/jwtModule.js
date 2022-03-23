const jwt = require("jsonwebtoken");

const jwtModule = {
  expSetting: (refresh) => {
    if (refresh) {
      return Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      // return Math.floor(Date.now() / 1000) + 10;
    } else {
      return Math.floor(Date.now() / 1000) + 60 * 30;
      // return Math.floor(Date.now() / 1000) + 5;
    }
  },
  sign: (tokenExp, id, refresh) => {
    if (refresh) {
      return jwt.sign(
        {
          exp: tokenExp,
          data: id.toString(),
        },
        process.env.REFRESH_TOKEN_SECRET
      );
    } else {
      return jwt.sign(
        {
          exp: tokenExp,
          data: id.toString(),
        },
        process.env.TOKEN_SECRET
      );
    }
  },

  verify: (token, refresh) => {
    if (refresh) {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } else {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    }
  },
};

module.exports = jwtModule;
