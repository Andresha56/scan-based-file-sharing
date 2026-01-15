const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
    minLength: [3, "Shop name should be three characters long"],
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "Password should be three characters long"],
    select: false,
  },
  qrCode: { type: String },
  refreshToken: {
    type: String,
    select: false,
  },
});

shopSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
};

shopSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

shopSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

shopSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const shopModel = mongoose.model("shop", shopSchema);
module.exports = shopModel;
