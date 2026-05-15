import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import {
  BedDouble,
  IndianRupee,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Hotel,
  FileText,
} from "lucide-react";

const ViewRoom = () => {
    const { getToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const { axios } = useContext(AppContext);

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

 const fetchRoom = async () => {
  try {

    const token = await getToken({ template: "backend" });

    const { data } = await axios.get(
      `/api/rooms/single/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setRoom(data.room);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch room");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading room details...
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Room not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={() => navigate(`/admin/edit-room/${room._id}`)}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition shadow"
          >
            Edit Room
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* IMAGE */}
        
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
  {room.images?.map((img, index) => (
    <img
      key={index}
      src={`http://localhost:4000${img}`}
      alt="room"
      className="h-28 w-full object-cover rounded-xl"
    />
  ))}
</div>
        

          {/* CONTENT */}
          <div className="p-8">

            {/* TITLE */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

              <div>
                <h1 className="text-4xl font-bold text-gray-800">
                  {room.roomType}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-gray-500">
                  <Hotel className="w-5 h-5 text-purple-600" />
                  {room.hotel?.hotelName || "Hotel"}
                </div>
              </div>

              <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2 w-fit">
                <IndianRupee className="w-5 h-5" />
                {room.pricePerNight} / night
              </div>

            </div>

            {/* STATUS */}
            <div className="mb-8">
              {room.isAvailable ? (
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Available
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium">
                  <XCircle className="w-5 h-5" />
                  Unavailable
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Description
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {room.description || "No description available"}
              </p>
            </div>

            {/* AMENITIES */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BedDouble className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Amenities
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {room.amenities?.split(",").map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium"
                  >
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRoom;