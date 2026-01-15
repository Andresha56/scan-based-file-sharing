require("module-alias/register");
const express = require("express");
const cors = require("cors");
const connectToDB = require("./src/db/db");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const shopRoutes = require("@routes/shop.routes");
const userRoutes = require("@routes/user.routes");
const authRoutes = require("@routes/auth/auth.routes");
const messageRoutes = require("@routes/message.routes.js");
require("dotenv").config();
connectToDB();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [],
        methods: ["GET", "POST"],
        credentials: true,
        pingTimeout: 20000,
        pingInterval: 25000,
    },
});

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        const user = jwt.verify(token, process.env.JWT_SECRET);

        socket.user = {
            id: user.id,
            name: user.name,
        };

        next();
    } catch {
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    console.log("Connected:", socket.user.id);

    // Join personal room
    socket.join(socket.user.id);

    /* -------- JOIN CHAT ROOM -------- */
    socket.on("room:join", ({ roomId }) => {
        socket.join(roomId);
    });

    /* -------- SEND MESSAGE -------- */
    socket.on("message:send", async (payload, ack) => {
        try {
            const message = {
                id: crypto.randomUUID(),
                roomId: payload.roomId,
                senderId: socket.user.id,
                text: payload.text,
                createdAt: new Date(),
            };

            // emit to room
            io.to(payload.roomId).emit("message:receive", message);

            // ACK to sender
            ack({ success: true, message });
        } catch (err) {
            ack({ success: false });
        }
    });

    socket.on("disconnect", () => {
        console.log("Disconnected:", socket.user.id);
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://192.168.0.101:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/shop", shopRoutes);
app.use("/user", userRoutes);
app.use("/messages", messageRoutes);
app;

server.listen(process.env.PORT || 4000, "0.0.0.0", () => {
    console.log(`port is running at ${process.env.PORT || 4000}`);
});
