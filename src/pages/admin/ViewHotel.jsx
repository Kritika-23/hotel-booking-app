import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import { useParams, useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";

import {
  MapPin,
  Star,
  IndianRupee,
  ArrowLeft,
  CheckCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { useAuth } from "@clerk/clerk-react";

const ViewHotel = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { axios } = useContext(AppContext);

  const { getToken } = useAuth();

  const [hotel, setHotel] = useState(null);

  const [loading, setLoading] = useState(true);

  const [currentImage, setCurrentImage] =
  useState(0);

  useEffect(() => {

    const fetchHotel = async () => {

      try {

        const { data } = await axios.get(
          `/api/hotel/${id}`
        );

        if (data.success) {
          setHotel(data.hotel);
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchHotel();

  }, [id]);

  // ✅ DELETE HOTEL
  const deleteHotel = async () => {

    try {

      const token = await getToken({
        template: "backend",
      });

      const { data } = await axios.delete(
        `/api/hotel/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {

        toast.success("Hotel deleted");

        navigate("/admin");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  if (loading) {

    return (
      <div className="p-10 text-lg">
        Loading...
      </div>
    );
  }

  if (!hotel) {

    return (
      <div className="p-10 text-red-500">
        Hotel not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">

            {/* EDIT */}
            <button
              onClick={() =>
                navigate(`/admin/edit-hotel/${hotel._id}`)
              }
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={deleteHotel}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

         {/* IMAGE CAROUSEL */}
<div className="relative">

  {/* MAIN IMAGE */}
  <img
    src={`http://localhost:4000${hotel.images?.[currentImage]}`}
    alt=""
    className="w-full h-[450px] object-cover transition-all duration-300"
  />

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/30" />

  {/* LEFT BUTTON */}
  <button
    onClick={() =>
      setCurrentImage(
        currentImage === 0
          ? hotel.images.length - 1
          : currentImage - 1
      )
    }
    className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
  >
    ❮
  </button>

  {/* RIGHT BUTTON */}
  <button
    onClick={() =>
      setCurrentImage(
        currentImage === hotel.images.length - 1
          ? 0
          : currentImage + 1
      )
    }
    className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
  >
    ❯
  </button>

  {/* HOTEL INFO */}
  <div className="absolute bottom-8 left-8 text-white">

    <h1 className="text-5xl font-bold mb-3">
      {hotel.hotelName}
    </h1>

    <div className="flex items-center gap-2 text-lg">
      <MapPin className="w-5 h-5 text-red-400" />
      {hotel.hotelAddress}
    </div>

  </div>

  {/* DOTS */}
  <div className="absolute bottom-5 right-8 flex gap-2">

    {hotel.images?.map((_, index) => (

      <button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`w-3 h-3 rounded-full ${
          currentImage === index
            ? "bg-white"
            : "bg-white/50"
        }`}
      />

    ))}

  </div>

</div>
          {/* DETAILS */}
          <div className="p-8 grid md:grid-cols-3 gap-6">

            {/* RATING */}
            <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">

              <div className="flex items-center gap-3 mb-3">

                <Star className="w-6 h-6 text-yellow-500 fill-current" />

                <h2 className="text-xl font-bold text-gray-800">
                  Rating
                </h2>

              </div>

              <p className="text-3xl font-bold text-[#8458b3]">
                {hotel.rating}/5
              </p>

            </div>

            {/* PRICE */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">

              <div className="flex items-center gap-3 mb-3">

                <IndianRupee className="w-6 h-6 text-green-600" />

                <h2 className="text-xl font-bold text-gray-800">
                  Price
                </h2>

              </div>

              <p className="text-3xl font-bold text-green-700">
                ₹{hotel.price}
              </p>

            </div>

            {/* CITY */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">

              <div className="flex items-center gap-3 mb-3">

                <MapPin className="w-6 h-6 text-blue-600" />

                <h2 className="text-xl font-bold text-gray-800">
                  City
                </h2>

              </div>

              <p className="text-3xl font-bold text-blue-700">
                {hotel.city}
              </p>

            </div>

          </div>

          {/* AMENITIES */}
          <div className="px-8 pb-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Hotel Amenities
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

              {hotel.amenities
                ?.split(",")
                .map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >

                    <CheckCircle className="w-5 h-5 text-[#8458b3]" />

                    <span className="font-medium text-gray-700">
                      {item.trim()}
                    </span>

                  </div>
                ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewHotel;