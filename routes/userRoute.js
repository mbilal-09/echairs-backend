const express = require("express");
const router = express.Router();
const userModel = require("../model/user");
const response = require("../helpers/response");
const {
  signup_post,
  login_post,
  logout_get,
  user_get,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

//sign up route
router.post("/signup", (req, res) => {
  signup_post(req, res);
});

//login route
router.post("/login", (req, res) => {
  login_post(req, res);
});

//logout route
router.get("/logout", (req, res) => {
  logout_get(req, res);
});

//get user data route
router.get("/getUserData", (req, res) => {
  user_get(req, res);
});

//get all users
router.get("/allUsers", authMiddleware, async (req, res) => {
  try {
    const id = req.decodedToken?.id;
    if (id) {
      const user = await userModel.findById(id);
      if (user.type === "admin") {
        const users = await userModel.find();
        if (users) {
          users.forEach((user) => {
            user.password = undefined;
          });
          return response(res, 200, "users fetched", users, false);
        }
        throw Error("no users found");
      }
      throw Error(
        "permission denied you don't have access of this type of data"
      );
    }
    throw Error("token not provided");
  } catch (error) {
    response(res, 401, error.message, null, true);
  }
});

module.exports = router;
