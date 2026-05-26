import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { API_BASE_URL } from "../utils/apiBase";

const SearchResults = () => {
  const [hotels, setHotels] = useState([]);
  const [roomPrices, setRoomPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const destination = params.get("destination");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");

  useEffect(() => {

    const fetchHotels = async () => {

      setLoading(true);

      try {

        const res = await fetch(
          `${API_BASE_URL}/api/hotel/search?destination=${destination}`
        );

        const data = await res.json();

        if (data.success) {

          setHotels(data.hotels);

          const prices = {};

          await Promise.all(

            data.hotels.map(async (hotel) => {

              try {

                const roomRes = await fetch(
                  `${API_BASE_URL}/api/rooms/by-hotel/${hotel._id}`
                );

                const roomData = await roomRes.json();

                if (
                  roomData.success &&
                  roomData.rooms.length > 0
                ) {

                  prices[hotel._id] = Math.min(
                    ...roomData.rooms.map(
                      (r) => r.pricePerNight
                    )
                  );

                } else {

                  prices[hotel._id] = null;

                }

              } catch (err) {

                prices[hotel._id] = null;

              }

            })

          );

          setRoomPrices(prices);

        }

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    if (destination) {
      fetchHotels();
    }

  }, [destination]);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-[#8458b3]">
        Loading Hotels...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-10">

        <p className="text-sm text-[#8458b3] font-medium uppercase">
          Search Results
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mt-2">
          Hotels in {destination}
        </h1>

        <div className="flex flex-wrap gap-3 mt-5">

          <div className="bg-white border px-4 py-2 rounded-full text-sm">
            📅 {checkIn}
          </div>

          <div className="bg-white border px-4 py-2 rounded-full text-sm">
            📅 {checkOut}
          </div>

          <div className="bg-white border px-4 py-2 rounded-full text-sm">
            👤 {guests} Guests
          </div>

          <div className="bg-[#8458b3] text-white px-4 py-2 rounded-full text-sm">
            {hotels.length} Hotels Found
          </div>

        </div>

      </div>

      {/* HOTELS LIST */}
      <div className="max-w-7xl mx-auto px-6">

        {hotels.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {hotels.map((hotel, index) => (

              <HotelCard
                key={hotel._id}
                item={{
                  ...hotel,
                  startingPrice: roomPrices[hotel._id],
                }}
                index={index}
              />

            ))}

          </div>

        ) : (

          <div className="text-center py-24">

            <h2 className="text-4xl font-bold text-gray-800">
              No Hotels Found
            </h2>

            <p className="text-gray-500 mt-4">
              Try changing your destination or filters.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default SearchResults;
