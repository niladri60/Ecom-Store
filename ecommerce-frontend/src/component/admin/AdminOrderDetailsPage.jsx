import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Alert } from "@mui/material";
import {
    FaBox,
    FaUserAlt,
    FaTruck,
    FaClipboardList,
    FaMapMarkerAlt,
    FaCheckCircle
} from "react-icons/fa";

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminOrderDetailsPage = () => {
    const { itemId } = useParams();
    const [orderItems, setOrderItems] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        fetchOrderDetails(itemId);
    }, [itemId]);

    const fetchOrderDetails = async (itemId) => {
        try {
            const response = await ApiService.getOrderItemById(itemId);
            setOrderItems(response.orderItemList);
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const handleStatusChange = (orderItemId, newStatus) => {
        setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
    };

    const handleSubmitStatusChange = async (orderItemId) => {
        try {
            await ApiService.updateOrderitemStatus(orderItemId, selectedStatus[orderItemId]);
            setMessage('Order item status was successfully updated');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to update order item status');
        }
    };

    return (
      <div className="max-w-5xl mx-auto p-4">
        {message && (
          <Alert icon={<FaCheckCircle />} severity="info" className="mb-4">
            {message}
          </Alert>
        )}
        <h2 className="mt-3 text-2xl font-bold mb-6 flex items-center gap-2">
          <FaClipboardList className="text-blue-600" />
          Order Details
        </h2>

        {orderItems.length ? (
          orderItems.map((orderItem) => (
            <div
              key={orderItem.id}
              className="border border-gray-200 p-6 rounded-xl mb-8 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FaBox className="text-green-600" />
                    Order Information
                  </h3>
                  <p>
                    <strong>ID:</strong> {orderItem.id}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {orderItem.quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{orderItem.price}
                  </p>
                  <p>
                    <strong>Status:</strong> {orderItem.status}
                  </p>
                  <p>
                    <strong>Ordered:</strong>{" "}
                    {new Date(orderItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <FaUserAlt className="text-purple-600" />
                    User Information
                  </h3>
                  <p>
                    <strong>Name:</strong> {orderItem.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderItem.user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderItem.user.phoneNumber}
                  </p>
                  <p>
                    <strong>Role:</strong> {orderItem.user.role}
                  </p>

                  <h4 className="mt-4 font-medium flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    Delivery Address
                  </h4>
                  <p>
                    {orderItem.user.address?.street},{" "}
                    {orderItem.user.address?.city},{" "}
                    {orderItem.user.address?.state},{" "}
                    {orderItem.user.address?.zipcode},{" "}
                    {orderItem.user.address?.country}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
                {/* Product Information - Left */}
                <div className="flex flex-col md:flex-row items-start gap-4 w-full md:w-1/2">
                  <img
                    src={orderItem.product.imageUrl}
                    alt={orderItem.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <FaClipboardList className="text-yellow-600" />
                      Product Information
                    </h3>
                    <p>
                      <strong>Name:</strong> {orderItem.product.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {orderItem.product.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{orderItem.product.price}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h4 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <FaTruck className="text-indigo-600" />
                    Change Order Status
                  </h4>

                  <Listbox
                    value={selectedStatus[orderItem.id] || orderItem.status}
                    onChange={(value) =>
                      handleStatusChange(orderItem.id, value)
                    }
                  >
                    <div className="relative w-full">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-left shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all">
                        <span className="block truncate">
                          {selectedStatus[orderItem.id] || orderItem.status}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        {OrderStatus.map((status) => (
                          <Listbox.Option
                            key={status}
                            value={status}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-blue-100" : ""
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {status}
                                </span>
                                {selected && (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                    <CheckIcon className="h-5 w-5" />
                                  </span>
                                )}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>

                  <button
                    onClick={() => handleSubmitStatusChange(orderItem.id)}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                  >
                    <FaCheckCircle />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading order details...</p>
        )}
      </div>
    );
};

export default AdminOrderDetailsPage;
