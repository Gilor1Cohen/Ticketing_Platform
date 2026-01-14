const User = require("./User.schema");

async function isEmailExists(Email) {
  try {
    const user = await User.findOne({ Email: Email });

    return user ? true : false;
  } catch (error) {
    throw error;
  }
}

async function createUser(Email, UserName, HashedPassword) {
  try {
    const create = await User.create({
      Email,
      UserName,
      Password: HashedPassword,
    });

    return {
      UserId: create._id._id,
    };
  } catch (error) {
    throw error;
  }
}

async function getUserData(Email) {
  try {
    const user = await User.findOne({ Email: Email });
    return {
      Password: user.Password,
      UserId: user._id,
    };
  } catch (error) {
    throw error;
  }
}

async function DeleteUserFormDB(UserId) {
  try {
    const res = await User.deleteOne({ _id: UserId });

    return res.deletedCount === 1;
  } catch (error) {
    error.message = "Failed to delete user";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { isEmailExists, createUser, getUserData, DeleteUserFormDB };
