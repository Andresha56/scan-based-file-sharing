const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema({
  receiverId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("room", RoomSchema);
