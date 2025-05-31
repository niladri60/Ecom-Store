import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import { FaImage, FaTags, FaRegMoneyBillAlt, FaBoxOpen } from "react-icons/fa";

const EditProductPage = () => {

    const { productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      ApiService.getAllCategory().then((res) =>
        setCategories(res.categoryList)
      );

      if (productId) {
        ApiService.getProductById(productId).then((response) => {
          setName(response.product.name);
          setDescription(response.product.description);
          setPrice(response.product.price);
          setCategoryId(response.product.categoryId);
          setImageUrl(response.product.imageUrl);
        });
      }
    }, [productId]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          productId,
          categoryId,
          name,
          description,
          price,
          imageUrl, // now sending image URL directly
        };

        const response = await ApiService.updateProduct(payload);
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
            "Unable to update product"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="mt-13 mb-20 w-full max-w-2xl bg-white border border-gray-200 shadow-2xl rounded-2xl p-10 space-y-8"
      >
        <h2 className="text-4xl font-bold text-slate-800 text-center flex items-center justify-center gap-2">
          <FaBoxOpen className="text-blue-600" /> Edit Product
        </h2>

        {message && (
          <div
            className={`p-3 rounded-md text-sm font-medium transition text-center ${
              message.toLowerCase().includes("unable")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Image URL Input */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <FaImage className="text-blue-500" />
            Product Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
          {imageUrl && (
            <div className="mt-4 flex justify-center">
              <img
                src={imageUrl}
                alt={name}
                className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-lg"
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <FaTags className="text-blue-500" />
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <FaBoxOpen className="text-blue-500" />
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <FaRegMoneyBillAlt className="text-blue-500" />
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            💾 Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage