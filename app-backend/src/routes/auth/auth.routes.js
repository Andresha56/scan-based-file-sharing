const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const shopController = require("@controllers/auth/shop.auth.controller");
const userController = require("@controllers/auth/user.auth.controller");

//shop routes
router
    .post(
        "/register/",
        [
            body("shopName")
                .isLength({ min: 3 })
                .withMessage("Shop name must be three characters long"),
            body("password")
                .isLength({ min: 3 })
                .withMessage("Password must be three character long"),
        ],
        shopController.register
    )
    .get("/verify", shopController.verifyShop)
    .post(
        "/logIn",
        [
            body("shopName")
                .isLength({ min: 3 })
                .withMessage("Shop name must be three characters long"),
            body("password")
                .isLength({ min: 3 })
                .withMessage("Password must be three character long"),
        ],
        shopController.logIn
    )
    .get("/logout", shopController.logOut)
    .post("/refresh", shopController.refreshAccessToken);
module.exports = router;
