import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProducts from "./pages/admin/AdminProducts";
import Home from "./pages/Home";
import Categories from "./pages/Categories";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          {/* admin sahifalar */}
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        {/* users sahifalar */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
