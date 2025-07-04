import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.loginUser(formData);
      if (response.status === 200) {
        setMessage("✅ User successfully logged in");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response?.data.message || error.message || "❌ Unable to login");
    }
  };

  return (
    <div className="mt-1 flex items-center justify-center min-h-screen bg-white px-4 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-lg [box-shadow:rgba(0,_0,_0,_0.25)_0px_14px_28px,_rgba(0,_0,_0,_0.22)_0px_10px_10px]">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-indigo-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
