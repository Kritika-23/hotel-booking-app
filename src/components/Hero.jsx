import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets, cities, homePageData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import ExclusiveOffers from "./ExclusiveOffers";
import Button from "../components/Button";

const Hero = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    // ✅ Send query in the 'destination' param to match backend
    const query = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests,
    }).toString();

    navigate(`/hotels?${query}`);
  };

  return (
    <>
      <main className="flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 pb-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="flex flex-col items-center md:items-start"
        >
          <div className="mt-6">
            <h1 className="text-[#2c0850] font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-left">
              Forget Busy Work,
              <br />
              Start Next vacation
            </h1>

            <div className="mt-4 inline-block bg-[#8458b3] bg-opacity-90 text-white px-5 py-2 rounded-xl font-semibold shadow-lg text-sm sm:text-base">
              🌟 Exclusive Offers! Book Now & Save Up to 20% 🌟
            </div>

            <p className="text-[#AA60C8] mt-4 text-sm sm:text-base leading-relaxed text-left max-w-md">
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </p>

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <Button onClick={() => navigate("/videos")}>Show More</Button>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-16 mt-8">
            {homePageData.map((item, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center flex-col"
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
                <div className="flex items-center gap-1 mt-4">
                  <p className="text-[#AA60C8]">{item.value}</p>
                  <p className="text-[#AA60C8]">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], x: [-10, 10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img src={assets.hero_img} alt="" />
        </motion.div>
      </main>

      {/* Search Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-4xl w-full mx-auto bg-[#d4c3f2] text-gray-800 rounded-2xl px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto"
      >
        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calendar_icon} alt="" className="w-4 h-4" />
            <label htmlFor="destinationInput">Select Location </label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            name="destination"
            value={searchData.destination}
            onChange={handleSearchChange}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calendar_icon} alt="" className="w-4 h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            name="checkIn"
            value={searchData.checkIn}
            onChange={handleSearchChange}
            min={new Date().toISOString().split("T")[0]} // 🔒 Prevent past dates
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calendar_icon} alt="" className="w-4 h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            name="checkOut"
            value={searchData.checkOut}
            onChange={handleSearchChange}
            min={searchData.checkIn || new Date().toISOString().split("T")[0]} // 🔒 Must be after check-in
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Persons</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            name="guests"
            value={searchData.guests}
            onChange={handleSearchChange}
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="1"
          />
        </div>

        {/* <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-1 rounded-md bg-[#8458B3] py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1"
        >
          <span>Search</span>
        </button> */}

        <Button text="Search">Search</Button>
      </form>
      <ExclusiveOffers />
    </>
  );
};

export default Hero;
