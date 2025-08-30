import React, { useEffect, useState } from "react";

export default function BorrowRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token"); // librarian token
        const res = await fetch("http://localhost:8000/api/borrow", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRecords(data);
      } catch (err) {
        console.error("Error fetching borrow records:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Borrow Records</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500">No borrow requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Book</th>
                <th className="p-3 border">Borrower</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Requested At</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    {rec.book?.title} <span className="text-sm text-gray-500">({rec.book?.author})</span>
                  </td>
                  <td className="p-3 border">
                    {rec.borrower?.name} <br />
                    <span className="text-sm text-gray-500">{rec.borrower?.email}</span>
                  </td>
                  <td className="p-3 border capitalize">
                    {rec.status}
                  </td>
                  <td className="p-3 border">
                    {new Date(rec.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
