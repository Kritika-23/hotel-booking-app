import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import ExclusiveOffers from "../components/ExclusiveOffers";
import HotelCard from "../components/HotelCard";
const Hotels = () => {
  const { axios: axiosInstance } = useContext(AppContext);
  const location = useLocation();
  const searchQuery = location.search;
  const [loading, setLoading] = useState(true);
  const [searchedHotels, setSearchedHotels] = useState([]);
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const endpoint = searchQuery
        ? `/api/hotel/search${searchQuery}`
        : `/api/hotel/get-all`;

      const { data } = await axiosInstance.get(endpoint);

      if (data.success) {
        setSearchedHotels(data.hotels);
      } else {
        toast.error(data.message || "Failed to fetch hotels.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(
        error.response?.data?.message || "Error fetching hotel data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [searchQuery]);

  const hotelsToDisplay = searchedHotels;

  if (loading) {
    return (
      <div className="py-24 text-center text-xl text-[#8458b3]">
        Loading Hotels...
      </div>
    );
  }

  if (hotelsToDisplay.length === 0) {
    return (
      <div className="py-2  text-center">
        <h1 className="text-5xl font-bold text-[#2c0850] my-32 px-2">
          No Hotels Found
        </h1>

        <p className="text-xl text-gray-600">
          Try adjusting your search criteria.
        </p>

        <ExclusiveOffers />
      </div>
    );
  }

  return (
    <div className="pt-28 px-6">
        {/* HEADING */}
      <div className="text-center mb-14">

        <p className="text-xl font-medium text-[#8458b3] uppercase tracking-wide">
          Popular Hotels
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
          Explore Luxury Stays
        </h1>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  max-w-7xl mx-auto">
        {hotelsToDisplay.map((item, index) => (
          <HotelCard key={item._id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
