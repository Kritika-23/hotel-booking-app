import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Star } from 'lucide-react';
import { useAuth } from "@clerk/clerk-react";
import { getImageUrl } from "../../utils/getImageUrl";
import {
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  Utensils,
  Mountain,
  Eye,
  Building,
  TreePine,
  User,
  CheckCircle,
} from "lucide-react";

const getAmenityIcon = (amenity) => {

  const key = amenity.toLowerCase();

  if (key.includes("wifi"))
    return Wifi;

  if (key.includes("parking"))
    return Car;

  if (
    key.includes("coffee") ||
    key.includes("breakfast")
  )
    return Coffee;

  if (key.includes("tv"))
    return Tv;

  if (
    key.includes("bath") ||
    key.includes("spa") ||
    key.includes("jacuzzi") ||
    key.includes("pool")
  )
    return Bath;

  if (
    key.includes("restaurant") ||
    key.includes("kitchen") ||
    key.includes("mini bar")
  )
    return Utensils;

  if (key.includes("mountain"))
    return Mountain;

  if (
    key.includes("view") ||
    key.includes("ocean") ||
    key.includes("panoramic")
  )
    return Eye;

  if (
    key.includes("building") ||
    key.includes("desk") ||
    key.includes("living") ||
    key.includes("terrace")
  )
    return Building;

  if (key.includes("garden"))
    return TreePine;

  if (
    key.includes("concierge") ||
    key.includes("butler")
  )
    return User;

  return CheckCircle;
};
const AllRooms = () => {
  const { getToken } = useAuth();
  const { navigate, axios } = useContext(AppContext);
  const [roomData, setRoomData] = useState([]);

  const fetchOwnerRooms = async () => {
    try {
      //const response = await axios.get("/api/room/get-all");
      // const response = await axios.get("/api/rooms/get-all");
      const token = await getToken({ template: "backend" });

const response = await axios.get("/api/rooms/get-all", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
console.log(response.data.rooms);
      if (response.data.success) {
        setRoomData(response.data.rooms);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch rooms");
    }
  };

  useEffect(() => {
    fetchOwnerRooms();
  }, []);

  const deleteRoom = async (id) => {
    try {
      //const { data } = await axios.delete("/api/room/delete/" + id);
      // const { data } = await axios.delete("/api/rooms/delete/" + id);
      const token = await getToken({ template: "backend" });

const { data } = await axios.delete(
  "/api/rooms/delete/" + id,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (data.success) {
        toast.success(data.message);
        fetchOwnerRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">

    <div className="max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8
        bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6">

        <div>
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
            Your Rooms
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all hotel rooms in one place
          </p>
        </div>

        {/* <motion.button
  onClick={() => {
  if (roomData.length > 0 && roomData[0].hotel?._id) {
    navigate(`/admin/hotel/${roomData[0].hotel._id}/add-room`);
  } else {
    toast.error("No hotel found");
  }
}}
   

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-purple-300 transition"
        >
          + Add New Room
        </motion.button> */}
      </div>

      {/* TABLE CARD */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* HEADER */}
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Hotel</th>
                <th className="p-4 text-left">Room</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Amenities</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100">

              {roomData.map((room, index) => (
                <tr
                  key={room._id}
                  className="hover:bg-purple-50 transition duration-200"
                >

                  {/* HOTEL */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                     <img
  src={
    room?.images?.length
      ? getImageUrl(room.images[0])
      : "/placeholder.jpg"
  }
  alt="room"
  className="w-16 h-12 rounded-xl object-cover"
/>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {room.hotel?.hotelName || "Deleted Hotel"}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          {room.hotel?.hotelAddress || "No address"}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* ROOM TYPE */}
                  <td className="p-4 font-medium text-gray-700">
                    {room.roomType}
                  </td>

                  {/* DESCRIPTION */}
                  <td className="p-4 max-w-[220px] text-gray-500 truncate">
                    {room.description || "No description"}
                  </td>

                  {/* RATING */}
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-yellow-500 font-medium">
                      <Star className="w-4 h-4 fill-current" />
                      {room.hotel?.rating || "N/A"}
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="p-4 font-semibold text-green-600">
                    ₹{room.pricePerNight}
                  </td>

                  {/* AMENITIES */}
                  <td className="p-4 max-w-[180px]">
                    <div className="flex flex-wrap gap-2">
                     {room.amenities?.map((amenity, index) => {
  const Icon = getAmenityIcon(amenity);

  return (
    <div
      key={index}
      className="flex items-center gap-2"
    >
      <Icon className="w-4 h-4" />

      <span>{amenity}</span>
    </div>
  );
})}
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="px-4 py-2 text-sm rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-md hover:shadow-red-200"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
);
};

export default AllRooms;
