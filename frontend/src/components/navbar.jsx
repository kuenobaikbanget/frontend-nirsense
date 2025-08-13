import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo_nirsense_trans.png";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClassName = ({ isActive }) =>
    `
    flex items-center pb-1 relative 
    font-semibold
    transition-colors duration-300 
    hover:text-[#56E1E9]
    after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:w-full after:h-0.5 after:bg-[#56E1E9] 
    after:origin-center after:transition-transform after:duration-300 after:ease-out
    after:scale-x-0 hover:after:scale-x-100
    ${isActive ? "text-[#56E1E9] after:scale-x-100" : "text-white"}
  `;

  return (
    <nav className="sticky top-0 bg-neutral-200/25 backdrop-blur-md w-full z-50 shadow-lg shadow-black/20">
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        <Link to="/" className="flex items-center space-x-1">
          <img
            src={logo}
            loading="lazy"
            alt="Nirsense Logo"
            className="h-10 w-auto ml-3"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#56E1E9] bg-clip-text text-transparent">
            NIRSENSE
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8 pr-8">
          <NavLink to="/" className={navLinkClassName}>
            Beranda
          </NavLink>
          <NavLink to="/history" className={navLinkClassName}>
            Riwayat
          </NavLink>
          <NavLink to="/profil" className={navLinkClassName}>
            Profil
          </NavLink>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-6"
              >
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-[#112C70] p-4 flex flex-col space-y-2">
          <NavLink
            to="/"
            className="block py-2 text-white hover:text-[#56E1E9] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/history"
            className="block py-2 text-white hover:text-[#56E1E9] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Riwayat
          </NavLink>
          <NavLink
            to="/profil"
            className="block py-2 text-white hover:text-[#56E1E9] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profil
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
