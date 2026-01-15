// const Message = require("@modules/message.model");
// const conversationService = require("@services/conversation.service");
// const previewMessage = require("@utils/previewMessage");
// const {
//   getConversationId,
//   setConversationId,
// } = require("@cache/conversation.cache");
// const { validationResult } = require("express-validator");

// module.exports.sendMessage = async (req, res) => {
//   try {
//     // 1️ Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { senderId, receiverId, type, payload } = req.body;

//     // 2️ Normalize participants
//     const participants = [senderId, receiverId].sort();
//     const conversationKey = participants.join("_");

//     const lastMessage = previewMessage(type, payload);

//     // 3️ Try Redis cache
//     // let convoId = await getConversationId(participants[0], participants[1]);
//     let convo;

//     // 4️ Find or create conversation (ATOMIC & SAFE)
//     convo = await conversationService.findOrCreateConversation({
//       participants,
//       conversationKey,
//       lastMessage,
//     });

//     // 5️ Cache conversationId if missing
//     // if (!convoId) {
//     //   await setConversationId(
//     //     participants[0],
//     //     participants[1],
//     //     convo._id.toString()
//     //   );

//     //   req.io.to(receiverId).emit("conversation:new", convo);
//     // } else {
//     // }
    
//     req.io.to(receiverId).emit("conversation:update", convo);
//     // 6️ Create message
//     const message = await Message.create({
//       senderId,
//       receiverId,
//       type,
//       payload,
//       conversationId: convo._id,
//     });

//     // 7️ Emit message
//     req.io.to(receiverId).emit("message:new", {
//       conversationId: convo._id,
//       message,
//     });

//     return res.status(201).json({ message });
//   } catch (error) {
//     console.error("SendMessage Error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

const Message = require("@modules/message.model");
const conversationService = require("@services/conversation.service");
const previewMessage = require("@utils/previewMessage");
const { validationResult } = require("express-validator");

module.exports.sendMessage = async (req, res) => {
  try {
    // 1️ Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { senderId, receiverId, type, payload } = req.body;

    // 2️ Normalize participants
    const participants = [senderId, receiverId].sort();
    const conversationKey = participants.join("_");

    const lastMessage = previewMessage(type, payload);

    // 3️ Find or create conversation (ATOMIC & SAFE)
    const { conversation: convo, isNew } =
      await conversationService.findOrCreateConversation({
        participants,
        conversationKey,
        lastMessage,
      });

    // 4️ Emit correct event
    if (isNew) {
      req.io.to(receiverId).emit("conversation:new", convo);
    } else {
      req.io.to(receiverId).emit("conversation:update", convo);
    }

    // 5️ Create message
    const message = await Message.create({
      senderId,
      receiverId,
      type,
      payload,
      conversationId: convo._id,
    });

    // 6️⃣ Emit message
    req.io.to(receiverId).emit("message:new", {
      conversationId: convo._id,
      message,
    });

    return res.status(201).json({ message });
  } catch (error) {
    console.error("SendMessage Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getMessages = (req, res) => {
  try {
    const { senderId, receiverId, conversationId } = req.body();
    
  }
  catch {
    
  }
}