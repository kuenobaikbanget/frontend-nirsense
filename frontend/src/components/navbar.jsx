import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo_nirsense_trans.png";
import defaultProfileImage from "../assets/no-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHistory, faUser, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkClassName = ({ isActive }) =>
    `flex items-center w-full px-4 py-3 text-left text-lg transition-colors duration-200 rounded-lg ${
      isActive
        ? "bg-cyan-500 text-black"
        : "text-slate-300 hover:bg-slate-700/60 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 bg-white/10 backdrop-blur-lg w-full z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        {/* Bagian Kiri: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Nirsense Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#56E1E9] bg-clip-text text-transparent">
            NIRSENSE
          </h1>
        </Link>

        {/* Bagian Kanan: Profil dan Hamburger Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/profil" className="flex items-center space-x-4 group">
            <span className="hidden sm:block text-md font-semibold text-white group-hover:text-[#56E1E9] transition-colors">
              Hi, John
            </span>
            <img
              src={defaultProfileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-white group-hover:border-cyan-300 transition-colors"
            />
          </Link>
          
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-slate-700/60 transition-colors"
              aria-label="Buka Menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>

            {/* Dropdown Menu dengan latar belakang transparan */}
            <div
              className={`absolute right-0 mt-2 w-56 bg-slate-800/80 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg p-2 transition-all duration-300 ease-in-out transform ${
                isMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <nav className="flex flex-col space-y-1">
                <NavLink to="/" className={navLinkClassName} onClick={() => setIsMenuOpen(false)} end>
                  <FontAwesomeIcon icon={faHome} className="w-6 mr-3" />
                  Dashboard
                </NavLink>
                <NavLink to="/history" className={navLinkClassName} onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faHistory} className="w-6 mr-3" />
                  Riwayat
                </NavLink>
                <NavLink to="/profil" className={navLinkClassName} onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faUser} className="w-6 mr-3" />
                  Profil
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;