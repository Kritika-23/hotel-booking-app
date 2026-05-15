// import React, { useState, useRef, useEffect, useContext } from "react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import { useUser, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn, user } = useUser(); // ✅ FIXED
  const { signOut } = useClerk(); // ✅ FIXED

  const { axios } = useContext(AppContext); // ❌ removed user from here
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ Clerk logout
  const logout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Rooms", path: "/rooms" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-[#E9D8FD] shadow-sm fixed top-0 left-0 z-50">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold tracking-wide">
          <span style={{ color: "#8458B3" }}>Glamour</span>
          <span className="text-gray-900">Stays.</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className="group flex flex-col gap-0.5 text-gray-900">
            {link.name}
            <div className="h-0.5 w-0 bg-[#8458b3] group-hover:w-full transition-all duration-300" />
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
        {isSignedIn ? (   // ✅ FIXED
          <div>
            <img
              src={user?.imageUrl} // ✅ Clerk image
              alt="profile"
              className="w-12 h-12 rounded-full cursor-pointer object-cover border-2 border-white shadow-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/my-bookings");
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Bookings
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full text-white font-medium"
            style={{ backgroundColor: "#8458B3" }}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-6 w-6 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden items-center justify-center gap-6 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          ✕
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {isSignedIn ? (   // ✅ FIXED
          <>
            <img
              src={user?.imageUrl}
              className="w-12 h-12 rounded-full"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;