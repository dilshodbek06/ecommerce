import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          {/* admin sahifalar */}
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* users sahifalar */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        {/* auth sahifalar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer autoClose={3000} position="top-right" />
    </AuthProvider>
  );
}

export default App;
