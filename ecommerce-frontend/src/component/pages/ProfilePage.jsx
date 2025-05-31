import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">
        Welcome, {userInfo.name}
      </h2>

      {error ? (
        <p className="text-red-500 font-medium">{error}</p>
      ) : (
        <div className="space-y-10">
          {/* User Info */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Profile Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Email:</strong> {userInfo.email}</p>
              <p><strong>Phone:</strong> {userInfo.phoneNumber}</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              <button
                onClick={handleAddressClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                {userInfo.address ? "Edit Address" : "Add Address"}
              </button>
            </div>
            {userInfo.address ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><strong>Street:</strong> {userInfo.address.street}</p>
                <p><strong>City:</strong> {userInfo.address.city}</p>
                <p><strong>State:</strong> {userInfo.address.state}</p>
                <p><strong>Zip Code:</strong> {userInfo.address.zipCode}</p>
                <p><strong>Country:</strong> {userInfo.address.country}</p>
              </div>
            ) : (
              <p className="text-gray-500">No address available.</p>
            )}
          </div>

          {/* Orders */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Order History</h3>
            {paginatedOrders.length === 0 ? (
              <p className="text-gray-500">No orders found.</p>
            ) : (
              <ul className="space-y-6">
                {paginatedOrders.map((order) => (
                  <li
                    key={order.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-gray-100 rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                  >
                    <img
                      src={order.product?.imageUrl}
                      alt={order.product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="text-gray-700">
                      <p><strong>Name:</strong> {order.product.name}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Quantity:</strong> {order.quantity}</p>
                      <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
