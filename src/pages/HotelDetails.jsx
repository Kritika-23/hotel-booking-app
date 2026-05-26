import { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, MapPin, Star } from "lucide-react";
import { AppContext } from "../context/AppContext"; 
import RoomCard from '../components/RoomCard'; 
import Button from "../components/Button";
import { normalizeAmenities } from "../utils/amenities";
import { getImageUrl } from "../utils/getImageUrl";
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
  ShieldCheck
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const getAmenityIcon = (amenity) => {
  const key = amenity.toLowerCase();

  if (key.includes("wifi")) return Wifi;

  if (key.includes("parking")) return Car;

  if (key.includes("restaurant")) return Utensils;

  if (key.includes("gym")) return Dumbbell;

  if (key.includes("tv")) return Tv;

  if (key.includes("coffee")) return Coffee;

  if (key.includes("ac") || key.includes("air"))
    return Snowflake;

  if (key.includes("bath"))
    return Bath;

  if (key.includes("spa"))
    return Bath;

  if (key.includes("terrace"))
    return Building;

  if (key.includes("panoramic"))
    return Eye;

  if (key.includes("view"))
    return Eye;

  if (key.includes("pool") || key.includes("swimming"))
    return Waves;

  if (key.includes("security"))
    return ShieldCheck;

  return Wifi;
};
const HotelDetails = () => {
  const roomsRef = useRef(null);
  const { id } = useParams();
  const { navigate, axios } = useContext(AppContext); 
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState(false);
const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const fetchHotelAndRooms = async () => {
      try {
        const hotelRes = await axios.get(`/api/hotel/${id}`);
        console.log(hotelRes.data);

      
        setHotel(hotelRes.data.hotel);

        const roomRes = await axios.get(`/api/rooms/by-hotel/${id}`);
          

        if (roomRes.data.success) setRooms(roomRes.data.rooms);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelAndRooms();
  }, [id]);

  if (loading)
    return <p className="py-24 text-center text-xl text-[#8458b3]">Loading...</p>;
  if (!hotel)
    return <p className="py-24 text-center text-red-500">Hotel not found!</p>;




const prices = rooms
  ?.map((room) => {
    const price =
      room?.price || room?.rent || room?.pricePerNight;

    if (price == null) return null;

    const num = Number(String(price).replace(/[^0-9]/g, ""));

    return isNaN(num) ? null : num;
  })
  .filter((n) => typeof n === "number" && !isNaN(n));

const minPrice =
  prices && prices.length > 0 ? Math.min(...prices) : null;


return (
 <div className="pt-10 pb-16 max-w-6xl mx-auto">

   
<div className="bg-gradient-to-b from-purple-50 via-white to-purple-50 py-9">
<div className="max-w-6xl mx-auto px-6 mb-10">



  <div className="relative rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] group">

    {/* Background blur layer */}
    <div
      className="absolute inset-0 bg-cover bg-center blur-3xl scale-125"
      style={{
        backgroundImage: `url(${getImageUrl(hotel?.images?.[0])})`
        
      }}
    />

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/40" />

    {/* Content */}
    <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 items-center">

  


<div className="flex gap-4 overflow-x-auto">
 <div className="rounded-2xl overflow-hidden shadow-lg">
<Swiper
  modules={[Navigation, Pagination, Autoplay, EffectFade]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  effect="fade"
  fadeEffect={{ crossFade: true }}
  loop={true}
  speed={800}
>
  
    {hotel?.images?.map((img, index) => (
      <SwiperSlide key={index}>
        <img
          src={getImageUrl(img)}
          className="w-full h-[450px] object-cover"
          onClick={() => {
    setActiveIndex(index);
    setOpenGallery(true);
  }}
        />
      </SwiperSlide>
    ))}
  </Swiper>

</div>
</div>

     {/* Glass Booking Card */}
<div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:scale-[1.02] transition-all duration-300">

  {/* Title Section */}
  <h1 className="text-3xl font-bold tracking-tight">
    {hotel?.hotelName}
  </h1>

  <p className="text-gray-200 mt-1 flex items-center gap-2">
    📍 <span>{hotel?.city}</span>
  </p>

  {/* Divider */}
  <div className="h-px bg-white/10 my-5" />

  {/* Info Grid */}
  <div className="space-y-4 text-sm">

    <div className="flex justify-between items-center">
      <span className="text-gray-300">⭐ Rating</span>
      <span className="font-medium text-white bg-white/10 px-3 py-1 rounded-lg">
        {hotel?.rating}/5
      </span>
    </div>

  
    <div className="flex justify-between items-start gap-4">
      <span className="text-gray-300">📍 Address</span>
      <span className="text-right text-gray-100 leading-snug">
        {hotel?.hotelAddress}
      </span>
    </div>
<div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
  <p className="text-sm font-semibold text-green-600">
    ₹{minPrice ? minPrice : "N/A"}
    <span className="text-xs text-gray-500"> /night</span>
  </p>
</div>
  </div>

  {/* Button */}
  <button
    onClick={() => {
      roomsRef.current?.scrollIntoView({ behavior: "smooth" });
    }}
    className="mt-6 w-full bg-white text-black font-semibold py-3 rounded-2xl hover:bg-gray-200 active:scale-95 transition"
  >
    Choose Your Room
  </button>

</div>
    </div>
  </div>
</div>
</div>
{/*===== Hotel Info Card ===== */}
  <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-3 gap-6 px-4">

  {[
    {
      icon: "📍",
      label: "Address",
      value: hotel.hotelAddress,
    },

    {
      icon: "⭐",
      label: "Rating",
      value: `${hotel.rating}/5`,
    },

 {
  icon: "💰",
  label: "Starting Price",
  value: minPrice ? `₹${minPrice}/night` : "Not Available",
}

  ].map((item, i) => (

    <div
      key={i}
      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition border border-gray-100"
    >

      <div className="text-2xl">
        {item.icon}
      </div>

      <h3 className="text-gray-500 text-sm mt-2">
        {item.label}
      </h3>

      <p className="text-lg font-semibold text-gray-800 mt-1">
        {item.value}
      </p>

    </div>

  ))}

</div>
    {/* ===== Amenities Section ===== */}
    <div className="bg-white rounded-3xl shadow-xl p-10 mt-14 border border-purple-100 
                    hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-bold text-[#2c0850] mb-6">Hotel Amenities</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
 {normalizeAmenities(hotel.amenities).length > 0 ? (
  normalizeAmenities(hotel.amenities).map((item, index) => {
    const Icon = getAmenityIcon(item);

    return (
      <div
        key={index}
        className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition-all duration-300"
      >
        <Icon className="w-5 h-5 text-[#8458b3]" />
        <span className="text-gray-700 font-medium">{item}</span>
      </div>
    );
  })
) : (
  <p className="text-gray-600">No amenities listed.</p>
)}

      </div>
    </div>

    {/* ===== Rooms Section ===== */}
   <div className="mt-14 mb-20" ref={roomsRef}>
      <h2 className="text-4xl font-bold text-[#2c0850] mb-8">Available Rooms</h2>

      {rooms.length === 0 ? (
        <p className="text-gray-600">No rooms available for this hotel yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>

{openGallery && (
  <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

    {/* CLOSE BUTTON */}
    <button
      onClick={() => setOpenGallery(false)}
      className="absolute top-5 right-5 text-white text-3xl"
    >
      ✕
    </button>

    {/* LEFT ARROW */}
    <button
      onClick={() =>
        setActiveIndex((prev) =>
          prev === 0 ? hotel.images.length - 1 : prev - 1
        )
      }
      className="absolute left-5 text-white text-5xl"
    >
      ‹
    </button>

    {/* IMAGE */}
    <img
      src={getImageUrl(hotel.images[activeIndex])}
      className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
    />

    {/* RIGHT ARROW */}
    <button
      onClick={() =>
        setActiveIndex((prev) =>
          prev === hotel.images.length - 1 ? 0 : prev + 1
        )
      }
      className="absolute right-5 text-white text-5xl"
    >
      ›
    </button>

    {/* THUMBNAILS */}
    <div className="absolute bottom-5 flex gap-2 overflow-x-auto px-4">
      {hotel?.images?.map((img, i) => (
        <img
          key={i}
          src={getImageUrl(img)}
          onClick={() => setActiveIndex(i)}
          className={`w-20 h-14 object-cover rounded-md cursor-pointer border-2 ${
            i === activeIndex ? "border-white" : "border-transparent"
          }`}
        />
      ))}
    </div>

  </div>
)}

  </div>
);

};

export default HotelDetails;
