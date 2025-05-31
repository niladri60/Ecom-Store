import Home from "./component/pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./component/pages/RegistrationPage"
import LoginPage from "./component/pages/LoginPage"
import AboutPage from "./component/pages/AboutPage";
import ContactPage from "./component/pages/ContactPage";
import { CartProvider } from "./component/context/CartContext";
import Navbar from "./component/common/Navbar";
import ProductPage from "./component/pages/ProductPage";
import ProductDetailsPage from "./component/pages/ProductDetailsPage";
import CategoryListPage from "./component/pages/CategoryListPage";
import CategoryProductsPage from "./component/pages/CategoryProductsPage";
import CartPage from "./component/pages/CartPage";
import ProfilePage from "./component/pages/ProfilePage";
import { ProtectedRoute, AdminRoute } from './component/service/Guard';
import AddressPage from "./component/pages/AddressPage";
import AdminPage from "./component/admin/AdminPage";
import AdminCategoryPage from "./component/admin/AdminCategoryPage";
import AdminProductPage from "./component/admin/AdminProductPage";
import AdminOrdersPage from "./component/admin/AdminOrdersPage";
import AddCategory from "./component/admin/AddCategory";
import EditCategory from "./component/admin/EditCategory";
import AddProductPage from "./component/admin/AddProductPage";
import EditProductPage from "./component/admin/EditProductPage";
import AdminOrderDetailsPage from "./component/admin/AdminOrderDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryProductsPage />}
          />
          <Route path="/cart" element={<CartPage />} />

          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/add-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />
          <Route
            path="/edit-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />

          <Route
            path="/admin"
            element={<AdminRoute element={<AdminPage />} />}
          />
          <Route
            path="/admin/categories"
            element={<AdminRoute element={<AdminCategoryPage />} />}
          />
          <Route
            path="/admin/add-category"
            element={<AdminRoute element={<AddCategory />} />}
          />
          <Route
            path="/admin/edit-category/:categoryId"
            element={<AdminRoute element={<EditCategory />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute element={<AdminProductPage />} />}
          />
          <Route
            path="/admin/add-product"
            element={<AdminRoute element={<AddProductPage />} />}
          />
          <Route
            path="/admin/edit-product/:productId"
            element={<AdminRoute element={<EditProductPage />} />}
          />
          <Route
            path="/admin/orders"
            element={<AdminRoute element={<AdminOrdersPage />} />}
          />
          <Route
            path="/admin/order-details/:itemId"
            element={<AdminRoute element={<AdminOrderDetailsPage />} />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
