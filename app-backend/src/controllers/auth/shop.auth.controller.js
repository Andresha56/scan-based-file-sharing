const blacklistTokenModel = require("@modules/backlistToken.model");
const shopModel = require("@modules/shop.model");
const shopService = require("@services/shop.service");
const { validationResult } = require("express-validator");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");

//register controller
module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ error: errors.array() });
    }

    const { shopName, password } = req.body;

    const hashedPassword = await shopModel.hashPassword(password);

    const shop = await shopService.createShop({
        shopName,
        password: hashedPassword,
    });

    const shopId = shop._id.toString();
    const refreshToken = shop.generateRefreshToken();

    const qrData = `http://192.168.0.100:5173/user/register/shop/${shopId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    shop.qrCode = qrCode;
    shop.refreshToken = refreshToken;
    await shop.save();

    const accessToken = shop.generateAuthToken();
    const shopObj = shop.toObject();
    delete shopObj.refreshToken;
    delete shopObj.password;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // in production https only
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
        .status(201)
        .json({
            accessToken,
            shop: shopObj,
        });
};
//varify controller
module.exports.verifyShop = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const shop = await shopModel.findById(decoded._id);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }

        return res
            .status(200)
            .json({ message: "Shop verified", shopId: shop._id });
    } catch (err) {
        console.log("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
//new refresh token controller
module.exports.refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new Error("Unauthorized");
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
        console.log("Decoded refresh token:", decoded);

        const shop = await shopModel
            .findById(decoded._id)
            .select("+refreshToken");
        if (!shop || shop.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Generate new tokens
        const newAccessToken = shop.generateAuthToken();
        const newRefreshToken = shop.generateRefreshToken();

        // Save new refresh token in DB
        shop.refreshToken = newRefreshToken;
        await shop.save();

        // Set new refresh cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        throw new Error(err);
    }
};

//login controller
module.exports.logIn = async (req, res) => {
    const errors = validationResult(req);
    const { shopName, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(401).json({ error: errors.array() });
    }

    const shop = await shopModel.findOne({ shopName }).select("+password");
    if (!shop) {
        return res.status(404).json({ error: "Shop not found" });
    }

    const isMatch = await shop.comparePassword(password, shop.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid Shop name or password" });
    }

    const token = shop.generateAuthToken();
    res.status(200).json({ token, shop });
};

//logout controller
module.exports.logOut = async (req, res) => {
    try {
        // Read token BEFORE clearing cookie
        let token = req.cookies.token;

        // If no cookie, check Authorization header safely
        if (!token && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts.length === 2) {
                token = parts[1];
            }
        }

        // If still no token, respond with error
        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }

        // Blacklist token
        await blacklistTokenModel.create({ token });

        // Clear cookie AFTER using it
        res.clearCookie("token");

        res.status(200).json({ message: "Logged Out" });
    } catch (err) {
        res.status(500).json({ message: "Logout failed", error: err.message });
    }
};
