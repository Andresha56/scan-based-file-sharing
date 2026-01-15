const userModel = require("@modules/user.model");
const conversationModel = require("@modules/conversation.model");
const { validationResult } = require("express-validator");
const userService = require("@services/user.service");
const shopModel = require("@modules/shop.model");
const crypto = require("crypto");
const avatarModule = require("@constants/avatar");
const roomService = require("@services/room.service");
const mongoose = require("mongoose");


// module.exports.validateUser = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, shopId } = req.body;

//     // Check if shop exists
//     const shop = await shopModel.findById(shopId);
//     if (!shop) {
//       return res.status(404).json({ error: "Shop not found" });
//     }

//     // Check if user with this name exists
//     const existingUser = await userModel.findOne({ name });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User with this name already exists",
//       });
//     }

//     next(); // Validation passed → move to next handler
//   } catch (err) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };

module.exports.createUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, receiverId } = req.body;

    // 2. Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid shop id" });
    }

    // 3. Check shop exists
    const shop = await shopModel.findById(receiverId).session(session);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // 4. Check username uniqueness PER SHOP
    const existingUser = await userModel.findOne({
      name,
      receiverId,
    }).session(session);

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists for this shop",
      });
    }
    const avatarStyles = avatarModule.avatarStyles;
    if (!avatarStyles?.length) {
      return res.status(500).json({ message: "Avatar styles not configured" });
    }

    const avatarSeed = crypto.randomBytes(8).toString("hex");
    const avatarStyle =
      avatarStyles[crypto.randomInt(avatarStyles.length)];

    // 6. Create user
    const user = await userService.createUser(
      {
        name,
        receiverId,
        avatarSeed,
        avatarStyle,
      },
      { session }
    );

    // 7. Create room
    const room = await roomService.createRoom(
      {
        receiverId,
        userId: user._id,
      },
      { session }
    );

    // 8. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ user, room });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    // 9. Handle duplicate race condition (DB-level)
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Username already exists for this shop",
      });
    }

    console.error("Create user error:", err);
    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};


// module.exports.listUsers = async (req, res) => {
//   try {
//     const { shopId } = req.body;

//     if (!shopId) {
//       return res.status(400).json({
//         message: "ShopId is required",
//       });
//     }

//     // Find all users that belong to this shop
//     const users = await userModel.find({ shopId });
//     return res.status(200).json(users);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "Failed to fetch users",
//       error: err.message,
//     });
//   }
// };


module.exports.listUsers = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: "receiver id is required" });
    }

    // 1️ Get conversations
    const conversations = await conversationModel
      .find({ participants: receiverId })
      .sort({ lastMessageAt: -1 })
      .lean();

    // Extract other userIds
    const userIds = conversations.map(c =>
      c.participants.find(id => id.toString() !== receiverId)
    );

    // Fetch user details
    const users = await userModel.find(
      { _id: { $in: userIds } },
      { name: 1, avatarSeed: 1, avatarStyle: 1, receiverId:1,}
    );

    // 4️ Merge conversation + user
    const result = conversations.map(convo => {
      const otherUserId = convo.participants.find(
        id => id.toString() !== receiverId
      );

      const user = users.find(
        u => u._id.toString() === otherUserId.toString()
      );

      return {
        conversationId: convo._id,
        lastMessage: convo.lastMessage,
        lastMessageAt: convo.lastMessageAt,
        user,
      };
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server Error",
      error: err.message,
    });
  }
};


