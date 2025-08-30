import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <img src={book.image || "https://via.placeholder.com/300"} alt={book.title} className="w-64 h-80 object-cover rounded mb-4"/>
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">ISBN: {book.isbn}</p>
      <button
        disabled={book.quantity === 0}
        className={`mt-4 px-4 py-2 rounded text-white ${
          book.quantity > 0 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {book.quantity > 0 ? "Borrow" : "Not Available"}
      </button>
    </div>
  );
}
