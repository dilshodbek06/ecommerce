import Sidebar from "@/components/shared/Sidebar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="py-3 px-5 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
