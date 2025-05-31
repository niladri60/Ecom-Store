import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import ApiService from "../service/ApiService";

const EditCategory = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await ApiService.getCategoryById(categoryId);
        setName(response.category.name);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          error.message ||
          "Failed to get category by ID"
        );
        setIsError(true);
        setTimeout(() => setMessage(""), 3000);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.updateCategory(categoryId, { name });
      if (response.status === 200) {
        setMessage(response.message || "Category updated successfully!");
        setIsError(false);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/categories");
        }, 2000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Failed to update category"
      );
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-lg border border-blue-200 shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-blue-800 flex items-center gap-2 mb-6">
          <MdEdit className="text-4xl text-blue-600" />
          Edit Category
        </h2>

        {message && (
          <div className={`flex items-center gap-2 p-4 mb-6 rounded-lg text-sm font-medium shadow-sm border transition ${
            isError
              ? "bg-red-100 text-red-700 border-red-300"
              : "bg-green-100 text-green-700 border-green-300"
          }`}>
            {isError ? <FiAlertCircle className="text-lg" /> : <FiCheckCircle className="text-lg" />}
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-1">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
