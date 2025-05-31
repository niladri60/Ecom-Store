import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  const incrementItem = (product) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: 'DECREMENT_ITEM', payload: product });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: product });
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = cart.length > 0 ? cart.length * 15 : 0;

  const discountedTotal = discountApplied ? totalPrice * 0.5 : totalPrice;
  const grandTotal = discountedTotal + deliveryCharge;

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      setMessage("You need to login first before you can place an order");
      setTimeout(() => {
        setMessage('');
        navigate("/login");
      }, 3000);
      return;
    }

    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    const orderRequest = {
      totalPrice: grandTotal,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      setMessage(response.message);
      setTimeout(() => setMessage(''), 5000);
      if (response.status === 200) {
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "NILCODE") {
      setDiscountApplied(true);
      setMessage("Coupon applied! 50% discount granted.");
    } else {
      setDiscountApplied(false);
      setMessage("Invalid coupon code.");
    }
    setShowCouponInput(false);
    setCouponCode('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <section className="py-12 relative">
      <div className="w-full max-w-5xl px-3 md:px-4 mx-auto">
        <h2 className="font-manrope font-bold text-2xl leading-8 mb-4 text-center text-black">
          Shopping Cart
        </h2>

        {message && (
          <p className="text-center text-red-600 mb-4 text-sm">{message}</p>
        )}

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-sm">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Cart Table Header */}
            <div className="hidden lg:grid grid-cols-2 py-4">
              <div className="font-normal text-base text-gray-500">Product</div>
              <p className="font-normal text-base text-gray-500 flex items-center justify-between">
                <span className="w-full max-w-[160px] text-center">Delivery</span>
                <span className="w-full max-w-[180px] text-center">Quantity</span>
                <span className="w-full max-w-[160px] text-center">Total</span>
              </p>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-gray-200 py-4"
              >
                <div className="flex items-center flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto">
                  <div className="img-box">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-[100px] rounded-lg object-cover"
                    />
                  </div>
                  <div className="pro-data w-full max-w-sm">
                    <h5 className="font-semibold text-base text-black text-center sm:text-left">
                      {item.name}
                    </h5>
                    <p className="text-sm text-gray-500 my-1 text-center sm:text-left">
                      {item.description}
                    </p>
                    <h6 className="text-sm font-medium text-indigo-600 text-center sm:text-left">
                      ₹{item.price.toFixed(2)}
                    </h6>
                  </div>
                </div>
                <div className="flex items-center flex-col sm:flex-row w-full max-w-xl mx-auto gap-2">
                  <h6 className="font-bold text-lg text-black w-full max-w-[140px] text-center">
                    ₹15.00
                    <span className="text-xs text-gray-400 ml-2 lg:hidden">
                      (Delivery)
                    </span>
                  </h6>
                  <div className="flex items-center justify-center w-full">
                    <button
                      onClick={() => decrementItem(item)}
                      className="px-4 py-2 border border-gray-200 rounded-l-full text-base"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={item.quantity}
                      className="border-y border-gray-200 text-base text-center w-16 py-2 bg-transparent"
                    />
                    <button
                      onClick={() => incrementItem(item)}
                      className="px-4 py-2 border border-gray-200 rounded-r-full text-base"
                    >
                      +
                    </button>
                  </div>
                  <h6 className="text-indigo-600 font-bold text-lg w-full max-w-[140px] text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </h6>
                </div>
              </div>
            ))}

            {/* Coupon Modal */}
            {showCouponInput && (
              <div className="fixed inset-0 backdrop-blur-sm bg-white/30 z-50 flex justify-center items-center">
                <div className="bg-blue-50 rounded-lg p-6 w-full max-w-sm shadow-xl relative">
                  <h4 className="text-lg font-semibold mb-3">Enter Coupon Code</h4>
                  <input
                    type="text"
                    className="border border-blue-600 p-2 w-full mb-4"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowCouponInput(false)}
                      className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Total Summary */}
            <div className="bg-white p-4 w-full mb-6 max-w-xl ml-auto">
              <div className="flex justify-between mb-4">
                <p className="text-base text-gray-600">Sub Total</p>
                <h6 className="text-base font-semibold text-gray-900">
                  ₹{discountApplied ? discountedTotal.toFixed(2) : totalPrice.toFixed(2)}
                </h6>
              </div>
              <div className="flex justify-between pb-4 border-b border-gray-200">
                <p className="text-base text-gray-600">Delivery</p>
                <h6 className="text-base font-semibold text-gray-900">
                  ₹{deliveryCharge.toFixed(2)}
                </h6>
              </div>
              <div className="flex justify-between pt-4">
                <p className="text-lg font-medium text-gray-900">Total</p>
                <h6 className="text-lg font-medium text-indigo-500">
                  ₹{grandTotal.toFixed(2)}
                </h6>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <button
                onClick={() => setShowCouponInput(true)}
                className="rounded-full py-3 w-full max-w-[240px] bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-base font-semibold cursor-pointer"
              >
                Add Coupon
              </button>
              <button
                onClick={handleCheckout}
                className="rounded-full py-3 w-full max-w-[240px] bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold flex justify-center items-center cursor-pointer"
              >
                Place Order
                <svg
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 23 22"
                  fill="none"
                >
                  <path
                    d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
