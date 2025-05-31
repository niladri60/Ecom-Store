import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (error) {
      console.log("Error fetching category list", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.log("Error deleting category by id", error);
      }
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Manage Categories</h2>
          <button
            onClick={() => navigate("/admin/add-category")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition duration-300 shadow-md hover:scale-105"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-sm">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category List */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            <p>No matching categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.015] flex flex-col justify-between"
              >
                <span className="text-xl font-semibold text-gray-700 mb-4">{category.name}</span>
                <div className="flex justify-end gap-3 mt-auto">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategoryPage;
