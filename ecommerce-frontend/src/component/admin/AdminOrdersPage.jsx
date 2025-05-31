import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    try {
      let response;
      if (searchStatus) {
        response = await ApiService.getAllOrderItemsByStatus(searchStatus);
      } else {
        response = await ApiService.getAllOrders();
      }

      const orderList = response.orderItemList || [];
      setOrders(orderList);

      // Apply statusFilter to fetched orders if applicable
      const visibleOrders = statusFilter
        ? orderList.filter((order) => order.status === statusFilter)
        : orderList;

      setTotalPages(Math.ceil(visibleOrders.length / itemsPerPage));
      setFilteredOrders(
        visibleOrders.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch orders"
      );
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [searchStatus, currentPage, statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setStatusFilter(filterValue);
    setCurrentPage(1);

    if (filterValue) {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    } else {
      setFilteredOrders(orders.slice(0, itemsPerPage));
      setTotalPages(Math.ceil(orders.length / itemsPerPage));
    }
  };

  const handleSearchStatusChange = async (e) => {
    setSearchStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
        <h2 className="text-4xl font-extrabold text-black mb-8 text-center">
          📦 Manage Orders
        </h2>

        {error && (
          <p className="text-red-600 font-semibold text-center mb-6 animate-pulse">
            {error}
          </p>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Filter By Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {OrderStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Search By Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={searchStatus}
              onChange={handleSearchStatusChange}
            >
              <option value="">All</option>
              {OrderStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Color Legend */}
        <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-700 font-medium">
          {OrderStatus.map((status) => (
            <span
              key={status}
              className={`px-3 py-1 rounded-full shadow-sm
            ${
              status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : status === "CONFIRMED"
                ? "bg-blue-100 text-blue-800"
                : status === "SHIPPED"
                ? "bg-violet-100 text-violet-800"
                : status === "DELIVERED"
                ? "bg-emerald-100 text-emerald-800"
                : status === "CANCELLED"
                ? "bg-rose-100 text-rose-800"
                : status === "RETURNED"
                ? "bg-orange-100 text-orange-800"
                : "bg-gray-100 text-gray-800"
            }
          `}
            >
              {status}
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-indigo-600 text-white text-sm uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Date Ordered</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.user.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold transition
                    ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "CONFIRMED"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "SHIPPED"
                        ? "bg-violet-100 text-violet-800"
                        : order.status === "DELIVERED"
                        ? "bg-emerald-100 text-emerald-800"
                        : order.status === "CANCELLED"
                        ? "bg-rose-100 text-rose-800"
                        : order.status === "RETURNED"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">${order.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleOrderDetails(order.id)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-200 text-sm font-medium shadow"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
