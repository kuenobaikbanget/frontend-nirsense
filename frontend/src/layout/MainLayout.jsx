import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#112C70] via-[#0c286c] to-[#0A1A3A] text-white">
      <Navbar />
      <main className="pt-5 pb-10 px-4 container mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
