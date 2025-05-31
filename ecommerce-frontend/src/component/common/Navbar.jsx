import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import ApiService from "../service/ApiService";
import { FaShieldAlt } from "react-icons/fa";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      ApiService.logout();
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Ecom-Store
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-base font-medium">
        <NavLink
          to="/"
          className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Home
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <a
          href="/products"
          className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Our Products
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <NavLink
          to="/about"
          className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          About
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
        <NavLink
          to="/contact"
          className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          Contact
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </div>

      {/* Search + Auth + Cart */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full md:w-[400px]"
        >
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-200"
          >
            Search
          </button>
        </form>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isAdmin && (
          <NavLink
            to="/admin"
            className="flex items-center gap-2 text-white bg-red-600 px-4 py-2 rounded-md font-semibold shadow-sm hover:bg-red-700 transition-all duration-300"
          >
            <FaShieldAlt className="text-white" />
            Admin
          </NavLink>
        )}
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-gray-100 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                  Create Account
                </button>
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/profile">
                <button className="px-4 py-2 bg-gray-100 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer">
                  My Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
          <Link to="/cart">
            <button className="text-blue-600 hover:text-blue-800 transition-transform duration-200 hover:scale-110 cursor-pointer">
              <FaCartShopping className="text-3xl" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
