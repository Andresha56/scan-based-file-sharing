const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("@controllers/user.controller");
router
  .post(
    "/register",
    [
      body("name")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long"),

      body("receiverId")
        .notEmpty()
        .withMessage("receiverId ID is required")
        .isMongoId()
        .withMessage("Invalid receiverId ID"),
    ],
    userController.createUser
  )
  .post(
    "/lists",
    [body("receiverId").notEmpty().withMessage("receiver id is required")],
    userController.listUsers
  );
module.exports = router;
