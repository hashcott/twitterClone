const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    default: "/images/profilePic.png",
  },
}, {
  timestamps : true
});

UserSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  try {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
})

UserSchema.methods.comparePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;