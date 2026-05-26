import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  Home,
  Building2,
  PlusCircle,
  Trash2,
  Star,
   Search
} from "lucide-react";


const AllHotels = () => {
  const navigate = useNavigate();
  const { axios } = useContext(AppContext);
  const { getToken } = useAuth();

  const [hotelData, setHotelData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchOwnerHotels = async () => {
    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.get("/api/hotel/get", {
        
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setHotelData(data.hotels);
      else toast.error(data.message);

    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOwnerHotels();
  }, []);

  const deleteHotel = async (id) => {
    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.delete(`/api/hotel/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Hotel deleted");
        fetchOwnerHotels();
      }

    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredHotels = hotelData.filter(h =>
    h.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="min-h-screen bg-[#f4f1f8] p-6">

    {/* HEADER */}
    <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#9d6cc7] via-[#d7c1f0] to-[#9d6cc7] p-8 shadow-2xl mb-8">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-52 h-52 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-5 items-center">

        <div>
          <h1 className="text-4xl font-black text-white">
            Hotels Dashboard
          </h1>

          <p className="text-white/80 mt-2 text-lg">
         
Manage your hotel listings with ease
          </p>
        </div>

       

      </div>
    </div>

    {/* HOTEL CARDS */}
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

      {filteredHotels.map((hotel) => (

        <div
          key={hotel._id}
          className="group backdrop-blur-xl bg-white/70 border border-white/40 rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >

          {/* IMAGE */}
          <div className="relative overflow-hidden">

            <img
              src={`http://localhost:4000${hotel.images[0]}`}
              className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* RATING */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-lg px-3 py-1 rounded-full text-sm font-bold text-yellow-600 shadow">
              ⭐ {hotel.rating}
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-5">

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="font-bold text-xl text-gray-800">
                  {hotel.hotelName}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {hotel.hotelAddress}
                </p>
                  {/* Manage Button */}
  <button
    onClick={() => navigate(`/admin/hotel/${hotel._id}`)}

    className="bg-purple-400 text-white px-3 py-2 rounded-md mt-2 hover:bg-purple-500"
  >
    Manage Hotel
  </button>

              </div>

            </div>

            {/* PRICE + BUTTON */}
            <div className="flex items-center justify-between mt-6">

              <div>

             <p className="text-sm text-gray-400">
  Starting Price
</p>

<h2 className="text-2xl font-black text-green-600 ">
  ₹{hotel.startingPrice}
</h2>

              </div>

              <button
                onClick={() => deleteHotel(hotel._id)}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

    {/* MODAL */}
    {showModal && (

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

        <div className="relative bg-white/80 backdrop-blur-2xl border border-white/30 w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

          {/* MODAL HEADER */}
          <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                Add New Hotel
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Create a beautiful listing for your guests
              </p>

            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
            >
              ✕
            </button>

          </div>

          {/* FORM */}
          <div className="p-8">

            <RegisterHotelInsideModal
              closeModal={() => {
                setShowModal(false);
                fetchOwnerHotels();
              }}
            />

          </div>

        </div>

      </div>

    )}

  </div>
);
};

export default AllHotels;