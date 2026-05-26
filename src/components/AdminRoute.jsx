import React, { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const AdminRoute = ({ children }) => {

  const {
    owner,
    authLoading,
  } = useContext(AppContext);

  // ✅ Wait until auth loads
  if (authLoading) {

    return (

      <div className="h-screen flex items-center justify-center bg-gray-50">

        <div className="text-lg font-semibold text-[#8458b3] animate-pulse">

          Loading Admin Panel...

        </div>

      </div>

    );
  }

  // ✅ Not admin
  if (!owner) {

    return <Navigate to="/" replace />;
  }

  // ✅ Admin access granted
  return children;
};

export default AdminRoute;