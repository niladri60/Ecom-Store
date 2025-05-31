import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch categories"
      );
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const handleDiscoverMore = () => {
    navigate("/categories");
  };

  const displayedCategories = categories.slice(0, 7);

  return (
    <div className="category-list p-6">
      {error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : (
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {displayedCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 w-full text-left cursor-pointer"
                >
                  {category.name}
                </button>
              </div>
            ))}

            {categories.length > 7 && (
              <div className="p-6 flex items-center justify-center">
                <button
                  onClick={handleDiscoverMore}
                  className="text-blue-600 font-semibold hover:underline text-lg cursor-pointer"
                >
                  Discover More →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
