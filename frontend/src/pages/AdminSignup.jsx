import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function AdminSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://apc-jr1x.onrender.com/api/auth/signup", {
        username,
        password,
      });

      setSuccess(res.data.message || "Signup successful! Please login.");
      setError("");
      setUsername("");
      setPassword("");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      
      {/* Signup Box with Transparent Background Logo */}
      <div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col items-center bg-white/90 backdrop-blur-md overflow-hidden">
        
        {/* Transparent Logo in Background */}
        <img
          src="/logo-apc-college.png"
          alt="College Logo"
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] object-contain opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        {/* College Name and Quote */}
        <div className="relative z-10 text-center mb-6">
          {/* Solid Color College Name */}
          <h1 className="text-2xl font-extrabold mb-2 text-purple-600">
            APC Mahalaxmi College for Women
          </h1>
          {/* Quote */}
          <p className="text-sm italic text-gray-600">
            "Empowering Women Through Knowledge and Innovation"
          </p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 relative z-10"
          autoComplete="off"
        >
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              autoComplete="off"
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700"
            />
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-lg hover:scale-105 transform transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account link */}
        <p className="text-sm text-center text-gray-600 mt-4 relative z-10">
          Already have an account?{" "}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminSignup;
