import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaImage, FaTag, FaList, FaDollarSign } from "react-icons/fa";
import ApiService from "../service/ApiService";

const AddProductPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("categoryId", selectedCategory);
      formData.append("imageUrl", imageUrl);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);

      const response = await ApiService.addProduct(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/products");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Unable to upload product"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="mt-10 mb-20 bg-white border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 justify-center">
          <FaPlus className="text-green-600" />
          Add Product
        </h2>

        {message && (
          <div
            className={`text-center p-3 rounded-md text-sm font-medium transition ${
              message.toLowerCase().includes("unable")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Image URL Field */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaImage className="text-blue-500" /> Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {imageUrl && (
            <div className="mt-3 flex justify-center">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover border border-gray-300 rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* Category Selector */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaList className="text-blue-500" /> Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaTag className="text-blue-500" /> Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaDollarSign className="text-blue-500" /> Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2"
        >
          <FaPlus /> Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
