import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { MapPin, Star, BedDouble, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";
import {
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Tv,
  Coffee,
  Snowflake,
  Bath,
  Eye,
  Building,
  Waves,
  ShieldCheck,
} from "lucide-react";

import { normalizeAmenities, getAmenityIcon } from "../../utils/amenities";

const AdminHotelDetails = () => {
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

//helper function

const normalizeAmenities = (amenities) => {
  if (!amenities) return [];

  if (Array.isArray(amenities)) {
    return amenities.flatMap((item) => {
      if (typeof item === "string" && item.startsWith("[")) {
        try {
          return JSON.parse(item);
        } catch {
          return [item];
        }
      }
      return [item];
    });
  }

  if (typeof amenities === "string") {
    try {
      return JSON.parse(amenities);
    } catch {
      return amenities.split(",").map(i => i.trim());
    }
  }

  return [];
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
       {/* HERO IMAGE SECTION */}
<div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">

  <div className="relative">

    {/* MAIN IMAGE */}
    <img
      src={
        hotel?.images?.[currentImage]
          ? `http://localhost:4000${hotel.images[currentImage]}`
          : "/placeholder.jpg"
      }
      alt={hotel?.hotelName}
      className="w-full h-[500px] object-cover"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/35" />

    {/* LEFT BUTTON */}
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
      className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
    >
      ❮
    </button>

    {/* RIGHT BUTTON */}
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
      className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
    >
      ❯
    </button>

    {/* HOTEL INFO */}
    <div className="absolute bottom-8 left-8 text-white">

      <h1 className="text-5xl font-bold mb-3">
        {hotel.hotelName}
      </h1>

      <div className="flex items-center gap-2 text-lg">
        <MapPin className="w-5 h-5 text-red-400" />
        {hotel.hotelAddress}
      </div>

<div className="mt-4 inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl shadow-lg">

  <div className="flex flex-col">
    
    <span className="text-xs uppercase tracking-widest text-gray-200">
      Starting From
    </span>

    <p className="text-3xl font-bold text-green-300 leading-tight">
      ₹
      {rooms.length > 0
        ? Math.min(
            ...rooms.map(room => room.pricePerNight)
          ).toLocaleString()
        : "N/A"}
    </p>

  </div>

</div>
    </div>

    {/* ACTION BUTTONS */}
    <div className="absolute top-6 right-6 flex gap-3">

      {/* EDIT */}
      <button
        onClick={() =>
          navigate(`/admin/edit-hotel/${hotel._id}`)
        }
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

    {/* DOTS */}
    <div className="absolute bottom-5 right-8 flex gap-2">

      {hotel?.images?.map((_, index) => (

        <button
          key={index}
          onClick={() => setCurrentImage(index)}
          className={`w-3 h-3 rounded-full ${
            currentImage === index
              ? "bg-white"
              : "bg-white/50"
          }`}
        />

      ))}

    </div>

  </div>

</div>

      {/* ===== Amenities ===== */}
<div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">

  {/* TITLE */}
  <div className="flex items-center justify-between mb-8">

    <div>
      <p className="text-sm font-semibold tracking-widest uppercase text-[#8458b3]">
        Premium Features
      </p>

      <h2 className="text-3xl font-bold text-gray-800 mt-1">
        Hotel Amenities
      </h2>
    </div>

    <div className="hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8458b3] to-purple-500 items-center justify-center shadow-lg">
      <CheckCircle className="w-7 h-7 text-white" />
    </div>

  </div>

  {/* AMENITIES GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

    {normalizeAmenities(hotel.amenities).map((item, index) => {

      const Icon = getAmenityIcon(item);

      return (

        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >

          {/* GLOW EFFECT */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition" />

          <div className="relative flex items-center gap-4">

            {/* ICON */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8458b3] to-purple-500 flex items-center justify-center shadow-lg">

              <Icon className="w-6 h-6 text-white" />

            </div>

            {/* TEXT */}
            <div>

              <p className="text-lg font-semibold text-gray-800">
                {item}
              </p>

              <p className="text-sm text-gray-500">
                Included with your stay
              </p>

            </div>

          </div>

        </div>

      );
    })}

  </div>

</div>


      {/* ===== Rooms Section ===== */}
<div className="bg-white rounded-3xl shadow-xl p-8 mb-10 border border-gray-100">

 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

  {/* LEFT */}
  <div>

    <p className="text-sm font-semibold uppercase tracking-widest text-[#8458b3]">
      Accommodation
    </p>

    <h2 className="text-3xl font-bold text-gray-800 mt-1">
      Rooms in this Hotel
    </h2>

  </div>

  {/* RIGHT */}
  <div className="flex flex-wrap items-center gap-4">

    {/* ROOM COUNT */}
    <div className="flex items-center gap-3 bg-purple-50 px-5 py-3 rounded-2xl border border-purple-100">

      <BedDouble className="w-6 h-6 text-[#8458b3]" />

      <span className="font-semibold text-[#8458b3]">
        {rooms.length} Rooms
      </span>

    </div>

    {/* ADD ROOM BUTTON */}
    <button
      onClick={() =>
        navigate(`/admin/hotel/${id}/add-room`)
      }
      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8458b3] to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      + Add Room
    </button>

  </div>

</div>

  {rooms.length > 0 ? (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {rooms.map((room) => (

        <div
          key={room._id}
          className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >

          {/* ROOM IMAGE */}
          <div className="relative overflow-hidden">

            <img
              src={`http://localhost:4000${room.images?.[0]}`}
              alt={room.roomType}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* STATUS BADGE */}
            <div
              className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                room.isAvailable
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {room.isAvailable
                ? "Available"
                : "Unavailable"}
            </div>

          </div>

          {/* ROOM CONTENT */}
          <div className="p-6">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="text-2xl font-bold text-gray-800">
                  {room.roomType}
                </h3>

                <p className="text-gray-500 mt-1">
                  Luxury stay experience
                </p>

              </div>

              <div className="text-right">

                <p className="text-sm text-gray-500">
                  Per Night
                </p>

                <h3 className="text-3xl font-bold text-green-600">
                  ₹{room.pricePerNight.toLocaleString()}
                </h3>

              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3 mt-6">

              {/* VIEW */}
              <Link
                to={`/admin/room/${room._id}`}
                className="flex-1 text-center px-4 py-3 rounded-2xl bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
              >
                View
              </Link>

              {/* EDIT */}
              <Link
                to={`/admin/edit-room/${room._id}`}
                className="flex-1 text-center px-4 py-3 rounded-2xl bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
              >
                Edit
              </Link>

              {/* DELETE */}
              <button
                onClick={() => deleteRoom(room._id)}
                className="flex-1 px-4 py-3 rounded-2xl bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  ) : (

    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-300">

      <BedDouble className="w-14 h-14 text-gray-400 mb-4" />

      <h3 className="text-xl font-semibold text-gray-700">
        No Rooms Added Yet
      </h3>

      <p className="text-gray-500 mt-2">
        Start by adding your first room.
      </p>

    </div>

  )}

</div>
      </div>
    </div>
  );
};

export default AdminHotelDetails;