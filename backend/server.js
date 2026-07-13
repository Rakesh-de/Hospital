import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

import chatRoutes from "./routes/chatRoutes.js";

import reportRoutes from "./routes/reportRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {

    res.json({

        success: true,
        message: "MediMind AI Backend Running Successfully"

    });

});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});