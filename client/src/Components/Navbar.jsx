import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      {/* Brand Logo */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-wide">Eduva</h1>

      {/* Menu Links */}
      <ul className="flex space-x-8 text-gray-700 text-sm font-medium">
        {user?.role === "borrower" && (
          <>
            <li>
              <NavLink
                to="/borrower/BorrowerDashboard"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/borrower/profile"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition"
                }
              >
                Profile
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600 transition"
            }
          >
            Contact
          </NavLink>
        </li>

        {/* Auth Buttons */}
        {user ? (
          <li>
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              to="/"
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
