import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  
  const { hotelId } = useParams();
  const { axios, navigate} = useContext(AppContext); 
  const { getToken } = useAuth();
  const [roomData, setRoomData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    images: [],
    amenities: [],
    isAvailable: true,
  });



  const [hotelData, setHotelData] = useState([]);
const fetchOwnerHotels = async () => {

  try {

    const token = await getToken({
      template: "backend",
    });

    const { data } = await axios.get(
      "/api/hotel/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {

      setHotelData(data.hotels);

    } else {

      toast.error(data.message);

    }

  } catch (error) {

    toast.error(
      error.response?.data?.message || "Failed to fetch hotels"
    );

  }

};
useEffect(()=>{
  fetchOwnerHotels();
}, []);


  // Input handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomData({
      ...roomData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
const handleImageChange = (e, index) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif"
  ];

  const ext = file.name.split(".").pop().toLowerCase();

  if (
    !allowed.includes(file.type) &&
    !["jpg", "jpeg", "png", "webp", "avif"].includes(ext)
  ) {
    return toast.error("Invalid image format");
  }

  const updated = [...roomData.images];
  updated[index] = file;

  setRoomData({ ...roomData, images: updated });
};

  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    const amenitiesArray = value.split(",").map((item) => item.trim());
    setRoomData({ ...roomData, amenities: amenitiesArray });
  };

  // Form submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!hotelId) return toast.error("Hotel ID missing");

  const formData = new FormData();

  formData.append("hotel", hotelId);
  formData.append("roomType", roomData.roomType);
  formData.append("pricePerNight", roomData.pricePerNight);
  formData.append("description", roomData.description);
  formData.append("isAvailable", roomData.isAvailable);

  // 🔥 FIXED
  formData.append("amenities", JSON.stringify(roomData.amenities));

 roomData.images.forEach((img) => {
  if (img instanceof File) {
    formData.append("images", img);
  }
});console.log("IMAGES:", roomData.images);
roomData.images.forEach((img, i) => {
  console.log(i, img);
});

  try {
    const token = await getToken({ template: "backend" });

    const { data } = await axios.post("/api/rooms/add", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      toast.success(data.message);
      navigate("/admin/rooms");
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log("BACKEND ERROR:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed");
  }
};

 return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center p-6">

    {/* Glassmorphism Card */}
    <div className="w-full max-w-5xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl p-10 transition-all duration-300 hover:shadow-purple-200">
 {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
          Add New Room
        </h2>
        <p className="text-gray-500 mt-2">
          Create a premium listing for your hotel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* IMAGE UPLOAD (UPLOAD CARDS) */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Room Images
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            {Array(4).fill("").map((_, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer group"
              >
                <input
                  type="file"
                  accept="image/*"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />

                <div className="h-28 rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-purple-500 group-hover:bg-purple-50 transition flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md">

                  {roomData.images[index] ? (
                    <img
                      src={URL.createObjectURL(roomData.images[index])}
                      className="h-full w-full object-cover transition group-hover:scale-105 duration-300"
                    />
                  ) : (
                    <span className="text-xs text-gray-400 group-hover:text-purple-500 transition">
                      + Upload
                    </span>
                  )}

                </div>
              </label>
            ))}
          </div>
        </div>

        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Room Type */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Room Type
            </label>
            <input
              type="text"
              name="roomType"
              value={roomData.roomType}
              onChange={handleChange}
              placeholder="Deluxe, Suite, Standard..."
              className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition shadow-sm"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Price Per Night
            </label>
            <input
              name="pricePerNight"
              type="number"
              value={roomData.pricePerNight}
              onChange={handleChange}
              placeholder="₹ 2500"
              className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition shadow-sm"
              required
            />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write about room comfort, facilities, view..."
            className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition shadow-sm resize-none"
          />
        </div>

        {/* AMENITIES */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Amenities
          </label>
          <textarea
            name="amenities"
            value={roomData.amenities.join(", ")}
            onChange={handleAmenitiesChange}
            rows={3}
            placeholder="WiFi, AC, TV, Mini Bar..."
            className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition shadow-sm resize-none"
          />
        </div>

        {/* HOTEL SELECT */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Select Hotel
          </label>
          <select
            name="hotel"
            value={roomData.hotel}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition shadow-sm"
            required
          >
            <option value="">Choose a hotel</option>
            {hotelData.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>

        {/* CHECKBOX */}
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <input
            type="checkbox"
            name="isAvailable"
            checked={roomData.isAvailable}
            onChange={handleChange}
            className="w-5 h-5 accent-purple-600"
          />
          <span className="text-gray-700 font-medium">
            Available for booking
          </span>
        </div>

        {/* CTA BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8458B3] to-[#FF4D6D] text-white font-semibold shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Add Room
        </button>

      </form>
    </div>
  </div>
);
};

export default AddRoom;
