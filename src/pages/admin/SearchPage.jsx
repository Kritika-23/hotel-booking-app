import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";
const SearchPage = () => {

  const navigate = useNavigate();

  const { axios } = useContext(AppContext);

  const { search } = useLocation();

  const query = new URLSearchParams(search).get("query");

  const [results, setResults] = useState({
    hotels: [],
    rooms: [],
    users: [],
    bookings: [],
  });

  useEffect(() => {

    if (!query) return;

    const fetchSearch = async () => {

      try {

        const { data } = await axios.get(
          `/api/search/global?query=${query}`
        );

        setResults(data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchSearch();

  }, [query]);


return (
  <div className="space-y-10">

    {/* HEADER */}
    <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#9d6cc7] via-[#d7c1f0] to-[#9d6cc7] p-8 shadow-2xl">

      {/* BLUR CIRCLES */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-52 h-52 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-black text-white">
          Search Results
        </h1>

        <p className="text-white/80 mt-2 text-lg">
          Showing beautiful results for
          <span className="font-bold text-white"> "{query}"</span>
        </p>
      </div>
    </div>

   {/* HOTELS */}
<div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-[28px] p-6 shadow-xl">

  {/* SECTION HEADER */}
  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl font-bold text-gray-800">
        Hotels
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Premium hotel listings
      </p>

    </div>

    <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-2 rounded-full text-sm font-semibold">
      {results.hotels?.length || 0} Results
    </div>

  </div>

  {/* EMPTY STATE */}
  {results.hotels?.length === 0 ? (

    <div className="py-12 text-center">

      <p className="text-gray-400 text-lg">
        No hotels found
      </p>

    </div>

  ) : (

    /* HOTEL GRID */
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {results.hotels.map((hotel) => (

       <div
  key={hotel._id}
  onClick={() => navigate(`/admin/hotel/${hotel._id}`)}
  className="group cursor-pointer bg-white/70 border border-white/50 rounded-[28px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
>

          {/* IMAGE */}
          <div className="relative overflow-hidden">

            <img
              src={getImageUrl(hotel.images?.[0])}
              alt={hotel.hotelName}
              className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>

            {/* RATING */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-bold text-yellow-600 shadow">
              ⭐ {hotel.rating || "N/A"}
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-6">

            <div className="flex items-start justify-between gap-4">

              {/* LEFT */}
              <div>

                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#8458B3] transition">
                  {hotel.hotelName}
                </h3>

                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  {hotel.hotelAddress}
                </p>

              </div>

              {/* PRICE */}
              <div className="bg-gradient-to-r from-[#8458B3] to-purple-600 text-white px-4 py-3 rounded-2xl font-bold shadow-lg whitespace-nowrap">

                ₹
                {hotel.startingPrice
                  ? hotel.startingPrice.toLocaleString()
                  : "N/A"}

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

    {/* ROOMS */}
    <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-[28px] p-6 shadow-xl">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Rooms
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Available room listings
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {results.rooms?.length || 0} Results
        </div>

      </div>

      {results.rooms?.length === 0 ? (

        <div className="py-12 text-center">
          <p className="text-gray-400 text-lg">
            No rooms found
          </p>
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-5">

          {results.rooms.map((room) => (

            <div
              key={room._id}
              className="bg-white/60 border border-white/50 rounded-2xl p-5 hover:shadow-xl transition"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {room.roomType}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Capacity: {room.capacity} Guests
                  </p>

                </div>

                <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-2 rounded-xl font-bold">
                  ₹{room.pricePerNight}
                </div>

              </div>

            </div>

          ))}

        </div>

      )}
    </div>

    {/* USERS */}
    <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-[28px] p-6 shadow-xl">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Users
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Registered platform users
          </p>
        </div>

        <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
          {results.users?.length || 0} Results
        </div>

      </div>

      {results.users?.length === 0 ? (

        <div className="py-12 text-center">
          <p className="text-gray-400 text-lg">
            No users found
          </p>
        </div>

      ) : (

        <div className="space-y-4">

          {results.users.map((user) => (

            <div
              key={user._id}
              className="bg-white/60 border border-white/50 rounded-2xl p-5 hover:shadow-xl transition"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8458B3] to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {user.name?.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800 text-lg">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>

                  </div>

                </div>

                <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-2 rounded-full text-sm font-semibold">
                  {user.role || "User"}
                </div>

              </div>

            </div>

          ))}

        </div>

      )}
    </div>

  </div>
);
};

export default SearchPage;
