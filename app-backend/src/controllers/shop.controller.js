module.exports.getShopDetails = async (req, res) => {
  res.status(200).json(req.shop);
};
