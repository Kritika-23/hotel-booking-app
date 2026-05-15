import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import md5 from "md5";
import { useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { user, isSignedIn } = useUser();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // ✅ Upload new image (Clerk)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      await user.setProfileImage({ file }); // Clerk API
      toast.success("Profile image updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update image");
    }
  };

  // ✅ Delete image (Clerk)
  const handleDeleteImage = async () => {
    try {
      await user.setProfileImage({ file: null });
      toast.success("Profile image removed");
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ❌ not logged in
  if (!isSignedIn) {
    return <h2 className="text-center mt-10">Please login to view profile</h2>;
  }

  // ✅ gravatar fallback
  const gravatarHash = user?.primaryEmailAddress?.emailAddress
    ? md5(user.primaryEmailAddress.emailAddress.trim().toLowerCase())
    : "0";

  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=200&d=mp`;

  // ✅ final image source
  const imageSrc = preview || user?.imageUrl || gravatarUrl;

  return (
    <div className="flex flex-col items-center justify-center mt-32 mb-16 bg-gray-50 p-6 rounded-2xl shadow-md max-w-md mx-auto relative">

      {/* Back Button */}
      <button
        onClick={() => navigate("/", { replace: true })}
        className="absolute top-4 left-4 bg-[#8458b3] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:bg-[#6f45a9] transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-[#8458b3]">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-[#bf97ea] object-cover shadow-md"
          onError={(e) => (e.target.src = gravatarUrl)}
        />

        {/* Upload */}
        <label
          htmlFor="profile-upload"
          className="absolute bottom-2 right-2 bg-[#8458b3] text-white px-2 py-1 rounded-md cursor-pointer text-xs hover:bg-[#6f45a9] transition"
        >
          Change
        </label>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Delete */}
      {user?.imageUrl && !preview && (
        <button
          onClick={handleDeleteImage}
          className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
        >
          Delete Image
        </button>
      )}

      {/* User Info */}
      <div className="mt-6 text-center">
        <p className="text-xl font-semibold text-gray-800">
          {user?.fullName}
        </p>
        <p className="text-gray-600 text-sm">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  );
};

export default Profile;
