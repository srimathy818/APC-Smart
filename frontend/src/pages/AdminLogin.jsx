import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://appsail-50034992284.development.catalystappsail.in/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "adminUser",
          JSON.stringify({ username: data.admin.username })
        );
        navigate("/dashboard");
      } else {
        setError(data.message || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col items-center bg-white/90 backdrop-blur-md overflow-hidden">
        
        {/* Transparent Logo in Background */}
        <img
          src="/logo-apc-college.png"
          alt="College Logo"
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] object-contain opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        {/* College Name and Quote */}
        <div className="relative z-10 text-center mb-6">
          <h1 className="text-2xl font-extrabold mb-2 text-purple-600">
            APC Mahalaxmi College for Women
          </h1>
          <p className="text-sm italic text-gray-600">
            "Empowering Women Through Knowledge and Innovation"
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 w-full relative z-10">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700"
            autoComplete="off"
            required
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 pr-10"
              autoComplete="new-password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-lg hover:scale-105 transform transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-600 mt-4 relative z-10">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
