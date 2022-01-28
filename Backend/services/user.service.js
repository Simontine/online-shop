const {
  createUserDb,
  getUserByEmailDb,
  createUserGoogleDb,
  changeUserPasswordDb,
  getUserByIdDb,
  updateUserDb,
  deleteUserDb,
  getAllUsersDb,
  getUserByUsernameDb,
} = require("../db/user.db");
const { ErrorHandler } = require("../helpers/error");

class UserService {
  createUser = async (user) => {
    try {
      return await createUserDb(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  getUserByEmail = async (email) => {
    try {
      const user = await getUserByEmailDb(email);
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await getUserByIdDb(id);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  changeUserPassword = async (password, email) => {
    try {
      return await changeUserPasswordDb(password, email);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
  updateUser = async (user) => {
    const { email, id } = user;
    const errors = {};
    try {
      const getUser = await getUserByIdDb(id);
      
      const findUserByEmail = await getUserByEmailDb(email);
      
      const emailChanged =
        email && getUser.email.toLowerCase() !== email.toLowerCase();
 
      if (emailChanged && typeof findUserByEmail === "object") {
        errors["email"] = "Email is already taken";
      }
    
      if (Object.keys(errors).length > 0) {
        throw new ErrorHandler(403, errors);
      }

      return await updateUserDb(user);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      return await deleteUserDb(id);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };

  getAllUsers = async () => {
    try {
      return await getAllUsersDb();
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  };
}

module.exports = new UserService();
