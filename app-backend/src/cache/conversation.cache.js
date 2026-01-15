const redisClient = require("@services/redis.service");
module.exports = {
  getConversationId: async (senderId, receiverId) => {
    return await redisClient.get(`conversation:${senderId}:${receiverId}`);
  },
  setConversationId: async (senderId, receiverId, conversationId) => {
    return await redisClient.set(
      `conversation:${senderId}:${receiverId}`,
      conversationId
    );
  },
};
