import { useNavigate } from "react-router-dom";
import { FaListAlt, FaBoxOpen, FaClipboardList } from "react-icons/fa"; // Category, Product, Orders
import { MdAdminPanelSettings } from "react-icons/md"; // Admin Icon

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-1 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center animate-fade-in">
        <div className="flex justify-center items-center mb-6 text-blue-700">
          <MdAdminPanelSettings className="text-5xl mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
        </div>

        <div className="space-y-4 mt-6">
          <button
            onClick={() => navigate("/admin/categories")}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-xl shadow hover:shadow-md transform hover:-translate-y-1"
          >
            <FaListAlt className="text-lg" />
            Manage Categories
          </button>
          <button
            onClick={() => navigate("/admin/products")}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out rounded-xl shadow hover:shadow-md transform hover:-translate-y-1"
          >
            <FaBoxOpen className="text-lg" />
            Manage Products
          </button>
          <button
            onClick={() => navigate("/admin/orders")}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 ease-in-out rounded-xl shadow hover:shadow-md transform hover:-translate-y-1"
          >
            <FaClipboardList className="text-lg" />
            Manage Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
