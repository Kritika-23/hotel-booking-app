import React, { useContext, useState } from "react";
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
  LogOut,
  User,
} from "lucide-react";

const AdminLayout = () => {
  const { signOut } = useAuth();
  const { setUser, user } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const links = [
    { name: "Dashboard", path: "/admin", icon: Home },
    { name: "Hotels", path: "/admin/hotels", icon: Building2 },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  ];

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      navigate("/login");
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  // 👉 reused styles (important cleanup, NO UI change)
  const sidebarItem =
    "group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 backdrop-blur-xl border";

  const activeItem =
    "bg-gradient-to-r from-[#8458B3]/90 to-[#6f45a0]/90 text-white border-white/20 shadow-xl scale-[1.02]";

  const inactiveItem =
    "bg-white/10 border-white/10 text-gray-700 hover:bg-white/20 hover:shadow-lg";

  const topbarCard =
    "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-[28px] px-6 py-5 flex justify-between gap-5";

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f6f2ff] via-[#fdfcff] to-[#eef4ff] overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`fixed h-full z-30 transition-all duration-300
        ${sidebarOpen ? "w-72" : "w-24"}
        bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl`}
      >

        {/* LOGO */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">

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

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* NAV */}
        <div className="p-4 space-y-3 mt-3">

          {links.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`${sidebarItem} ${
                isActive(path) ? activeItem : inactiveItem
              }`}
            >
              <div
                className={
                  isActive(path)
                    ? "text-white"
                    : "text-[#8458B3] group-hover:text-[#6f45a0]"
                }
              >
                <Icon size={20} />
              </div>

              {sidebarOpen && (
                <span className="font-semibold tracking-wide text-sm">
                  {name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <div
        className={`flex-1 transition-all duration-300
        ${sidebarOpen ? "md:ml-72" : "md:ml-24"} ml-24`}
      >

        {/* TOPBAR */}
        <header className="sticky top-0 z-20 p-6">

          <div className={topbarCard}>

            {/* SEARCH */}
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-4 rounded-2xl w-full lg:w-[450px] shadow-inner">

              <Search size={18} className="text-[#8458B3]" />

              <input
                type="text"
                placeholder="Search hotels, users, bookings..."
                className="bg-transparent outline-none w-full text-sm text-gray-700"
                onChange={(e) =>
                  navigate(`/admin/search?query=${e.target.value}`)
                }
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">

              {/* ADD */}
              <button
                onClick={() => navigate("/admin/register-hotel")}
                className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ac7cde] to-purple-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition">
                  <Plus size={16} />
                </div>
                Add Listing
              </button>

              {/* USER */}
              <div className="flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl shadow-lg">

                {/* AVATAR */}
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#bf8dec] text-white font-bold">
                      {user?.name?.charAt(0) || "A"}
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="hidden md:block">
                  <p className="text-xs text-gray-600">Logged in as</p>
                  <p className="text-sm font-bold text-gray-800">
                    {user?.name || user?.email || "Admin"}
                  </p>
                </div>

                {/* PROFILE */}
                <Link to="/admin/profile">
                  <User size={20} />
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  <LogOut size={16} />
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