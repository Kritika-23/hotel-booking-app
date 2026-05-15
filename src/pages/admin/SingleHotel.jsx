import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { MapPin, Star, BedDouble, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";

const SingleHotel = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { axios } = useContext(AppContext);
  const { id } = useParams(); // Get hotel ID from URL

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

    const [currentImage, setCurrentImage] = useState(0);
  // ✅ Fetch Single Hotel Details (including rooms)
 const fetchHotelDetails = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(`/api/hotel/${id}`);

    if (data.success && data.hotel) {
      setHotel(data.hotel);
    } else {
      toast.error(data.message || "Hotel not found.");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error fetching hotel details.");
  } finally {
    setLoading(false);
  }
};

const fetchHotelRooms = async () => {
  try {
    const { data } = await axios.get(
    `/api/rooms/by-hotel/${id}`
    );
 console.log(data);
    if (data.success) {
      setRooms(data.rooms);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  fetchHotelDetails();
  fetchHotelRooms();
}, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-500">
        Hotel not found ❌
      </div>
    );
  }
const deleteRoom = async (roomId) => {
  try {
    const token = await getToken({ template: "backend" });

    const { data } = await axios.delete(
      `/api/rooms/delete/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success("Room deleted");

      setRooms((prev) =>
        prev.filter((room) => room._id !== roomId)
      );
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Delete failed"
    );
  }
};
  return (
    <div className="pt-2 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white  hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
        {/* ===== Header Section ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-[#2c0850] mb-3">
                {hotel.hotelName}
              </h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-red-500" />
                <span>{hotel.hotelAddress}</span>

                
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium text-gray-700">
                  {hotel.rating || "N/A"} / 5
                </span>
              </div>
              {/* ADD ROOM BUTTON HERE */}
<button
 onClick={() => navigate(`/admin/hotel/${id}/add-room`)}
  className="bg-green-600 text-white px-4 py-2 rounded mt-3"
>
  + Add Room
</button>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-gray-700">
                Owner:{" "}
                <span className="text-[#8458b3]">
                  {hotel.owner?.name || "Unknown"}
                </span>
              </p>
              <p className="text-gray-500 mt-1">{hotel.owner?.email}</p>
            </div>
          </div>
        </div>

        {/* ===== Hotel Image ===== */}
         <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

  {/* TOP ACTION BAR */}
  <div className="flex justify-between items-center mb-5">

    <h2 className="text-2xl font-bold text-[#2c0850]">
      Hotel Gallery
    </h2>

    <div className="flex gap-3">
  {/* VIEW */}
{/* VIEW */}
<button
  onClick={() =>
    navigate(`/admin/hotel/view/${hotel._id}`)
  }
  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
>
  View
</button>

      {/* EDIT */}
      <button
        onClick={() => navigate(`/admin/edit-hotel/${hotel._id}`)}
        className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-medium hover:bg-green-200 transition"
      >
        Edit
      </button>

      {/* DELETE */}
      <button
        onClick={async () => {

          const confirmDelete = window.confirm(
            "Delete this hotel?"
          );

          if (!confirmDelete) return;

          try {

            const token = await getToken({
              template: "backend",
            });

            const { data } = await axios.delete(
              `/api/hotel/delete/${hotel._id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (data.success) {

              toast.success("Hotel deleted");

              navigate("/admin");

            }

          } catch (error) {

            toast.error(
              error.response?.data?.message ||
              "Delete failed"
            );

          }
        }}
        className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-medium hover:bg-red-200 transition"
      >
        Delete
      </button>

    </div>
  </div>

 <div className="relative">

 <img
  src={
    hotel?.images?.[currentImage]
      ? `http://localhost:4000${hotel.images[currentImage]}`
      : "/placeholder.jpg"
  }
  alt={hotel?.hotelName}
  className="w-full h-[400px] object-cover rounded-xl border border-gray-200"
/>


{/* LEFT */}
<button
  type="button"
  onClick={() => {
    if (!hotel?.images?.length) return;

    setCurrentImage((prev) =>
      prev === 0
        ? hotel.images.length - 1
        : prev - 1
    );
  }}
  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow text-xl"
>
  ❮
</button>

{/* RIGHT */}
<button
  type="button"
  onClick={() => {
    if (!hotel?.images?.length) return;

    setCurrentImage((prev) =>
      prev === hotel.images.length - 1
        ? 0
        : prev + 1
    );
  }}
  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow text-xl"
>
  ❯
</button>

  {/* DOTS */}
  <div className="flex justify-center gap-2 mt-4">

    {hotel?.images?.map((_, index) => (

      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`w-3 h-3 rounded-full ${
          currentImage === index
            ? "bg-[#8458b3]"
            : "bg-gray-300"
        }`}
      />

    ))}

  </div>

</div>
</div>
        {/* ===== Hotel Description =====
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">About This Hotel</h2>
          <p className="text-gray-700 leading-relaxed">
            {hotel.description || "No description available."}
          </p>
        </div> */}

        {/* ===== Amenities ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hotel Amenities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotel.amenities
              ? hotel.amenities.split(",").map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-[#8458b3]" />
                    <span className="text-gray-700 font-medium">{item.trim()}</span>
                  </div>
                ))
              : "No amenities listed."}
          </div>
        </div>

        {/* ===== Rooms Section ===== */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Rooms in this Hotel</h2>
         
          </div>
{rooms.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="w-full border rounded-xl overflow-hidden">
      <thead className="bg-purple-100">
        <tr>
          <th className="p-3 text-left">Image</th>
          <th className="p-3 text-left">Room</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {rooms.map((room) => (
          <tr key={room._id} className="border-t">
            <td className="p-3">
              <img
                src={`http://localhost:4000${room.images?.[0]}`}
                className="w-20 h-16 object-cover rounded"
              />
            </td>

            <td className="p-3 font-medium">
              {room.roomType}
            </td>

            <td className="p-3">
              ₹{room.pricePerNight}
            </td>

            <td className="p-3">
              {room.isAvailable ? "Available" : "Unavailable"}
            </td>

          <td className="p-8 flex gap-3">
  {/* VIEW */}
  <Link
    to={`/admin/room/${room._id}`}
    className="text-blue-600 font-medium hover:underline"
  >
    View
  </Link>

  {/* EDIT */}
  <Link
    to={`/admin/edit-room/${room._id}`}
    className="text-green-600 font-medium hover:underline"
  >
    Edit
  </Link>

  {/* DELETE */}
  <button
    onClick={() => deleteRoom(room._id)}
    className="text-red-600 font-medium hover:underline"
  >
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No rooms added yet.</p>
)}
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
