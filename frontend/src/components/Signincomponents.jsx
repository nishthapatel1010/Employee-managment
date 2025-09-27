import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SigninForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token & user info in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-lg xl:max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-700 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-600 mt-5">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SigninForm;
