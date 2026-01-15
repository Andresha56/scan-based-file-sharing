const userModel = require("@modules/user.model");
module.exports.createUser = async ({
  name,
  receiverId,
  avatarSeed,
  avatarStyle,
},{session}) => {
  if (!name || !receiverId || !avatarSeed || !avatarStyle) {
    throw new Error("All fields are required");
  }
 const user = new userModel({
    name,
    receiverId,
    avatarSeed,
    avatarStyle,
 });
   await user.save({ session });
  return user;
};
