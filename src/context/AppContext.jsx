

// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";

// // ✅ Axios setup
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// // ✅ Create Context
// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {

//   const navigate = useNavigate();

//   const {
//     getToken,
//     isSignedIn,
//     isLoaded,
//   } = useAuth();

//   // ✅ Global States
//   const [user, setUser] = useState(null);

//   // ✅ true = admin
//   const [owner, setOwner] = useState(false);

//   const [authLoading, setAuthLoading] = useState(true);

//   const [hotelData, setHotelData] = useState([]);

//   const [roomData, setRoomData] = useState([]);

//   // =========================================================
//   // ✅ FETCH ALL HOTELS
//   // =========================================================
//   const fetchHotelsData = async () => {

//     try {

//       const { data } = await axios.get(
//         "/api/hotel/get-all"
//       );

//       if (data.success) {

//         setHotelData(data.hotels);

//       } else {

//         toast.error(data.message);
//       }

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         error.response?.data?.message ||
//         "Failed to load hotels"
//       );
//     }
//   };

//   // =========================================================
//   // ✅ FETCH ALL ROOMS
//   // =========================================================
//   const fetchRoomsData = async () => {

//     try {

//       const { data } = await axios.get(
//         "/api/rooms/get-all"
//       );

//       if (data.success) {

//         setRoomData(data.rooms);

//       } else {

//         toast.error(data.message);
//       }

//     } catch (error) {

//       console.log(error);

//       toast.error(
//         error.response?.data?.message ||
//         "Failed to load rooms"
//       );
//     }
//   };

//   // =========================================================
//   // ✅ FETCH CURRENT USER
//   // =========================================================
//   const fetchUser = async () => {

//     try {

//       // ✅ Wait until Clerk loads
//       if (!isLoaded) return;

//       // ✅ If not signed in
//       if (!isSignedIn) {

//         setUser(null);

//         setOwner(false);

//         setAuthLoading(false);

//         return;
//       }

//       // ✅ Get backend token
//       const token = await getToken({
//         template: "backend",
//       });

//       if (!token) {

//         console.log("No token found");

//         setUser(null);

//         setOwner(false);

//         setAuthLoading(false);

//         return;
//       }

//       // ✅ Fetch user from backend
//       const { data } = await axios.get(
//         "/api/user/me",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ User found
//       if (data.success && data.user) {

//         const currentUser = data.user;

//         console.log("USER:", currentUser);

//         console.log("ROLE:", currentUser.role);

//         // ✅ Save globally
//         setUser(currentUser);

//         // ✅ Admin check
//         setOwner(
//           currentUser.role === "admin"
//         );

//       } else {

//         setUser(null);

//         setOwner(false);
//       }

//     } catch (error) {

//       console.log(
//         "User fetch error:",
//         error.response?.data || error.message
//       );

//       setUser(null);

//       setOwner(false);

//     } finally {

//       setAuthLoading(false);
//     }
//   };

//   // =========================================================
//   // ✅ UPDATE PROFILE IMAGE
//   // =========================================================
//   const updateProfileImage = async (file) => {

//     try {

//       const formData = new FormData();

//       formData.append("image", file);

//       const { data } = await axios.post(
//         "/api/user/upload-profile",
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//       if (data.success) {

//         setUser(data.user);

//         toast.success(
//           "Profile image updated successfully!"
//         );

//       } else {

//         toast.error(data.message);
//       }

//     } catch (error) {

//       console.log(
//         "Profile upload error:",
//         error
//       );

//       toast.error(
//         error.response?.data?.message ||
//         "Image upload failed"
//       );
//     }
//   };

//   // =========================================================
//   // ✅ LOAD USER WHEN AUTH CHANGES
//   // =========================================================
//   useEffect(() => {

//     if (isLoaded) {

//       fetchUser();
//     }

//   }, [isLoaded, isSignedIn]);

//   // =========================================================
//   // ✅ LOAD PUBLIC DATA ONCE
//   // =========================================================
//   useEffect(() => {

//     fetchHotelsData();

//     fetchRoomsData();

//   }, []);

//   // =========================================================
//   // ✅ CONTEXT VALUE
//   // =========================================================
//   const value = {

//     // User
//     user,
//     setUser,

//     // Admin
//     owner,
//     setOwner,

//     // Loading
//     authLoading,
//     setAuthLoading,

//     // Hotels
//     hotelData,
//     setHotelData,

//     // Rooms
//     roomData,
//     setRoomData,

//     // Axios + Navigate
//     axios,
//     navigate,

//     // Functions
//     fetchUser,
//     fetchHotelsData,
//     fetchRoomsData,
//     updateProfileImage,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// ✅ Axios Setup
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

  // =========================================================
  // ✅ GLOBAL STATES
  // =========================================================

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);

  const [hotelData, setHotelData] = useState([]);

  const [roomData, setRoomData] = useState([]);

  // ✅ ADMIN CHECK
  const owner = Boolean(
  user?.role === "admin"
);

  // =========================================================
  // ✅ FETCH HOTELS
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
  // ✅ FETCH ROOMS
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

      // Clerk not loaded yet
      if (!isLoaded) return;

      // User not signed in
      if (!isSignedIn) {

        setUser(null);

        setAuthLoading(false);

        return;
      }

      // Get Clerk backend token
      const token = await getToken({
        template: "backend",
      });

      if (!token) {

        console.log("No token found");

        setUser(null);

        setAuthLoading(false);

        return;
      }

      // Fetch current user
      const { data } = await axios.get(
        "/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.user) {

        const currentUser = data.user;

        console.log("USER:", currentUser);

        console.log("ROLE:", currentUser.role);

        setUser(currentUser);

      } else {

        setUser(null);
      }

    } catch (error) {

      console.log(
        "User fetch error:",
        error.response?.data || error.message
      );

      setUser(null);

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
  // ✅ LOAD PUBLIC DATA
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