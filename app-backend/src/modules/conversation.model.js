const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    //REQUIRED UNIQUE INDEX
    conversationKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    lastMessage: String,
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
