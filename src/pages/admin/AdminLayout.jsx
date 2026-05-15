import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useAuth } from "@clerk/clerk-react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Home,
  Building2,
  Calendar,
  Plus,
  Search,
  Menu,
  LogOut
} from "lucide-react";

const AdminLayout = () => {

  const { signOut } = useAuth();
  const { setUser, user } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      navigate("/login");
      toast.success("Logged out");
    } catch (e) {
      toast.error("Logout failed");
    }
  };

 const links = [
  { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
  { name: "Hotels", path: "/admin/hotels", icon: <Building2 size={20} /> },
  // { name: "Rooms", path: "/admin/rooms", icon: <Building2 size={20} /> },
  { name: "Bookings", path: "/admin/bookings", icon: <Calendar size={20} /> },
];

 return (
  <div className="min-h-screen flex bg-gradient-to-br from-[#f6f2ff] via-[#fdfcff] to-[#eef4ff] overflow-hidden">

    {/* SIDEBAR */}
    <aside
      className={`fixed h-full z-30 transition-all duration-300
      ${sidebarOpen ? "w-72" : "w-24"}
      bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl`}
    >

      {/* LOGO */}
      <div className="p-6 flex items-center justify-between border-b border-white/10">

        {sidebarOpen && (
          <div>

            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-[#8458B3] to-[#FF4D6D] bg-clip-text text-transparent">
            Glamour Stays
            </h1>

            

          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition backdrop-blur-xl"
        >
          <Menu size={18} className="text-gray-700" />
        </button>

      </div>

      {/* NAVIGATION */}
      <div className="p-4 space-y-3 mt-3">

        {links.map((item) => {

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border

              ${
                active
                  ? "bg-gradient-to-r from-[#8458B3]/90 to-[#6f45a0]/90 text-white border-white/20 shadow-xl scale-[1.02]"
                  : "bg-white/10 border-white/10 text-gray-700 hover:bg-white/20 hover:shadow-lg"
              }`}
            >

              <div
                className={`${
                  active
                    ? "text-white"
                    : "text-[#8458B3] group-hover:text-[#6f45a0]"
                }`}
              >
                {item.icon}
              </div>

              {sidebarOpen && (
                <span className="font-semibold tracking-wide text-sm">
                  {item.name}
                </span>
              )}

            </Link>
          );

        })}

      </div>

    </aside>

    {/* MAIN */}
    <div
      className={`flex-1 transition-all duration-300
      ${sidebarOpen ? "md:ml-72" : "md:ml-24"} ml-24`}
    >

      {/* TOPBAR */}
      <header className="sticky top-0 z-20 p-6">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[28px] px-6 py-5 flex flex-col lg:flex-row justify-between gap-5">

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-4 rounded-2xl w-full lg:w-[450px] shadow-inner">

            <Search size={18} className="text-[#8458B3]" />

            <input
              type="text"
              placeholder="Search hotels, users, bookings..."
              className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
              onChange={(e) =>
                navigate(`/admin/search?query=${e.target.value}`)
              }
            />

          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            {/* ADD HOTEL */}
            <button
              onClick={() => navigate("/admin/register-hotel")}
              className="flex items-center gap-2 bg-gradient-to-r from-[#8458B3] to-[#FF4D6D]
              hover:scale-[1.03] transition-all duration-300
              text-white px-6 py-3 rounded-2xl font-semibold shadow-xl"
            >
              <Plus size={18} />
              Add Listing
            </button>

            {/* USER CARD */}
            <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl shadow-lg">

              {/* AVATAR */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8458B3] to-[#FF4D6D] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user?.name?.charAt(0) || "A"}
              </div>

              {/* USER INFO */}
              <div className="hidden md:block">

                <p className="text-xs text-gray-500">
                  Logged in as
                </p>

                <p className="text-sm font-bold text-gray-800">
                  {user?.name || "Admin"}
                </p>

              </div>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600 transition"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* CONTENT */}
      <main className="p-6">

        <Outlet />

      </main>

    </div>

  </div>
);
};

export default AdminLayout;