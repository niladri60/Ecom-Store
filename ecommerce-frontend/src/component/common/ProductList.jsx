import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products = [] }) => {
  const { cart, dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl border border-gray-200"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-t-2xl"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="text-indigo-600 font-bold text-lg">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>
              </Link>

              <div className="px-5 pb-5">
                {cartItem ? (
                  <div className="flex items-center justify-between bg-gray-100 rounded-full py-2 px-4 mt-3">
                    <button
                      onClick={() => decrementItem(product)}
                      className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
                    >
                      −
                    </button>
                    <span className="font-medium text-gray-700">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => incrementItem(product)}
                      className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-full font-semibold transition duration-200"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
