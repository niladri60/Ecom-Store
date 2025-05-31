import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ApiService from "../service/ApiService";
import Pagination from "../common/Pagination";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error?.response?.data?.message ||
        error.message ||
        "Unable to fetch products"
      );
    }
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (id) => navigate(`/admin/edit-product/${id}`);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
          error.message ||
          "Unable to delete product"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 p-6 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl p-8 border border-white/30">
          {error ? (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4 sm:mb-0">🛍️ Products</h2>
                <button
                  onClick={() => navigate("/admin/add-product")}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition duration-300 shadow-md hover:scale-105"
                >
                  <FaPlus /> Add Product
                </button>
              </div>

              {/* Product Cards */}
              {products.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No products available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h3>
                      <div className="flex justify-end gap-3 mt-auto">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductPage;
