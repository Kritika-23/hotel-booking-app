import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Trash2, Upload } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const Profile = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { axios } = useContext(AppContext);

  const [preview, setPreview] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  const navigate = useNavigate();

  // stats
  const totalTrips = bookingData.length;
  const cancelledTrips = bookingData.filter(
    (b) => b.status === "cancelled"
  ).length;
  const pendingTrips = bookingData.filter(
    (b) => b.status === "pending"
  ).length;

  const displayName =
    user?.fullName?.trim() ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Guest";

  const imageSrc = preview || user?.imageUrl;

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken({ template: "backend" });

        const { data } = await axios.get("/api/bookings/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          setBookingData(data.bookings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  // upload image
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      await user.setProfileImage({ file });
      toast.success("Profile updated!");
    } catch {
      toast.error("Upload failed");
    }
  };

  // delete image
  const handleDeleteImage = async () => {
    try {
      await user.setProfileImage({ file: null });
      setPreview(null);
      toast.success("Image removed");
    } catch {
      toast.error("Error removing image");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8fb]">
        <h2 className="text-gray-500 text-lg">Please login first</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f0ff] via-white to-[#f8f8fb] py-24 px-4">

      {/* HEADER */}
      <div className="max-w-md mx-auto mb-6 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8458b3] to-[#6d3fa0] text-transparent bg-clip-text">
          User Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your account & trips
        </p>

        {/* CARD */}
        <div className="mt-8 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-[28px] p-6">

          {/* PROFILE IMAGE */}
          <div className="relative flex justify-center">
            <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-[#8458b3] to-[#6d3fa0]">
              <img
                src={imageSrc}
                alt="profile"
                className="w-full h-full rounded-full object-cover border-4 border-white"
              />
            </div>

            <label className="absolute bottom-2 right-20 bg-white shadow-md p-2 rounded-full cursor-pointer hover:scale-110 transition">
              <Upload size={16} className="text-[#8458b3]" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* NAME */}
          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            {displayName}
          </h2>

          {/* EMAIL */}
          <p className="text-gray-500 text-sm">
            {user?.primaryEmailAddress?.emailAddress}
          </p>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 mt-6">

            <div className="bg-white/70 backdrop-blur p-3 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500">Trips</p>
              <h3 className="text-xl font-bold text-gray-900">
                {totalTrips}
              </h3>
            </div>

            <div className="bg-white/70 backdrop-blur p-3 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500">Pending</p>
              <h3 className="text-xl font-bold text-yellow-600">
                {pendingTrips}
              </h3>
            </div>

            <div className="bg-white/70 backdrop-blur p-3 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500">Cancelled</p>
              <h3 className="text-xl font-bold text-red-500">
                {cancelledTrips}
              </h3>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8458b3] to-[#6d3fa0] text-white font-medium hover:scale-[1.02] transition"
            >
              Explore Hotels
            </button>

            <button
              onClick={handleDeleteImage}
              className="w-full py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Remove Image
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;