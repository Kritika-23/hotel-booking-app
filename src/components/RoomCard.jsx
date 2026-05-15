import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { Star, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const RoomCard = ({ room }) => {
  const { navigate } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const [index, setIndex] = useState(0);

  const images =
    room?.images?.length > 0
      ? room.images.map((img) => `http://localhost:4000${img}`)
      : ["/placeholder.jpg"];

  const nextImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative max-w-sm rounded-3xl overflow-hidden bg-white shadow-xl">

        {/* IMAGE CAROUSEL */}
        <div className="relative h-56 w-full overflow-hidden">

          <img
            src={images[index]}
            alt="room"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* LEFT BUTTON */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2
              bg-white/80 p-1 rounded-full shadow hover:bg-white transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* RIGHT BUTTON */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2
              bg-white/80 p-1 rounded-full shadow hover:bg-white transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* HEART */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow"
          >
            <Heart
              className={`w-4 h-4 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-2">

          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-gray-800">
              {room.roomType}
            </h1>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">
                {room.hotel?.rating || "4.5"}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {room.description}
          </p>

          <div className="flex justify-between items-center mt-2">
            <p className="text-green-600 font-semibold">
              ₹{room.pricePerNight}/night
            </p>

            <button
              onClick={() => {
                navigate(`/room/${room._id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm"
            >
              View
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;