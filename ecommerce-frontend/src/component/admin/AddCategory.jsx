import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    if (name.length > 50) {
      setError("Category name must be 50 characters or less.");
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await ApiService.createCategory({ name });
      if (response.status === 200) {
        setMessage(response.message || "Category added successfully!");
        setTimeout(() => {
          navigate("/admin/categories");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Failed to save the category."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-200">
        <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-6">
          <MdCategory className="text-4xl text-blue-600" /> Add New Category
        </h2>

        {message && (
          <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 font-medium shadow-sm border border-green-300">
            ✅ {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 font-medium shadow-sm border border-red-300">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="categoryName" className="block font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            />
            <p className="text-sm text-gray-500 mt-1">{50 - name.length} characters remaining</p>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
            >
              <FiPlusCircle className="text-lg" />
              {isSubmitting ? "Saving..." : "Add Category"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="flex items-center gap-2 bg-gray-200 hover:bg-red-500 hover:text-white text-gray-800 px-5 py-2.5 rounded-lg font-semibold transition"
            >
              <FiXCircle className="text-lg" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
