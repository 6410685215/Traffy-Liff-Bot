import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/post";
import getRoutes from "./routes/get";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const origin = process.env.ORIGIN || "http://localhost:3002";

// Middleware
app.use(express.json());

const corsOptions = {
    origin: origin,
    methods: ["GET", "POST"]
};
app.use(cors(corsOptions));

// Basic route
app.get("/backend/", (req, res) => {
  res.send("Hello from the TypeScript backend!");
});

// Health check route
app.get("/backend/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running!" });
});

app.get("/backend/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  res.sendFile(`uploads/${filename}`, { root: "." });
});

// post
app.use("/backend/post", postRoutes);
app.use("/backend/get", getRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});