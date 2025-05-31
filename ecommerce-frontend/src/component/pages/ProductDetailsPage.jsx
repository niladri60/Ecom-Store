import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../service/ApiService";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ApiService.getProductById(productId);
        setProduct(response.product);
      } catch (error) {
        console.log(error.message || error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
      }
    }
  };

  if (!product) {
    return <p>Loading product details ...</p>;
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-start gap-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/2 h-auto object-contain rounded-lg"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <span className="text-2xl font-semibold text-green-600">
          ₹{product.price.toFixed(2)}
        </span>

        <div className="mt-6">
          {cartItem ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementItem}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                -
              </button>
              <span className="text-lg font-semibold">{cartItem.quantity}</span>
              <button
                onClick={incrementItem}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={addToCart}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 cursor-pointer"
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
