const jwt = require("jsonwebtoken");
const shopModel = require("@modules/shop.model");

module.exports.authenticateShop = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const blacklisted = await shopModel.findOne({ token: token });
    if (blacklisted) {
      return res.status(401).json({ message: "Unothorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const shop = await shopModel.findById(decoded._id);

    if (!shop) {
      return res.status(401).json({ message: "Shop not found" });
    }

    req.shop = shop;
    next();
  } catch (err) {
    console.log("hi");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
