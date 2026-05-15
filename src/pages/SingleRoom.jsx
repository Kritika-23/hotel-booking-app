import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Button from "../components/Button";
import {
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Phone,
  User,
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  Utensils,
  Mountain,
  Eye,
  Building,
  TreePine,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "@clerk/clerk-react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


// ✅ Helper: Ensure checkout date is at least one day after check-in
const getMinCheckoutDate = (checkInDateString) => {
  if (!checkInDateString) return new Date().toISOString().split("T")[0];
  const date = new Date(checkInDateString);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
};

const SingleRoom = () => {
  const { getToken } = useAuth();
  const { axios, navigate, roomData } = useContext(AppContext);
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    persons: 1,
  });
  const [isAvailable, setIsAvailable] = useState(null);
  const [fullRoom, setFullRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch single room details (from context or API)
  useEffect(() => {
    const fetchRoomDetails = async () => {
      setIsLoading(true);

      try {
        // 1️⃣ Try to find the room from context (already fetched list)
        const foundInContext = roomData?.find(
          (r) => String(r._id) === String(id),
        );

        if (foundInContext && foundInContext.hotel) {
          setFullRoom(foundInContext);
          setIsLoading(false);
          return;
        }


        
        // 2️⃣ Fetch full room data from backend if not found
        const { data } = await axios.get(
          `http://localhost:4000/api/rooms/single/${id}`,
        );

        if (data.success && data.room) {
          setFullRoom(data.room);
        } else {
          toast.error(data.message || "Room details not found.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        const errorMessage =
          error.response?.data?.message || "Room not found or server error.";
        toast.error(errorMessage);
        setFullRoom(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id, roomData, axios]);

  const room = fullRoom;

  // ✅ Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading room details...</p>
      </div>
    );
  }

  // ✅ Room Not Found UI
  if (!room || !room.hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Room details not found </p>
      </div>
    );
  }

  // ✅ Input change handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: name === "persons" ? Number(value) : value,
    });
  };

  // ✅ Amenity Icon Mapping
  const getAmenityIcon = (amenity) => {
    const iconMap = {
      "Ocean View": Eye,
      "Mountain View": Mountain,
      "City View": Building,
      "Garden View": TreePine,
      Balcony: Coffee,
      "Mini Bar": Utensils,
      "Free WiFi": Wifi,
      "Premium WiFi": Wifi,
      "Work Desk": Building,
      "Concierge Service": User,
      "Breakfast Included": Coffee,
      Parking: Car,
      "Smart TV": Tv,
      "Spa Access": Bath,
      "Pool Access": Bath,
      Kitchen: Utensils,
      "Living Area": Building,
      "Private Terrace": Building,
      "Butler Service": User,
      Jacuzzi: Bath,
      "Panoramic View": Eye,
    };
    return iconMap[amenity] || CheckCircle;
  };

  console.log("Room amenities:", room.amenities);
  console.log("Hotel amenities:", room.hotel?.amenities);

  console.log("room images:", room.images);

  // ✅ Availability Check
  const checkRoomAvailability = async () => {
    try {
      if (!bookingData.checkIn || !bookingData.checkOut) {
        toast.error("Please select check-in and check-out dates");
        return;
      }

      if (bookingData.checkIn >= bookingData.checkOut) {
        toast.error("Check-in date should be before check-out date");
        return;
      }

      const { data } = await axios.post("/api/bookings/check-availability", {
        room: room._id,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
      });

      if (data.success) {
        setIsAvailable(data.isAvailable);
        toast[data.isAvailable ? "success" : "error"](
          data.isAvailable ? "Room is available" : "Room is not available",
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
// booking handler
const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!isAvailable) return checkRoomAvailability();

  try {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      toast.error("Please select valid check-in and check-out dates");
      return;
    }

    const token = await getToken({ template: "backend" });

    if (!token) {
      toast.error("You are not logged in");
      return;
    }

    const { data } = await axios.post(
      "/api/bookings/book",
      {
        room: room._id,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
        persons: bookingData.persons,
        paymentMethod: "Pay At Hotel",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success("Room booked successfully!");
      navigate("/my-bookings");
      window.scrollTo(0, 0);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Booking failed");
  }
};

  // ✅ Main Render
  return (
    <div className="p-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 mb-4 py-8">

          {/* Back Button */}
          
             <Button
              onClick={() => navigate(-1)}
              className="absolute top-32 left-4 bg-[#8458b3] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-[#6f45a9] transition"
            >
              ← Back
            </ Button>
        {/* ===== Header ===== */}
   
<div className="bg-gradient-to-r from-white via-purple-50 to-white rounded-3xl shadow-xl p-8 mt-4 mb-6 border border-purple-100">
  
  <div className="flex flex-col lg:flex-row justify-between items-start gap-8">

    {/* Left */}
    <div className="flex-1">
      
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        {room.roomType}
      </h1>

      <div className="flex items-center gap-2 text-gray-600 mt-3">
        <MapPin className="w-5 h-5 text-purple-600" />
        <span className="text-sm">{room.hotel?.hotelAddress}</span>
      </div>

       {/* Rating + Status */}
      <div className="flex flex-wrap items-center gap-3 mt-5">

        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">
            {room.hotel?.rating}
          </span>
        </div>

        {isAvailable !== null ? (
          <div
            className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm transition ${
              isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isAvailable ? (
              <>
                <CheckCircle className="w-4 h-4" /> Available
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" /> Not Available
              </>
            )}
          </div>
        ) : (
          <div className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            Check Availability
          </div>
        )}
      </div>
    </div>

             {/* Right */}
    <div className="text-right bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

      <div className="text-3xl font-bold text-purple-700">
        ₹{room.pricePerNight}
        <span className="text-gray-500 text-base font-medium"> /night</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-gray-600 mt-3 text-sm">
        <User className="w-4 h-4" />
        <span>{room.hotel?.owner?.name}</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-gray-600 mt-2 text-sm">
        <Phone className="w-4 h-4" />
        <span>+5373882</span>
      </div>

      {/* Modern CTA hint */}
      <div className="mt-4 text-xs text-gray-500">
        Secure booking • Instant confirmation
      </div>
    </div>

  </div>
</div>

        {/* ===== Image Gallery ===== */}
      
<div className="bg-gradient-to-br from-white via-purple-50 to-white rounded-3xl shadow-xl p-6 mb-10 border border-purple-100">

  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Room Gallery
  </h2>

  <div className="grid lg:grid-cols-3 gap-6">

    {/* Main Image */}
{/* Airbnb Style Image Carousel */}
<div className="lg:col-span-2">
  <div className="relative rounded-2xl overflow-hidden shadow-xl">

    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      effect="fade"
      speed={800}
      loop
      className="rounded-2xl"
    >
      {room.images?.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={`http://localhost:4000${img}`}
            className="w-full h-[500px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>

  </div>
</div>
    
   {/* Thumbnails */}
    
<div className="flex flex-col gap-3">

  {/* 👇 Gallery heading HERE */}
  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
    Gallery Preview
  </h3>

  {/* Scrollable strip */}
  <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-100">

    {room.images?.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:4000${img}`}
        onClick={() => setSelectedImage(index)}
        className={`w-48 h-24 object-cover rounded-xl cursor-pointer border-2 transition
          ${
            selectedImage === index
              ? "border-purple-600 scale-105 shadow-lg"
              : "border-transparent opacity-70 hover:opacity-100"
          }`}
      />
    ))}

  </div>
</div>
  </div>
</div>


        {/* ===== Details + Booking ===== */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
           <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    About This Room
  </h2>
  <p className="text-gray-600 leading-relaxed">
    {room.description}
  </p>
</div>

            {/* Room Amenities */}
           <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Room Amenities
  </h2>

  <div className="flex flex-wrap gap-3">

    {room.amenities &&
      room.amenities.split(",").map((amenity, index) => {
        const Icon = getAmenityIcon(amenity.trim());
        return (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition"
          >
            <Icon className="w-4 h-4" />
            {amenity.trim()}
          </div>
        );
      })}
  </div>
</div>

            {/* Hotel Amenities */}
           <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">

  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Hotel Amenities
  </h2>

  <div className="flex flex-wrap gap-3">

    {room.hotel?.amenities?.split(",").map((amenity, index) => {
      const Icon = getAmenityIcon(amenity.trim());
      return (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition"
        >
          <Icon className="w-4 h-4" />
          {amenity.trim()}
        </div>
      );
    })}

  </div>
</div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
           
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Book This Room
              </h2>
              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div>
                  <label
                    htmlFor="checkIn"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingData.checkIn}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c72a9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkOut"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    min={getMinCheckoutDate(bookingData.checkIn)}
                    value={bookingData.checkOut}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8c72a9] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="persons"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="persons"
                    name="persons"
                    max="2"
                    min ="1"
                    value={bookingData.persons}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8458b3] focus:border-transparent"
                  />
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price per Night</span>
                    <span className="text-xl font-bold">
                      ₹{room.pricePerNight}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-[1.02] transition">
  {isAvailable ? "Book Now" : "Check Availability"}
</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default SingleRoom;
