// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  if (!isLoggedIn) return null; // Hide navbar if not logged in

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-blue-600 to-pink-500 p-3 shadow-md">
      <div className="max-w-full mx-auto flex justify-between items-center text-white overflow-x-auto">
        
        {/* Left corner brand title */}
        <div className="text-sm font-semibold whitespace-nowrap">
          🎓 Smart Online Attendance
        </div>

        {/* Right-side links */}
        <ul className="flex flex-nowrap gap-6 font-medium text-base">
          <li>
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/attendance" className="hover:text-yellow-300 transition">Mark Attendance</Link>
          </li>
          <li>
            <Link to="/students" className="hover:text-yellow-300 transition">Manage Students</Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-yellow-300 transition">History</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-300 transition"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
