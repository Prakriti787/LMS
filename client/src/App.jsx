import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import BorrowerDashboard from "./pages/Borrower/BorrowerDashboard";
import BookDetails from "./pages/Borrower/BookDetails";
import Profile from "./pages/Borrower/Profile";
import LibrarianDashboard from "./pages/Librarian/LibrarianDashboard";
import BookForm from "./pages/Librarian/BookForm";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BorrowerProfile from "./pages/Borrower/Profile";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  const storedUser = localStorage.getItem("user");


  if (!user && !storedUser) {
    return <Navigate to="/" />;
  }

 
  const finalUser = user || JSON.parse(storedUser);

  
  if (role && finalUser.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Borrower */}
          <Route
            path="/borrower"
            element={
              <PrivateRoute role="borrower">
                <BorrowerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/borrower/books/:id"
            element={
              <PrivateRoute role="borrower">
                <BookDetails />
              </PrivateRoute>
            }
          />
             <Route
          path="/borrower/profile"
          element={
            <PrivateRoute role="borrower">
              <BorrowerProfile />
            </PrivateRoute>
          }
        />

          {/* Librarian */}
          <Route
            path="/librarian"
            element={
              <PrivateRoute role="librarian">
                <LibrarianDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/librarian/books/new"
            element={
              <PrivateRoute role="librarian">
                <BookForm />
              </PrivateRoute>
            }
          />
          

          {/* Catch-all → redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
         <Toaster position="top-right" reverseOrder={false} />
    
      </Router>
    </AuthProvider>
  );
}
