// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";


// // ✅ Setup axios defaults
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const { getToken, isSignedIn, isLoaded } = useAuth();
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [owner, setOwner] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [hotelData, setHotelData] = useState([]);
//   const [roomData, setRoomData] = useState([]);

//   // ✅ Check if user or owner is logged in
//   // const checkUserLoggedInOrNot = async () => {
//   //   try {
//   //     const { data } = await axios.get("/api/user/is-auth"); // 🔹 for user
//   //     if (data.success) {
//   //       setUser(data.user);
//   //     } else {
//   //       const res = await axios.get("/api/owner/is-auth"); // 🔹 for owner
//   //       if (res.data.success) {
//   //         setOwner(res.data.owner);
//   //       }
//   //     }
//   //   } catch (error) {
//   //     setUser(null);
//   //     setOwner(null);
//   //   }
//   // };

//   // ✅ Fetch all hotels
//   const fetchHotelsData = async () => {
//     try {
//       const { data } = await axios.get("/api/hotel/get-all");
//       console.log(data)
//       if (data.success) {
//         setHotelData(data.hotels);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load hotels");
//     }
//   };

//   // ✅ Fetch all rooms
//   const fetchRoomsData = async () => {
//     try {
//       const { data } = await axios.get("/api/rooms/get-all");
//       if (data.success) {
//         setRoomData(data.rooms);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to load rooms");
//     }
//   };

// const fetchUser = async () => {
//   try {
//     // ⛔ stop if auth not ready
//     if (!isSignedIn) {
//       setUser(null);
//       setOwner(false);
//       setAuthLoading(false);
//       return;
//     }

//     // 🔐 get Clerk backend token
//     const token = await getToken({
//       template: "backend",
//     });

//     if (!token) {
//       console.log("No token found");
//       setUser(null);
//       setOwner(false);
//       setAuthLoading(false);
//       return;
//     }

//     // 🌐 fetch user from backend (ONLY source of truth)
//     const { data } = await axios.get("/api/user/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (data.success && data.user) {
//       const user = data.user;

//       console.log("USER:", user);
//       console.log("ROLE:", user.role);

//       setUser(user);

//       // 🧠 role handling (single source)
//       setOwner(user.role === "admin");
//     } else {
//       setUser(null);
//       setOwner(false);
//     }
//   } catch (error) {
//     console.log(
//       "User fetch error:",
//       error.response?.data || error.message
//     );

//     setUser(null);
//     setOwner(false);
//   } finally {
//     setAuthLoading(false);
//   }
// };
//   // ✅ Upload Profile Image (Manual Upload + Gravatar Fallback)
//   const updateProfileImage = async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const { data } = await axios.post("/api/user/upload-profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       if (data.success) {
//         setUser(data.user); // ✅ Update user globally
//         toast.success("Profile image updated successfully!");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Profile upload error:", error);
//       toast.error(error.response?.data?.message || "Image upload failed");
//     }
//   };

//   // ✅ Load initial data once
//  useEffect(() => {

//   if (isLoaded) {
//     fetchUser();
//   }

//   fetchHotelsData();

//   fetchRoomsData();

// }, [isLoaded]);
//   // ✅ Context value
// const value = {

//   user,
//   setUser,

//   owner,
//   setOwner,

//   authLoading,
//   setAuthLoading,

//   hotelData,
//   setHotelData,

//   roomData,
//   setRoomData,

//   axios,
//   navigate,

//   fetchUser,
// };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;


import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// ✅ Axios setup
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// ✅ Create Context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const {
    getToken,
    isSignedIn,
    isLoaded,
  } = useAuth();

  // ✅ Global States
  const [user, setUser] = useState(null);

  // ✅ true = admin
  const [owner, setOwner] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);

  const [hotelData, setHotelData] = useState([]);

  const [roomData, setRoomData] = useState([]);

  // =========================================================
  // ✅ FETCH ALL HOTELS
  // =========================================================
  const fetchHotelsData = async () => {

    try {

      const { data } = await axios.get(
        "/api/hotel/get-all"
      );

      if (data.success) {

        setHotelData(data.hotels);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load hotels"
      );
    }
  };

  // =========================================================
  // ✅ FETCH ALL ROOMS
  // =========================================================
  const fetchRoomsData = async () => {

    try {

      const { data } = await axios.get(
        "/api/rooms/get-all"
      );

      if (data.success) {

        setRoomData(data.rooms);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load rooms"
      );
    }
  };

  // =========================================================
  // ✅ FETCH CURRENT USER
  // =========================================================
  const fetchUser = async () => {

    try {

      // ✅ Wait until Clerk loads
      if (!isLoaded) return;

      // ✅ If not signed in
      if (!isSignedIn) {

        setUser(null);

        setOwner(false);

        setAuthLoading(false);

        return;
      }

      // ✅ Get backend token
      const token = await getToken({
        template: "backend",
      });

      if (!token) {

        console.log("No token found");

        setUser(null);

        setOwner(false);

        setAuthLoading(false);

        return;
      }

      // ✅ Fetch user from backend
      const { data } = await axios.get(
        "/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ User found
      if (data.success && data.user) {

        const currentUser = data.user;

        console.log("USER:", currentUser);

        console.log("ROLE:", currentUser.role);

        // ✅ Save globally
        setUser(currentUser);

        // ✅ Admin check
        setOwner(
          currentUser.role === "admin"
        );

      } else {

        setUser(null);

        setOwner(false);
      }

    } catch (error) {

      console.log(
        "User fetch error:",
        error.response?.data || error.message
      );

      setUser(null);

      setOwner(false);

    } finally {

      setAuthLoading(false);
    }
  };

  // =========================================================
  // ✅ UPDATE PROFILE IMAGE
  // =========================================================
  const updateProfileImage = async (file) => {

    try {

      const formData = new FormData();

      formData.append("image", file);

      const { data } = await axios.post(
        "/api/user/upload-profile",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (data.success) {

        setUser(data.user);

        toast.success(
          "Profile image updated successfully!"
        );

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(
        "Profile upload error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Image upload failed"
      );
    }
  };

  // =========================================================
  // ✅ LOAD USER WHEN AUTH CHANGES
  // =========================================================
  useEffect(() => {

    if (isLoaded) {

      fetchUser();
    }

  }, [isLoaded, isSignedIn]);

  // =========================================================
  // ✅ LOAD PUBLIC DATA ONCE
  // =========================================================
  useEffect(() => {

    fetchHotelsData();

    fetchRoomsData();

  }, []);

  // =========================================================
  // ✅ CONTEXT VALUE
  // =========================================================
  const value = {

    // User
    user,
    setUser,

    // Admin
    owner,
    setOwner,

    // Loading
    authLoading,
    setAuthLoading,

    // Hotels
    hotelData,
    setHotelData,

    // Rooms
    roomData,
    setRoomData,

    // Axios + Navigate
    axios,
    navigate,

    // Functions
    fetchUser,
    fetchHotelsData,
    fetchRoomsData,
    updateProfileImage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;