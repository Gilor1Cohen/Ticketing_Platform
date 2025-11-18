const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmailExists, getUserData } = require("../data-access-layer/Auth-DAL");

async function LogInBL(Email, Password) {
  try {
    const isExists = await isEmailExists(Email);
    if (!isExists) {
      const error = new Error("Email does not exist");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const userData = await getUserData(Email);

    const passwordMatch = await bcrypt.compare(Password, userData.Password);

    if (!passwordMatch) {
      const error = new Error("Password is incorrect");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const Token = jwt.sign(
      {
        UserId: userData.UserId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return {
      UserId: userData.UserId,
      Token,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { LogInBL };
