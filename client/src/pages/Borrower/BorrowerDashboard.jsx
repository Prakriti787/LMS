// src/pages/Borrower/BorrowerDashboard.jsx
import React, { useState } from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

export default function BorrowerDashboard() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Static books
  
    const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", ISBN: "12345", availableCopies: 5, coverImage: "/images/book1.jpg" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", ISBN: "23456", availableCopies: 3, coverImage: "/images/book2.jpg" },
  { id: 3, title: "1984", author: "George Orwell", ISBN: "34567", availableCopies: 4, coverImage: "/images/book3.jpg" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", ISBN: "45678", availableCopies: 2, coverImage: "/images/book4.jpg" },
  { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", ISBN: "56789", availableCopies: 6, coverImage: "/images/book5.jpg" },
  { id: 6, title: "It ends with us ", author: "Collen Hoover", ISBN: "67890", availableCopies: 1, coverImage: "/images/book6.jpg" },
  { id: 7, title: "War and Peace", author: "Leo Tolstoy", ISBN: "78901", availableCopies: 5, coverImage: "/images/book7.jpg" },
  { id: 8, title: "The Catcher in the Rye", author: "J.D. Salinger", ISBN: "89012", availableCopies: 3, coverImage: "/images/book8.jpg" },
  { id: 9, title: "Harry potter and the order of Phoenix", author: "J.K Rowling", ISBN: "90123", availableCopies: 7, coverImage: "/images/book9.jpg" },
  { id: 10, title: "The Hobbit", author: "J.R.R. Tolkien", ISBN: "11223", availableCopies: 8, coverImage: "/images/book10.jpg" },
  { id: 11, title: "Ikigai", author: "Hector Garcie and Francesc Miralles", ISBN: "22334", availableCopies: 2, coverImage: "/images/book11.jpg" },
  { id: 12, title: "The Odyssey", author: "Homer", ISBN: "33445", availableCopies: 4, coverImage: "/images/book12.jpg" },
];

 

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const limitedBooks = filteredBooks.slice(0, 12);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* NavBar */}
      <Navbar />
 

      {/* Search */}
      <div className="container mx-auto px-6 mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      {/* Books */}
    <main className="flex-1 container mx-auto px-6 py-10">
  <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
    Available Books
  </h2>

  {limitedBooks.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {limitedBooks.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full aspect-square object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-sm text-gray-900">{book.title}</h3>
            <p className="text-gray-600 text-xs">by {book.author}</p>
            <p className="text-xs text-gray-500 mt-1">ISBN: {book.ISBN}</p>
            <p className="mt-1 text-xs">
              Copies:{" "}
              <span
                className={
                  book.availableCopies > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {book.availableCopies}
              </span>
            </p>
            <div className="mt-3 flex justify-between">
              <button
                onClick={() => setSelectedBook(book)}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition text-xs"
              >
                View
              </button>
              <button
                disabled={book.availableCopies === 0}
                className={`px-3 py-1 rounded-md text-xs ${
                  book.availableCopies > 0
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Borrow
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-center">No books found.</p>
  )}
</main>


      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img
              src={selectedBook.coverImage}
              alt={selectedBook.title}
              className="h-40 w-full object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-3">{selectedBook.title}</h2>
            <p className="text-gray-600 text-sm">by {selectedBook.author}</p>
            <p className="text-xs text-gray-500 mt-1">ISBN: {selectedBook.ISBN}</p>
            <p className="mt-2 text-sm text-gray-700">
              Copies Available: {selectedBook.availableCopies}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
