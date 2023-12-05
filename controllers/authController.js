const response = require("../helpers/response");
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// error handlers
const errorHandle = (error) => {
  // Sign Up errors
  let signupErrors = {
    name: "",
    email: "",
    password: "",
    address: "",
  };

  if (error.code === 11000) {
    signupErrors.email = "Email is already in use";
    return signupErrors;
  }
  if (error.message.includes("users validation failed")) {
    Object.values(error.errors).forEach((err) => {
      signupErrors[err.properties?.path] = err.properties?.message;
    });
    return signupErrors;
  }

  //login error
  let loginError = { email: "", password: "" };

  if (error.message === "incorrect email") {
    loginError.email = "incorrect email";
    return loginError;
  }

  if (error.message === "incorrect password") {
    loginError.password = "incorrect password";
    return loginError;
  }
};

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const maxAge = 1000 * 60 * 60 * 24 * 30;
//Sign Up
module.exports.signup_post = async (req, res) => {
  try {
    const user = await userModel.create({ ...req.body });
    const token = generateToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge });
    user.password = undefined;
    response(res, 200, "sign up", user, false);
  } catch (error) {
    console.log(error);
    const err = errorHandle(error);
    response(res, 401, err, null, true);
  }
};

//Log In
module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        const token = generateToken(user._id);
        res.cookie("jwt", token, { maxAge: maxAge });
        user.password = undefined;
        return response(res, 200, "Login Successful", user, false);
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  } catch (error) {
    const err = errorHandle(error);
    response(res, 500, err, null, true);
  }
};

//Log Out
module.exports.logout_get = (req, res) => {
  try {
    res.clearCookie("jwt");
    response(res, 200, "logout successfully", null, false);
  } catch (error) {
    response(res, 401, "internal server error", null, true);
  }
};

//get user
module.exports.user_get = (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (token) {
      return jwt.verify(
        token,
        process.env.JWT_SECRET,
        async (err, decodedToken) => {
          if (err) {
            return response(res, 403, "you are not logged in", null, true);
          } else {
            let userId = decodedToken.id;
            const user = await userModel.findById(userId);
            user.password = undefined;
            return response(res, 200, "successfully fetched data", user, false);
          }
        }
      );
    }
    throw Error("you are not logged in");
  } catch (error) {
    response(res, 401, error.message, null, true);
  }
};
