const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    index: true, // important for fast reads
  },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: {
    type: String,
    enum: ["text", "image", "file"],
    required: true,
  },
  payload: {
    message: { type: String },
    url: { type: String },
    fileName: { type: String },
    fileSize: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
