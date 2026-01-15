const shopModel = require("@modules/shop.model");
module.exports.createShop = async ({ shopName, password }) => {
  if (!shopName || !password) {
    throw new Error("All fields are required");
  }
  const shop = shopModel.create({
    shopName,
    password,
  });
  return shop;
};
