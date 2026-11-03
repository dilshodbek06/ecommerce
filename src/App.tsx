import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import AdminCategories from "./pages/admin/AdminCategories";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          {/* admin sahifalar */}
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
