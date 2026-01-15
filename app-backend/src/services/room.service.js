const RoomModel = require("@modules/Room.model");

module.exports.createRoom = async (
  { receiverId, userId },
  { session }
) => {
  if (!receiverId || !userId) {
    throw new Error("All fields are required");
  }

  const room = new RoomModel({
    userId,
    receiverId,
  });

  await room.save({ session });
  return room;
};
