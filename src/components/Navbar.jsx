// import React, { useState, useRef, useEffect, useContext } from "react";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import { useUser, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const { isSignedIn, user } = useUser(); // ✅ FIXED
  const { signOut } = useClerk(); // ✅ FIXED

  const { axios } = useContext(AppContext); 
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
  <nav
    className="
    fixed top-0 left-0 w-full z-50
    bg-white/30
    backdrop-blur-xl
    border-b border-white/20
    shadow-[0_8px_30px_rgba(0,0,0,0.04)]
    "
  >
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-10">

      <div className="flex items-center justify-between h-[78px]">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          {/* ICON */}
          <div
            className="
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br
            from-[#8458b3]
            to-[#6d3fa0]
            flex items-center justify-center
            shadow-lg
            shadow-purple-200/50
            "
          >
            <span className="text-white font-bold text-lg">
              G
            </span>
          </div>

          {/* TEXT */}
          <div className="leading-none">

            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">
              Glamour<span className="text-[#8458b3]">Stays</span>
            </h1>

            <p className="text-[11px] text-gray-400 tracking-[3px] uppercase mt-1">
              Luxury Booking
            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">

          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="
              relative
              text-[15px]
              font-medium
              text-gray-600
              hover:text-black
              transition-all
              duration-300
              group
              "
            >
              {link.name}

              <span
                className="
                absolute
                left-0
                -bottom-2
                h-[2px]
                w-0
                bg-[#8458b3]
                rounded-full
                transition-all
                duration-300
                group-hover:w-full
                "
              />
            </Link>
          ))}

        </div>

        {/* RIGHT */}
        <div
          className="hidden md:flex items-center gap-4 relative"
          ref={dropdownRef}
        >

          {isSignedIn ? (

            <div className="relative">

              {/* PROFILE */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="
                flex items-center gap-3
                bg-white/60
                backdrop-blur-xl
                border border-white/30
                px-2 py-2
                rounded-full
                cursor-pointer
                hover:shadow-lg
                transition-all
                "
              >

                <img
                  src={user?.imageUrl}
                  alt="profile"
                  className="
                  w-10 h-10
                  rounded-full
                  object-cover
                  border-2 border-white
                  "
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-none">
                    {user?.firstName}
                  </p>

                 
                </div>

              </div>

              {/* DROPDOWN */}
              {isDropdownOpen && (

                <div
                  className="
                  absolute
                  right-0
                  mt-4
                  w-56
                  bg-white/70
                  backdrop-blur-2xl
                  border border-white/20
                  rounded-3xl
                  overflow-hidden
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  "
                >

                  <div className="p-5 border-b border-gray-100">

                    <p className="font-semibold text-gray-900">
                      {user?.fullName}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>

                  </div>

                  <div className="p-2">

                    <button
                      onClick={() => {
                        navigate("/my-bookings");
                        setIsDropdownOpen(false);
                      }}
                      className="
                      w-full
                      text-left
                      px-4 py-3
                      rounded-2xl
                      hover:bg-gray-100
                      text-sm
                      transition
                      "
                    >
                      My Bookings
                    </button>

                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="
                      w-full
                      text-left
                      px-4 py-3
                      rounded-2xl
                      hover:bg-gray-100
                      text-sm
                      transition
                      "
                    >
                      Profile
                    </button>

                    <button
                      onClick={logout}
                      className="
                      w-full
                      text-left
                      px-4 py-3
                      rounded-2xl
                      hover:bg-red-50
                      text-red-500
                      text-sm
                      transition
                      "
                    >
                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>

          ) : (

            <button
              onClick={() => navigate("/login")}
              className="
              px-6 py-3
              rounded-2xl
              bg-gradient-to-r
              from-[#8458b3]
              to-[#6d3fa0]
              text-white
              font-medium
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
              "
            >
              Login
            </button>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >

          <div className="space-y-1.5">

            <div className="w-6 h-[2px] bg-gray-900 rounded-full"></div>
            <div className="w-6 h-[2px] bg-gray-900 rounded-full"></div>
            <div className="w-6 h-[2px] bg-gray-900 rounded-full"></div>

          </div>

        </button>

      </div>

    </div>

    {/* MOBILE MENU */}
    <div
      className={`
      fixed top-0 left-0
      w-full h-screen
      bg-white/80
      backdrop-blur-2xl
      flex flex-col items-center justify-center gap-8
      transition-all duration-500 md:hidden
      ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >

      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-6 right-6 text-3xl"
      >
        ×
      </button>

      {navLinks.map((link, i) => (
        <Link
          key={i}
          to={link.path}
          onClick={() => setIsMenuOpen(false)}
          className="
          text-2xl
          font-semibold
          text-gray-800
          hover:text-[#8458b3]
          transition
          "
        >
          {link.name}
        </Link>
      ))}

      {!isSignedIn && (
        <button
          onClick={() => navigate("/login")}
          className="
          mt-6
          px-8 py-4
          rounded-2xl
          bg-gradient-to-r
          from-[#8458b3]
          to-[#6d3fa0]
          text-white
          font-medium
          "
        >
          Login
        </button>
      )}

    </div>

  </nav>
);
};

export default Navbar;