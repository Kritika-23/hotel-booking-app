import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExclusiveOffers from "./ExclusiveOffers";

const HomePage = () => {

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(
      `/search?destination=${searchData.destination}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}&guests=${searchData.guests}`
    );
  };

  return (
    <div className="bg-[#f8f7fc]  text-gray-900 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-8 px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <div className="inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm rounded-full px-5 py-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-sm text-gray-600">
                Trusted by 10,000+ travelers worldwide
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your Perfect <br />

              <span className="text-[#8458b3]">
                Luxury Stay
              </span>

            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
              Discover premium hotels, resorts, and villas carefully selected
              for unforgettable luxury experiences.
            </p>

            <div className="flex gap-4 mt-8">

              <button
                onClick={() => navigate("/hotels")}
                className="px-7 py-3 bg-[#8458b3] text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                Explore Hotels
              </button>

              <button
                onClick={() => navigate("/about")}
                className="px-7 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition"
              >
                Learn More
              </button>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >

            {/* MAIN IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="hotel"
              className="w-full max-w-md h-[500px] object-cover rounded-[35px] shadow-2xl"
            />

            {/* SMALL FLOATING IMAGE */}
            <motion.img
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="luxury"
              className="hidden lg:block absolute -right-10 top-10 w-40 h-52 object-cover rounded-[28px] border-4 border-white shadow-xl"
            />

            {/* FLOATING CARD */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-xl p-5 border border-gray-100">

              <div className="flex items-center gap-4">

                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                  alt="mini"
                  className="w-16 h-16 rounded-2xl object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    Luxury Resort
                  </h3>

                  <p className="text-sm text-gray-500">
                    5-Star Experience
                  </p>

                  <div className="flex text-yellow-500 mt-1">
                    ★★★★★
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

        {/* SEARCH BAR */}
        <motion.form
          onSubmit={handleSearchSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 bg-white rounded-[30px] shadow-2xl border border-gray-100 p-5 grid grid-cols-1 md:grid-cols-5 gap-5"
        >

          {/* DESTINATION */}
          <div>

            <label className="text-sm text-gray-500">
              Destination
            </label>

            <input
              type="text"
              name="destination"
              value={searchData.destination}
              onChange={handleSearchChange}
              placeholder="Where are you going?"
              required
              className="mt-2 w-full bg-[#f7f7fb] rounded-2xl px-4 py-3 outline-none"
            />

          </div>

          {/* CHECK IN */}
          <div>

            <label className="text-sm text-gray-500">
              Check In
            </label>

            <input
              type="date"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleSearchChange}
              className="mt-2 w-full bg-[#f7f7fb] rounded-2xl px-4 py-3 outline-none"
            />

          </div>

          {/* CHECK OUT */}
          <div>

            <label className="text-sm text-gray-500">
              Check Out
            </label>

            <input
              type="date"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleSearchChange}
              className="mt-2 w-full bg-[#f7f7fb] rounded-2xl px-4 py-3 outline-none"
            />

          </div>

          {/* GUESTS */}
          <div>

            <label className="text-sm text-gray-500">
              Guests
            </label>

            <input
              type="number"
              min="1"
              name="guests"
              value={searchData.guests}
              onChange={handleSearchChange}
              className="mt-2 w-full bg-[#f7f7fb] rounded-2xl px-4 py-3 outline-none"
            />

          </div>

          {/* BUTTON */}
          <div className="flex items-end">

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#8458b3] hover:bg-[#7345a5] text-white py-4 rounded-2xl transition-all duration-300"
            >

              <Search size={18} />

              Search

            </button>

          </div>

        </motion.form>

      </section>

     <ExclusiveOffers />
  </div>

  );
};

export default HomePage;