import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useClerk, useUser } from "@clerk/clerk-react";

import {
  Mail,
  ShieldCheck,
  CalendarDays,
  Hotel,
  BedDouble,
  LogOut,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const AdminProfile = () => {
  const { user, hotelData, roomData, setUser, axios } =
    useContext(AppContext);
const { getToken } = useAuth();
  const { signOut } = useClerk();
  const { user: clerkUser } = useUser();

  // ✅ IMAGE UPLOAD
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const token = await getToken({ template: "backend" });

    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(
      "/api/user/upload-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ IMPORTANT FIX
        },
      }
    );

    if (data.success) {
      setUser(data.user);
    }
  } catch (err) {
    console.log("Upload error:", err.response?.data || err);
  }
};
  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#f6f0ff] via-white to-[#efe4ff]">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-800">
          Admin Profile
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your admin account
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white/80 backdrop-blur-xl border rounded-[36px] shadow-2xl p-8">

        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="relative group">

            <img
              src={user?.profileImage || clerkUser?.imageUrl}
              alt="admin"
              className="w-40 h-40 rounded-full object-cover border-4 border-purple-200"
            />

            {/* hover upload */}
            <label
              htmlFor="imgUpload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full"
            >
              Change
            </label>

            <input
              type="file"
              id="imgUpload"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* INFO */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black">
              {user?.name}
            </h2>

            {/* EMAIL */}
            <div className="flex items-center gap-3 mt-4">
              <Mail className="text-[#8458b3]" />
              <p>{user?.email}</p>
            </div>

            {/* ROLE */}
            <div className="flex items-center gap-3 mt-2">
              <ShieldCheck className="text-[#8458b3]" />
              <span className="px-3 py-1 bg-purple-100 rounded-full text-sm">
                {user?.role}
              </span>
            </div>

            {/* DATE */}
            <div className="flex items-center gap-3 mt-2">
              <CalendarDays className="text-[#8458b3]" />
              <p>
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <Hotel className="text-[#8458b3]" />
          <h2 className="text-3xl font-bold">
            {hotelData?.length || 0}
          </h2>
          <p>Total Hotels</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <BedDouble className="text-[#8458b3]" />
          <h2 className="text-3xl font-bold">
            {roomData?.length || 0}
          </h2>
          <p>Total Rooms</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <ShieldCheck className="text-green-600" />
          <h2 className="text-3xl font-bold text-green-600">
            {user?.role}
          </h2>
          <p>Status</p>
        </div>

      </div>

      {/* LOGOUT */}
      <div className="mt-10">
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-6 py-3 rounded-2xl flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;