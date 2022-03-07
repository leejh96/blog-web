const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const bcrpytModule = {
  hashPassword: async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return { success: true, password: hashedPassword };
    } catch (error) {
      return { success: false };
    }
  },
  compare: async (inputPassword, dbPassword) => {
    try {
      const comparePassword = await bcrypt.compare(inputPassword, dbPassword);
      return {
        success: true,
        tf: comparePassword,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};

module.exports = bcrpytModule;
