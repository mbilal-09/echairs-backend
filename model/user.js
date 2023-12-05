const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: [true, "please enter your name"],
    minlength: [4, "name must be at least 4 characters long"],
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: [true, "please enter your password"],
    minlength: [6, "name must be at least 6 characters long"],
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: [true, "please enter your address"],
  },
  type: {
    type: mongoose.SchemaTypes.String,
    enum: ["admin", "user"],
    default: "user",
  },
});

//hashing password
userSchema.pre('save', async function () {
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds);
    this.password = await bcrypt.hashSync(this.password, salt);
})

const user = mongoose.model("users", userSchema);

module.exports = user;
