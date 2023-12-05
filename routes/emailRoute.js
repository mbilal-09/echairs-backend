const express = require("express");
const router = express.Router();
const response = require("../helpers/response");
const htmlContent = require("../helpers/htmlContent");
const nodemailer = require("nodemailer");
const userModel = require("../model/user");
require("dotenv").config();

// send email
router.post("/", async (req, res) => {
  let { email } = req.body;
  const user = await userModel.find({ email: email });
  if (!user[0]) return response(res, "user not found", null, true);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "bilalkhanshakir@gmail.com",
    to: email,
    subject: "Your eChairs Order Confirmation",
    text: `Hello ${email}, your order has been confirmed!`,
    html: htmlContent(user[0]),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response(res, 408, "email not sent", null, true);
    } else {
      console.log("Email sent: " + info.response);
      response(res, 200, "email sent", null, false);
    }
  });
});

module.exports = router;
