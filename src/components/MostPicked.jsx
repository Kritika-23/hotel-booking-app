import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";

const MostPicked = () => {

  const { hotelData } = useContext(AppContext);

  return (

    <div className="py-20 px-4 md:px-10">

      {/* HEADING */}
      <div className="text-center mb-14">

        <p className="text-xl font-medium text-[#8458b3] uppercase tracking-wide">
          Popular Hotels
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
          Explore Luxury Stays
        </h1>

      </div>

      {/* HOTELS */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {hotelData?.slice(0, 6).map((item, index) => (
          <HotelCard
            key={item._id}
            item={item}
            index={index}
          />
        ))}

      </div>

    </div>
  );
};

export default MostPicked;