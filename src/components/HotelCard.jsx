

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { normalizeAmenities } from "../utils/amenities";

const HotelCard = ({
  item,
  index,
  selectedHotel,
  setSelectedHotel,
}) => {
  return (
    <Link to={`/hotel/${item._id}`}>
      <motion.div
        onClick={() => setSelectedHotel?.(item)}
        className={`group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer mb-6 ${
          selectedHotel?._id === item._id
            ? "border-[#8458b3]"
            : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.05,
        }}
        whileHover={{ y: -4 }}
      >

        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={`http://localhost:4000${item.images?.[0]}`}
            alt={item.hotelName}
            className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
          />

          {/* PRICE */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <p className="text-sm font-semibold text-green-600">
              ₹{item.startingPrice}
              <span className="text-xs text-gray-500">
                {" "}
                /night
              </span>
            </p>
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-5">

          {/* TITLE */}
          <div className="flex justify-between items-start gap-3">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {item.hotelName}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {item.city}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">

              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />

              <span className="text-sm font-medium">
                {item.rating}
              </span>

            </div>

          </div>

          {/* ADDRESS */}
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {item.hotelAddress}
          </p>

          {/* AMENITIES */}
          <div className="flex flex-wrap gap-2 mt-4">

            {normalizeAmenities(item.amenities)
              .slice(0, 3)
              .map((amenity, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-[#f5f3ff] text-[#8458b3] text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}

          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-white/70 backdrop-blur-md border border-gray-200 text-gray-900 py-3 rounded-2xl font-medium hover:bg-[#8458b3] hover:text-white transition-all duration-300">
            View Details
          </button>

        </div>

      </motion.div>
    </Link>
  );
};

export default HotelCard;