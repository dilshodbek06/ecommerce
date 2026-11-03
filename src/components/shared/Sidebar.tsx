import {
  ArrowLeft,
  Box,
  FolderOpenDot,
  LayoutDashboard,
  Moon,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="h-full border-r border-gray-400 w-80">
      <div className="mt-2 px-5 py-2 flex items-center justify-between">
        <h1>Admin</h1>
        <Moon className="cursor-pointer" />
      </div>
      <hr className="mt-2" />
      <div className="mt-4 px-4 space-y-3 text-gray-500">
        <Link to={"/admin/dashboard"}>
          <div
            className={`py-3 px-5 border rounded-md flex items-center gap-2 ${pathname === "/admin/dashboard" ? "bg-orange-400/70 text-white" : ""} `}
          >
            <LayoutDashboard /> <p>Dashboard</p>
          </div>
        </Link>
        <Link to={"/admin/categories"} className="my-3 block">
          <div
            className={`py-3 px-5 border rounded-md flex items-center gap-2 ${pathname === "/admin/categories" ? "bg-orange-400/70 text-white" : ""} `}
          >
            <FolderOpenDot /> <p>Categories</p>
          </div>
        </Link>
        <Link to={"/admin/products"}>
          <div
            className={`py-3 px-5 border rounded-md flex items-center gap-2 ${pathname === "/admin/products" ? "bg-orange-400/70 text-white" : ""} `}
          >
            <Box /> <p>Products</p>
          </div>
        </Link>
        <Link to={"/admin/orders"} className="my-3 block">
          <div
            className={`py-3 px-5 border rounded-md flex items-center gap-2 ${pathname === "/admin/orders" ? "bg-orange-400/70 text-white" : ""} `}
          >
            <ShoppingBag /> <p>Orders</p>
          </div>
        </Link>
        <Link to={"/admin/users"}>
          <div
            className={`py-3 px-5 border rounded-md flex items-center gap-2 ${pathname === "/admin/users" ? "bg-orange-400/70 text-white" : ""} `}
          >
            <Users /> <p>Users</p>
          </div>
        </Link>
      </div>
      <hr className="mt-8" />
      <div className="px-4">
        <div className="py-3 mt-4 text-gray-400 hover:text-black cursor-pointer px-5 border rounded-md flex items-center gap-2 ">
          <ArrowLeft /> <p>Do'konga qaytish</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
