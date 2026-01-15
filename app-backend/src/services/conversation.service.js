const Conversation = require("@modules/conversation.model");

module.exports.findOrCreateConversation = async ({
  participants,
  conversationKey,
  lastMessage,
}) => {
  const result = await Conversation.findOneAndUpdate(
    { conversationKey },
    {
      $setOnInsert: {
        participants,
        conversationKey,
      },
      $set: {
        lastMessage,
        lastMessageAt: new Date(),
      },
    },
    {
      new: true,
      upsert: true,
      includeResultMetadata: true, // tells was it created? or was it updated? using lastErrorObject 
    }
  );

  return {
    conversation: result.value,
    isNew: !result.lastErrorObject.updatedExisting,
  };
};
