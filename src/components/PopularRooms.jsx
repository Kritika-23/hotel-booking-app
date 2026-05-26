import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import RoomCard from "./RoomCard";

const PopularRooms = () => {
  const { roomData } = useContext(AppContext);

  return (
    <section className="py-20 bg-[#f8f7fc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-[#8458b3] font-semibold uppercase tracking-[4px] text-2xl">
            Luxury Rooms
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Popular Rooms
          </h1>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5 text-lg leading-relaxed">
            Discover elegant rooms designed for comfort, luxury, and unforgettable stays.
          </p>
        </div>

        {/* ROOMS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">

          {Array.isArray(roomData) &&
            roomData.map((room, index) => (
              <motion.div
                key={room._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}

        </div>

      </div>
    </section>
  );
};

export default PopularRooms;