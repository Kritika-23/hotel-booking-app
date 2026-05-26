import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { AppContext } from "../../context/AppContext";

import { toast } from "react-hot-toast";

import { useAuth } from "@clerk/clerk-react";

import {
  ArrowLeft,
} from "lucide-react";

import { useRef } from "react";
import { getImageUrl } from "../../utils/getImageUrl";

const EditHotel = () => {

  const fileInputRef = useRef({});

  const { id } = useParams();

  const navigate = useNavigate();

  const { axios } = useContext(AppContext);

  const { getToken } = useAuth();

  const [loading, setLoading] =
    useState(true);

  const [files, setFiles] = useState([]);

  const [previews, setPreviews] =
    useState([]);

  const [currentImage, setCurrentImage] =
    useState(0);

   
  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    city: "",
    rating: "",
    amenities: [],
  });

  // FETCH HOTEL
  useEffect(() => {

    const fetchHotel = async () => {

      try {

        const res = await axios.get(
          `/api/hotel/${id}`
        );

        if (res.data.success) {

          const hotel = res.data.hotel;

          setData({
            hotelName:
              hotel.hotelName || "",

            hotelAddress:
              hotel.hotelAddress || "",

            city:
              hotel.city || "",

            rating:
              hotel.rating || "",

            amenities:
              hotel.amenities || [],
          });

          setPreviews(
            hotel.images.map(
              (img) =>
                getImageUrl(img)
            )
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load hotel"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchHotel();

  }, [id]);

  // INPUT CHANGE
 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "amenities") {
    setData({
      ...data,
      amenities: value.split(",").map((item) => item.trim()),
    });
  } else {
    setData({
      ...data,
      [name]: value,
    });
  }
};

  // IMAGE CHANGE
const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const updated = [...files];
  updated[index] = file;
  setFiles(updated);

  const updatedPreviews = [...previews];
  updatedPreviews[index] = URL.createObjectURL(file);
  setPreviews(updatedPreviews);
};
  // UPDATE HOTEL
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        await getToken({
          template: "backend",
        });

      const formData =
        new FormData();

      formData.append(
        "hotelName",
        data.hotelName
      );

      formData.append(
        "hotelAddress",
        data.hotelAddress
      );

      formData.append(
        "city",
        data.city
      );

      formData.append(
        "rating",
        data.rating
      );

  formData.append(
  "amenities",
  JSON.stringify(data.amenities)
);


     files.forEach((file, index) => {
  if (file) {
    formData.append("images", file);
    formData.append("imageIndex", index);
  }
});

      const res = await axios.put(
        `/api/hotel/update/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (res.data.success) {

        toast.success(
          "Hotel updated successfully"
        );

        navigate(-1);

      } else {

        toast.error(
          res.data.message
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Update failed"
      );
    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() =>
            navigate(-1)
          }
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#2c0850] mb-8">
          Edit Hotel
        </h1>

        {/* IMAGE CAROUSEL */}
   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">

  {previews.map((img, index) => (
    <div key={index} className="relative group">

<input
  type="file"
  hidden
  accept="image/*"
  ref={(el) => (fileInputRef.current[index] = el)}
  onChange={(e) => handleImageChange(e, index)}
/>
  {/* IMAGE */}
  <label htmlFor={`img-${index}`}>
    <img
      src={img}
      className="w-full h-32 object-cover rounded-2xl border shadow cursor-pointer"
    />
  </label>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl" />

  {/* EDIT ICON */}
  <button
  type="button"
  onClick={() => fileInputRef.current[index]?.click()}
  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
>
  <div className="bg-white/90 text-black px-3 py-1 rounded-lg text-sm font-semibold shadow">
    ✏ Edit
  </div>
</button>

  {/* DELETE ICON */}
  <button
    type="button"
    onClick={() => handleDeleteImage(index)}
    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow"
  >
    ✕
  </button>

</div>
  ))}

</div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

         

          {/* HOTEL NAME */}
          <div>

            <label className="font-semibold text-gray-700">
              Hotel Name
            </label>

            <input
              type="text"
              name="hotelName"
              value={data.hotelName}
              onChange={
                handleChange
              }
              className="w-full mt-2 border border-gray-200 rounded-xl p-4"
            />
          </div>

          {/* ADDRESS */}
          <div>

            <label className="font-semibold text-gray-700">
              Hotel Address
            </label>

            <textarea
              name="hotelAddress"
              value={
                data.hotelAddress
              }
              onChange={
                handleChange
              }
              rows={3}
              className="w-full mt-2 border border-gray-200 rounded-xl p-4"
            />
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* CITY */}
            <div>

              <label className="font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={data.city}
                onChange={
                  handleChange
                }
                className="w-full mt-2 border border-gray-200 rounded-xl p-4"
              />
            </div>

            {/* RATING */}
            <div>

              <label className="font-semibold text-gray-700">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={data.rating}
                onChange={
                  handleChange
                }
                className="w-full mt-2 border border-gray-200 rounded-xl p-4"
              />
            </div>

          
           
          </div>

          {/* AMENITIES */}
          <div>

            <label className="font-semibold text-gray-700">
              Amenities
            </label>

            <textarea
              name="amenities"
              value={data.amenities.join(", ")}
              onChange={
                handleChange
              }
              rows={4}
              className="w-full mt-2 border border-gray-200 rounded-xl p-4"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#8458b3] text-white text-lg font-semibold hover:bg-[#6f46a0] transition"
          >
            Update Hotel
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditHotel;
