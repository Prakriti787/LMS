import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

import connectDB from "./Config/db.js";

import User from "./models/User.js";
import Book from "./models/Book.js";
import Borrow from "./models/Borrow.js";

import authRoutes from "./routes/auth.js";
import booksRouter from "./routes/books.js";
import borrowRouter from "./routes/borrow.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

// Connect Database
connectDB();

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.send("Library Management System API running...");
});

// ---------------- AUTH ROUTES ----------------
app.use("/api/auth", authRoutes); 
// POST /api/auth/register
// POST /api/auth/login

// ---------------- USER ROUTES ----------------
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ---------------- BOOK ROUTES ----------------

app.use("/api/books", booksRouter);

// ---------------- BORROW ROUTES ----------------
app.use("/api/borrow", borrowRouter);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
