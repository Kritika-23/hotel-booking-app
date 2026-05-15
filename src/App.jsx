import React, { useContext } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// 🔹 Pages
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import About from "./pages/About";
import MyBooking from "./pages/MyBooking";
import ExclusiveOffers from "./components/ExclusiveOffers";
import HotelDetails from "./pages/HotelDetails";
import Profile from "./pages/Profile";

// 🔹 Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// 🔹 Owner Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AllHotels from "./pages/admin/AllHotels";
import Dashboard from "./pages/admin/Dashboard";
import RegisterHotel from "./pages/admin/RegisterHotel";
import AllRooms from "./pages/admin/AllRooms";
import AddRoom from "./pages/admin/AddRoom";
import Bookings from "./pages/admin/Bookings";
import SingleHotel from "./pages/admin/SingleHotel";
import SearchPage from "./pages/admin/SearchPage";
import EditRoom from "./pages/admin/EditRoom";
import ViewRoom from "./pages/admin/ViewRoom";
import ViewHotel from "./pages/admin/ViewHotel";
import EditHotel from "./pages/admin/EditHotel";
// 🔹 Context
import { AppContext } from "./context/AppContext";

const App = () => {

  const location = useLocation();

  const adminPath = location.pathname.includes("admin");

  const {
    owner,
    authLoading,
  } = useContext(AppContext);

  // ✅ wait until auth check finishes
  if (authLoading) {
    return <Loader />;
  }

  return (

    <div className="w-full mx-auto">

      {/* 🔔 Toast */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      {/* ✅ Hide navbar on admin pages */}
      {!adminPath && <Navbar />}

      <Routes>

        {/* 🔹 Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/hotels"
          element={<Hotels />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/room/:id"
          element={<SingleRoom />}
        />

        <Route
          path="/offers"
          element={<ExclusiveOffers />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify"
          element={<Verify />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/my-bookings"
          element={<MyBooking />}
        />

        <Route
          path="/loader/:nextUrl"
          element={<Loader />}
        />

        <Route
          path="/hotel/:id"
          element={<HotelDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      
     
{/* 🔹 Admin Protected Routes */}
<Route
  path="/admin"
  element={owner ? <AdminLayout /> : <Navigate to="/login" />}
>

  {/* DASHBOARD */}
  <Route
    index
    element={owner ? <Dashboard /> : <Navigate to="/login" />}
  />

  {/* SEARCH PAGE */}
  <Route
    path="search"
    element={owner ? <SearchPage /> : <Navigate to="/login" />}
  />

  {/* HOTELS */}
  <Route
    path="hotels"
    element={owner ? <AllHotels /> : <Navigate to="/login" />}
  />

  {/* REGISTER HOTEL */}
  <Route
    path="register-hotel"
    element={owner ? <RegisterHotel /> : <Navigate to="/login" />}
  />

  {/* ROOMS */}
  <Route
    path="rooms"
    element={owner ? <AllRooms /> : <Navigate to="/login" />}
  />

 

  {/* BOOKINGS */}
  <Route
    path="bookings"
    element={owner ? <Bookings /> : <Navigate to="/login" />}
  />

  {/* SINGLE HOTEL */}
  
  {/* <Route
  path="/admin/hotel/:id"
  element={owner ? <SingleHotel /> : <Navigate to="/login" />}
/> */}

<Route
  path="hotel/:id"
  element={
    owner
      ? <SingleHotel />
      : <Navigate to="/login" />
  }
/>

<Route
  path="hotel/view/:id"
  element={
    owner
      ? <ViewHotel />
      : <Navigate to="/login" />
  }
/>
<Route
  path="edit-hotel/:id"
  element={
    owner
      ? <EditHotel />
      : <Navigate to="/login" />
  }
/>
  {/* ADD ROOM */}
  <Route path="hotel/:hotelId/add-room" element={<AddRoom />} />


{/* EDIT ROOM */}
<Route
  path="edit-room/:id"
  element={owner ? <EditRoom /> : <Navigate to="/login" />}
/>

<Route
  path="room/:id"
  element={owner ? <ViewRoom /> : <Navigate to="/login" />}
/>
</Route>

      </Routes>

      {/* ✅ Hide footer on admin pages */}
      {!adminPath && <Footer />}

    </div>
  );
};

export default App;