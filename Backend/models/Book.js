import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true }, // changed from ISBN to isbn
  totalQuantity: { type: Number, required: true },
  availableCopies: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
