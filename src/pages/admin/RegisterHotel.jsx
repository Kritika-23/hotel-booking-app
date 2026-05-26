import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const RegisterHotel = () => {
  const { axios, navigate } = useContext(AppContext);
  const { getToken } = useAuth();
  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    city: "",
    rating: "",
    amenities: "",
  });

  const [files, setFiles] = useState([]);      // multiple files
  const [previews, setPreviews] = useState([]); // preview URLs

  const handleChange = (e) => {
    setData({ ...data,  [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []); // convert FileList to array
    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("hotelName", data.hotelName);
    formData.append("hotelAddress", data.hotelAddress);
    formData.append("city", data.city);
    formData.append("rating", Number(data.rating));
    formData.append(
      "amenities",
      JSON.stringify(
        data.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );
 

    // Append multiple images
    files.forEach((file) => {
      formData.append("images", file); // field name must match backend
    });

    try {
      const token = await getToken({
        template: "backend",
      });

      if (!token) {
        toast.error("Authentication failed");
        return;
      }

      const { data } = await axios.post(
        "/api/hotel/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {

        toast.success(data.message);

        navigate("/admin");

      } else {

        toast.error(data.message);

      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
 


return (
  <div className="min-h-screen bg-gradient-to-br from-[#f6f3ff] via-white to-[#f3f8ff] p-6">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="text-4xl font-black text-gray-800">
        Register New Hotel
      </h1>

      <p className="text-gray-500 mt-2">
        Add luxury hotels and manage your listings professionally.
      </p>
    </div>

    {/* FORM CARD */}
    <div className="bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-8">

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* IMAGE SECTION */}
        <div>

          <h2 className="text-lg font-semibold mb-4">
            Upload Hotel Images
          </h2>

          {/* PREVIEWS */}
          {previews.length > 0 && (
            <div className="flex gap-4 flex-wrap mb-5">
              {previews.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-28 h-28 object-cover rounded-2xl shadow-md border border-gray-200"
                />
              ))}
            </div>
          )}

          {/* FILE INPUT */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">

  {Array(4).fill("").map((_, index) => (

    <label
      key={index}
      htmlFor={`hotelImage${index}`}
      className="cursor-pointer group"
    >

      <input
        type="file"
        accept="image/*"
        id={`hotelImage${index}`}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          const updatedFiles = [...files];
          updatedFiles[index] = file;

          setFiles(updatedFiles);

          const updatedPreviews = [...previews];
          updatedPreviews[index] = URL.createObjectURL(file);

          setPreviews(updatedPreviews);
        }}
      />

      <div className="h-32 rounded-2xl border-2 border-dashed border-[#8458B3]/30 bg-white hover:bg-purple-50 transition flex items-center justify-center overflow-hidden shadow-sm hover:shadow-lg">

        {previews[index] ? (
          <img
            src={previews[index]}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">
            + Upload
          </span>
        )}

      </div>

    </label>

  ))}

</div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
         



          {/* HOTEL NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Hotel Name
            </label>

            <input
              type="text"
              name="hotelName"
              value={data.hotelName}
              onChange={handleChange}
              placeholder="Enter hotel name"
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8458B3] outline-none"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8458B3] outline-none"
            />
          </div>

          {/* RATING */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Rating
            </label>

            <input
              type="number"
              name="rating"
              value={data.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              required
              placeholder="4.5"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8458B3] outline-none"
            />
          </div>

         

        </div>

        {/* ADDRESS */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Hotel Address
          </label>

      <input
  type="text"
  name="hotelAddress"
  value={data.hotelAddress}
  onChange={handleChange}
  placeholder="Enter hotel address"
  className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#8458B3] outline-none"
/>
        </div>

        {/* AMENITIES */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Hotel Amenities
          </label>

          <textarea
            name="amenities"
            value={data.amenities}
            onChange={handleChange}
            rows={4}
            required
            placeholder="WiFi, Pool, Spa, Parking..."
            className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 resize-none focus:ring-2 focus:ring-[#8458B3] outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full md:w-fit px-10 py-3 rounded-xl bg-gradient-to-r from-[#8458B3] to-[#6d48a0] text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Register Hotel
        </button>

      </form>

    </div>

  </div>
);
};

export default RegisterHotel;
