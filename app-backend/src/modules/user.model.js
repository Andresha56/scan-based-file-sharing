const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  avatarSeed: String,
  avatarStyle: String,
}, { timestamps: true });

userSchema.index(
  { name: 1, receiverId: 1 },
  { unique: true }
);

module.exports = mongoose.model("User", userSchema);

