import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookForm from "./BookForm";

export default function LibrarianDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ======= State =======
  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [activePage, setActivePage] = useState("books");
  

  // ======= Fetch Books =======
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
    }
  };

  // ======= Fetch Borrow Records =======
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/borrow", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error("❌ Error fetching records:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchRecords();
  }, []);

  // ======= Add New Book =======
  const handleAdd = async (bookData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/api/books", bookData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks((prev) => [...prev, res.data]); // Add new book to UI
      setShowForm(false);
      alert("✅ Book added successfully!");
    } catch (err) {
      console.error("❌ Error adding book:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add book.");
    }
  };

  // ======= Update Record Status =======
  const handleStatusUpdate = async (recordId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8000/api/borrow/${recordId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRecords((prev) =>
        prev.map((rec) =>
          rec._id === recordId ? { ...rec, status: res.data.status } : rec
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ======= Delete Book =======
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooks((prev) => prev.filter((book) => book._id !== id));
      alert("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to delete book.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-700"> LMS Admin</div>
        <nav className="flex flex-col space-y-2 p-4 text-gray-700">
          <button
            onClick={() => setActivePage("books")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
              activePage === "books" ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setActivePage("records")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
              activePage === "records" ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            Borrow Records
          </button>
          {/* <button
            onClick={() => setActivePage("about")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
              activePage === "about" ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActivePage("contact")}
            className={`text-left px-4 py-2 rounded-lg hover:bg-blue-100 ${
              activePage === "contact" ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            Contact
          </button> */}
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
             Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Librarian Dashboard</h1>
          {activePage === "books" && user?.role === "librarian" && (
            <button
              onClick={() => {
                setEditingBook(null);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ➕ Add Book
            </button>
          )}
        </header>

        <main className="p-6 overflow-auto">
          {/* ===== Books ===== */}
          {activePage === "books" && (
            <>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Books List</h2>
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">ISBN</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Available</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3">{book.title}</td>
                      <td className="p-3">{book.author}</td>
                      <td className="p-3">{book.ISBN}</td>
                      <td className="p-3">{book.totalQuantity}</td>
                      <td className="p-3">{book.availableCopies}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => {
                            setEditingBook(book);
                            setShowForm(true);
                          }}
                          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        {user?.role === "librarian" && (
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                             Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* ===== Borrow Records ===== */}
          {activePage === "records" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Borrow Records</h2>
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-3 text-left">Borrower</th>
                    <th className="p-3 text-left">Book</th>
                    <th className="p-3 text-left">Borrow Date</th>
                    <th className="p-3 text-left">Return Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((record) => (
                      <tr key={record._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-3">{record.borrower?.name}</td>
                        <td className="p-3">{record.book?.title}</td>
                        <td className="p-3">
                          {new Date(record.borrowDate).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          {record.returnDate
                            ? new Date(record.returnDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-white text-sm ${
                              record.status === "Pending"
                                ? "bg-yellow-500"
                                : record.status === "Approved"
                                ? "bg-green-600"
                                : "bg-red-500"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="p-3 space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(record._id, "Approved")}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(record._id, "Rejected")}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            ❌ Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        No borrow records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ===== About ===== */}
          {/* {activePage === "about" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">About</h2>
              <p className="text-gray-600">
                This Library Management System helps manage books, users, and borrow
                records efficiently.
              </p>
            </div>
          )} */}

          {/* ===== Contact ===== */}
          {/* {activePage === "contact" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Contact</h2>
              <p className="text-gray-600">Email: support@library.com</p>
              <p className="text-gray-600"> Phone: +977-9812345678</p>
            </div>
          )} */}
        </main>
      </div>

      {/* Add/Edit Book Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <BookForm
            book={editingBook}
            onClose={() => setShowForm(false)}
            onSuccess={editingBook ? fetchBooks : handleAdd} // ✅ Calls handleAdd for new books
          />
        </div>
      )}
    </div>
  );
}
