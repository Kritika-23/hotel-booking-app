import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [hotels, setHotels] = useState([]);
  const { search } = useLocation(); // gets ?query=goa
  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    if (!query) return;
    const fetchHotels = async () => {
      try {
        const res = await fetch(`/api/hotels/search?query=${query}`);
        const data = await res.json();
        setHotels(data.hotels || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHotels();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for “{query}”
      </h2>

      {hotels.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
            <img
  src={`http://localhost:4000${hotel.images[0]}`}
  alt={hotel.hotelName}
  className="h-48 w-full object-cover"
/>
              <div className="p-4">
                <h3 className="font-bold text-lg">{hotel.hotelName}</h3>
                <p className="text-gray-600">{hotel.hotelAddress}</p>
                <p className="text-[#8458B3] mt-1">₹{hotel.price}/night</p>
                <p className="text-yellow-500 mt-1">⭐ {hotel.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
