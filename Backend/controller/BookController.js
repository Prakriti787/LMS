import Book from '../models/Book.js';

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book removed" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Example addBook function
export const addBook = async (req, res) => {
  try {
    console.log("📥 Incoming book data:", req.body);  // <--- add this

    const { title, author, isbn, totalQuantity, availableCopies } = req.body;

    if (!title || !author || !isbn || !totalQuantity) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      totalQuantity,
      availableCopies: availableCopies ?? totalQuantity,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("❌ Error adding book:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "ISBN already exists" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to save book" });
  }
};


export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
};