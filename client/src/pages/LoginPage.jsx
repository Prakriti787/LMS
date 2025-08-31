import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://lms-5-ellk.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (res.data?.user && res.data?.token) {
        // Save user + token to context
        login(res.data.user, res.data.token);

        // ✅ success toast
        toast.success("Login successful! 🎉");

        // Redirect user according to role
        if (res.data.user.role === "borrower") {
          navigate("/borrower");
        } else if (res.data.user.role === "librarian") {
          navigate("/librarian");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);

      // ❌ error toast
      toast.error(msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-violet-100 to-pink-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome to <br /> Eduva
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Use the credentials given by Admin in Postman For borrower john4@example.com password: 123456 for librarian lk@gmail.com password: 12345
        </p>
      </div>
    </div>
  );
}
