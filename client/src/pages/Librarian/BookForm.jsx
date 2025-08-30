import { useState, useEffect } from "react";
import axios from "axios";

export default function BookForm({ book, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    totalQuantity: "",
    availableCopies: ""
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        totalQuantity: book.totalQuantity,
        availableCopies: book.availableCopies
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Fetch token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized! Please login first.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in headers
        },
      };

      if (book) {
        // ✅ Update book
        await axios.put(
          `http://localhost:8000/api/books/${book._id}`,
          formData,
          config
        );
        alert("Book updated successfully ✅");
      } else {
        // ✅ Add new book
        await axios.post("http://localhost:8000/api/books", formData, config);
        alert("Book added successfully ✅");
      }
      await

      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Error saving book:", err.response?.data || err.message);
      alert("Book added successfully ✅");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg w-[400px]">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {book ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="totalQuantity"
          placeholder="Total Quantity"
          value={formData.totalQuantity}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="availableCopies"
          placeholder="Available Copies"
          value={formData.availableCopies}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {book ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
