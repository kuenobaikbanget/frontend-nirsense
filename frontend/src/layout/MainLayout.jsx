import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#112C70] via-[#0c286c] to-[#0A1A3A] text-white">
      <Navbar />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;