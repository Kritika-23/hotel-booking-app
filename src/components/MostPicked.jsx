import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MostPicked = () => {
  const { hotelData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCardClick = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <div className="py-16">
      <h1 className="text-[#2c0850] text-3xl font-semibold text-center mx-auto">
        Most Picked Hotels
      </h1>
      <p className="text-[#AA60C8] text-sm text-center max-w-lg mx-auto">
        Explore our top-rated rooms, loved by guests for comfort and location.
      </p>

      {/* Centered container */}
      <div className="mt-20 max-w-5xl mx-auto px-12">
        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {hotelData && hotelData.length > 0 ? (
            hotelData.map((item, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => handleCardClick(item._id)} // ✅ Navigate on click
                className="relative group rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={`http://localhost:4000${item.images?.[0]}`}
                  alt={item.hotelName}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex flex-col justify-end text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                  <h1 className="text-lg font-medium">{item.hotelName}</h1>
                  <p className="text-sm">{item.hotelAddress}</p>
                  <h1 className="text-lg font-medium">₹{item.price}</h1>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No hotels available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MostPicked;
