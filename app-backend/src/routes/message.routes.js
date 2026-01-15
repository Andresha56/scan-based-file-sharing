const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const messageController = require("@controllers/message.controller");
router.post(
  "/send",
  [
    body("senderId")
      .notEmpty()
      .withMessage("sender id is required")
      .isMongoId()
      .withMessage("invalid sender id"),
    body("receiverId")
      .notEmpty()
      .withMessage("receiver id is required")
      .isMongoId()
      .withMessage("invalid receiver id"),
    body("type").notEmpty().withMessage("Type id is required"),
  ],

  messageController.sendMessage
)
  // .get(
  //   "list",
  //   [
  //     body("senderId")
  //       .notEmpty(),
  //     withMessage("")
  //   ]
// )
module.exports = router;
