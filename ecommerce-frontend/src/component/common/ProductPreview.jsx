import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../service/ApiService';
import ProductList from "../common/ProductList";

const ProductPreview = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const previewLimit = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ApiService.getAllProducts();
                const allProducts = response.productList || [];
                setProducts(allProducts.slice(0, previewLimit));
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to fetch products"
                );
            }
        };

        fetchProducts();
    }, []);

    return (
      <div className="product-preview px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Our Products
        </h2>
        <p className="text-gray-600 mb-6 text-center">Explore our products</p>

        {error ? (
          <p className="error-message text-red-500 text-center">{error}</p>
        ) : (
          <>
            <ProductList products={products} />
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/products")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                View All Products
              </button>
            </div>
          </>
        )}
      </div>
    );
};

export default ProductPreview;
