import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess(response.data.message); // "User registered successfully"
      setTimeout(() => {
        navigate("/signin"); // redirect to signin page
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm sm:text-base text-gray-600 mt-5">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
