import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const SearchPage = () => {

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

//  return (
//   <div className="space-y-8">

//     {/* HEADER */}
//     <div className="bg-gradient-to-r from-[#8458B3] to-[#6f45a1] rounded-3xl p-8 text-white shadow-lg">

//       <p className="uppercase tracking-widest text-sm text-white/70 mb-2">
//         Admin Search
//       </p>

//       <h1 className="text-4xl font-bold">
//         Search Results
//       </h1>

//       <p className="mt-3 text-white/80 text-lg">
//         Showing all matches for
//         <span className="font-semibold text-white">
//           {" "}“{query}”
//         </span>
//       </p>

//     </div>

//     {/* HOTELS */}
//     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

//       <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Hotels
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Matching hotel listings
//           </p>
//         </div>

//         <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-1 rounded-full text-sm font-semibold">
//           {results.hotels?.length || 0} Results
//         </div>

//       </div>

//       <div className="p-6 space-y-5">

//         {results.hotels?.length === 0 ? (

//           <div className="text-center py-12 text-gray-400">
//             No hotels found
//           </div>

//         ) : (

//           results.hotels.map((hotel) => (

//             <div
//               key={hotel._id}
//               className="group flex flex-col md:flex-row gap-5 border border-gray-100 hover:border-[#8458B3]/30 hover:shadow-lg transition-all duration-300 rounded-2xl p-4"
//             >

//               <img
//                 src={`http://localhost:4000${hotel.images?.[0]}`}
//                 alt={hotel.hotelName}
//                 className="w-full md:w-52 h-44 rounded-2xl object-cover"
//               />

//               <div className="flex-1 flex flex-col justify-between">

//                 <div>

//                   <div className="flex items-start justify-between">

//                     <div>

//                       <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#8458B3] transition">
//                         {hotel.hotelName}
//                       </h3>

//                       <p className="text-gray-500 mt-2 text-sm">
//                         {hotel.hotelAddress}
//                       </p>

//                     </div>

//                     <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
//                       ⭐ {hotel.rating}
//                     </div>

//                   </div>

//                 </div>

//                 <div className="flex items-center justify-between mt-5">

//                   <div className="flex gap-2 flex-wrap">

//                     <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                       Premium Stay
//                     </span>

//                     <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                       Free WiFi
//                     </span>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-gray-400 text-sm">
//                       Starting from
//                     </p>

//                     <h2 className="text-2xl font-bold text-[#8458B3]">
//                       ₹{hotel.price}
//                     </h2>

//                   </div>

//                 </div>

//               </div>

//             </div>

//           ))

//         )}

//       </div>

//     </div>

//     {/* ROOMS */}
//     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

//       <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Rooms
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Available room matches
//           </p>
//         </div>

//         <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-1 rounded-full text-sm font-semibold">
//           {results.rooms?.length || 0} Results
//         </div>

//       </div>

//       <div className="p-6 space-y-4">

//         {results.rooms?.length === 0 ? (

//           <div className="text-center py-12 text-gray-400">
//             No rooms found
//           </div>

//         ) : (

//           results.rooms.map((room) => (

//             <div
//               key={room._id}
//               className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:shadow-md transition"
//             >

//               <div>

//                 <h3 className="font-bold text-lg text-gray-800">
//                   {room.roomType}
//                 </h3>

//                 <p className="text-gray-500 text-sm mt-1">
//                   Capacity: {room.capacity} Guests
//                 </p>

//               </div>

//               <div className="text-right">

//                 <p className="text-gray-400 text-sm">
//                   Per Night
//                 </p>

//                 <h2 className="text-xl font-bold text-[#8458B3]">
//                   ₹{room.pricePerNight}
//                 </h2>

//               </div>

//             </div>

//           ))

//         )}

//       </div>

//     </div>

//     {/* USERS */}
//     <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

//       <div className="flex items-center justify-between px-6 py-5 border-b bg-gray-50">

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Users
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             Registered users
//           </p>
//         </div>

//         <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-1 rounded-full text-sm font-semibold">
//           {results.users?.length || 0} Results
//         </div>

//       </div>

//       <div className="p-6 space-y-4">

//         {results.users?.length === 0 ? (

//           <div className="text-center py-12 text-gray-400">
//             No users found
//           </div>

//         ) : (

//           results.users.map((user) => (

//             <div
//               key={user._id}
//               className="flex items-center justify-between border border-gray-100 hover:shadow-md transition rounded-2xl p-5"
//             >

//               <div className="flex items-center gap-4">

//                 <div className="w-14 h-14 rounded-full bg-[#8458B3]/10 flex items-center justify-center text-[#8458B3] font-bold text-lg">
//                   {user.name?.charAt(0)}
//                 </div>

//                 <div>

//                   <h3 className="font-bold text-lg text-gray-800">
//                     {user.name}
//                   </h3>

//                   <p className="text-gray-500 text-sm">
//                     {user.email}
//                   </p>

//                 </div>

//               </div>

//               <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
//                 {user.role || "User"}
//               </div>

//             </div>

//           ))

//         )}

//       </div>

//     </div>

//   </div>
// );
return (
  <div className="space-y-10">

    {/* HEADER */}
    <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#8458B3] via-[#9b6dd1] to-[#FF4D6D] p-8 shadow-2xl">

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

      {results.hotels?.length === 0 ? (

        <div className="py-12 text-center">
          <p className="text-gray-400 text-lg">
            No hotels found
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {results.hotels.map((hotel) => (

            <div
              key={hotel._id}
              className="group bg-white/60 border border-white/50 rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="relative overflow-hidden">

                <img
                  src={`http://localhost:4000${hotel.images?.[0]}`}
                  alt={hotel.hotelName}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-bold text-yellow-600 shadow">
                  ⭐ {hotel.rating}
                </div>

              </div>

              <div className="p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {hotel.hotelName}
                    </h3>

                    <p className="text-gray-500 mt-1 text-sm">
                      {hotel.hotelAddress}
                    </p>
                  </div>

                  <div className="bg-[#8458B3]/10 text-[#8458B3] px-4 py-2 rounded-xl font-bold">
                    ₹{hotel.price}
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