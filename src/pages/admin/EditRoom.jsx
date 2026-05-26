import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { getImageUrl } from "../../utils/getImageUrl";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { axios } = useContext(AppContext);
  const { getToken } = useAuth();

  const [room, setRoom] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);
const fileInputRef = React.useRef({});
  // FETCH ROOM
  const fetchRoom = async () => {
    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.get(`/api/rooms/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setRoom(data.room);
        setRoomType(data.room.roomType || "");
        setPricePerNight(data.room.pricePerNight || "");
        setDescription(data.room.description || "");
        setAmenities(data.room.amenities || []);
        setIsAvailable(data.room.isAvailable);
      }
    } catch (error) {
      toast.error("Failed to fetch room");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  // IMAGE CHANGE
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...newImages];
    updated[index] = file;
    setNewImages(updated);
  };

  // UPDATE ROOM
 const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = await getToken({ template: "backend" });

    const formData = new FormData();

    formData.append("roomType", roomType);
    formData.append("pricePerNight", pricePerNight);
    formData.append("description", description);

   formData.append(
  "amenities",
  JSON.stringify(amenities)
);

    formData.append("isAvailable", isAvailable);

    newImages.forEach((img) => {
      if (img instanceof File) {
        formData.append("images", img);
      }
    });

    const res = await axios.put(
      `/api/rooms/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Room updated successfully");
      navigate("/admin/rooms");
    }

  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    setLoading(false);
  }
};

  // DELETE
  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.delete(`/api/rooms/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success("Room deleted");
        navigate("/admin/rooms");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100 p-4">

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-white p-8 text-gray-900">

          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold">Edit Room</h1>
        </div>

        <div className="p-8">

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">

            {room?.images?.map((img, index) => (
              <div key={index} className="relative group">

                <label htmlFor={`img-${index}`}>

                  <img
                    src={
                      newImages[index]
                        ? URL.createObjectURL(newImages[index])
                        : getImageUrl(img)
                    }
                    className="w-full h-28 object-cover rounded-2xl border shadow cursor-pointer"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-semibold text-sm">
                      Edit Image
                    </span>
                  </div>

                </label>

<input
  type="file"
  hidden
  ref={(el) => (fileInputRef.current[index] = el)}
  accept="image/*"
  onChange={(e) => handleImageChange(e, index)}
/>

              </div>
            ))}

          </div>

          {/* FORM */}
          <form onSubmit={handleUpdate} className="space-y-6">

            <input
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full p-4 border rounded-2xl"
              placeholder="Room Type"
            />

            <input
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="w-full p-4 border rounded-2xl"
              placeholder="Price"
            />

       <textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full p-4 border rounded-2xl"
  placeholder="Description"
/>

{/* AMENITIES DISPLAY */}
<div className="mt-4">
  <h3 className="font-semibold mb-2">Amenities</h3>

  <div className="flex flex-wrap gap-2">
    {amenities?.map((item, index) => (
      <span
        key={index}
        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
      >
        {item}
      </span>
    ))}
  </div>
</div>

{/* AMENITIES INPUT */}
<input
  value={amenities.join(", ")}
onChange={(e) =>
  setAmenities(
    e.target.value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean)
  )
}
  className="w-full p-4 border rounded-2xl"
  placeholder="WiFi, AC, TV, Pool"
/>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
              Available
            </label>

            <div className="flex gap-4">

              <button
                disabled={loading}
                className="bg-purple-600 text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-3 rounded-xl"
              >
                Delete
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditRoom;
