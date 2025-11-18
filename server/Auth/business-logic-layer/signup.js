const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isEmailExists, createUser } = require("../data-access-layer/Auth-DAL");

async function SignUpBL(UserName, Email, Password) {
  try {
    const hasedPassword = await bcrypt.hash(Password, 10);

    const isExists = await isEmailExists(Email);

    if (isExists) {
      const error = new Error("Email already exists");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const newUser = await createUser(Email, UserName, hasedPassword);

    const Token = jwt.sign(
      {
        UserId: newUser.UserId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    return {
      UserId: newUser.UserId,
      Token,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { SignUpBL };
