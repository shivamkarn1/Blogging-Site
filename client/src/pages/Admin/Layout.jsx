import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import DashboardNavbar from "../../components/Admin/DashboardNavbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <DashboardNavbar
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={sidebarOpen}
      />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
