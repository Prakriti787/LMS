import express from "express";
import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

// ---------------- Borrow book ----------------
router.post("/borrow/:bookId", authorize(["borrower"]), async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });
    if (book.availableCopies <= 0) {
      return res.status(400).json({ msg: "Book not available" });
    }

    // create borrow request
    const borrow = await Borrow.create({
      userId: req.user.id,
      bookId: book._id,
    });

    // optional: don’t reduce copies until librarian approves
    // book.availableCopies -= 1;
    // await book.save();

    res.status(201).json({ msg: "Borrow request sent!", borrow });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ---------------- Return book ----------------
router.post("/return/:bookId", authorize(["borrower"]), async (req, res) => {
  try {
    const borrow = await Borrow.findOne({
      userId: req.user.id,
      bookId: req.params.bookId,
      returnDate: null,
    });

    if (!borrow) return res.status(400).json({ msg: "No borrow record found" });

    borrow.returnDate = new Date();
    await borrow.save();

    const book = await Book.findById(req.params.bookId);
    book.availableCopies += 1;
    await book.save();

    res.json({ msg: "Book returned", borrow });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ---------------- Librarian view borrow records ----------------
router.get("/", authorize(["librarian"]), async (req, res) => {
  try {
    const records = await Borrow.find()
      .populate("userId", "name email")
      .populate("bookId", "title author isbn");
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
