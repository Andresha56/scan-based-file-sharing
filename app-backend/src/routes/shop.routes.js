const express = require("express");
const router = express.Router();
const shopController = require("@controllers/shop.controller");
const { authenticateShop } = require("@middlewares/auth.middlewares");

router.get("/details", authenticateShop, shopController.getShopDetails);
module.exports = router;
