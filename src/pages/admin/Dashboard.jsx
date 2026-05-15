import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import StatsCards from "./Component/StatsCards";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { axios } = useContext(AppContext);
  const { getToken } = useAuth();

  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken({ template: "backend" });
      const [hotelRes, bookingRes] = await Promise.all([
        axios.get("/api/hotel/get", {
          headers: { Authorization: `Bearer ${token}` },
        }),

        axios.get("/api/bookings/hotel", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      console.log("🏨 HOTEL API RESPONSE:", hotelRes.data);
      console.log("📦 BOOKING API RESPONSE:", bookingRes.data);
      setHotels(hotelRes.data.hotels || []);
      setBookings(bookingRes.data.hotelBookings || []);
    } catch (err) {
      console.error("API ERROR:", err);
      toast.error(err.message);
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const bookingChart = days.map((day, index) => {
    const totalBookings = bookings.filter((booking) => {
      const bookingDay = new Date(booking.createdAt).getDay();

      return bookingDay === index;
    }).length;

    return {
      day,
      bookings: totalBookings,
    };
  });
  const revenueChart = days.map((day, index) => {
    const totalRevenue = bookings.reduce((acc, booking) => {
      const bookingDay = new Date(booking.createdAt).getDay();

      if (bookingDay === index) {
        return acc + Number(booking.totalPrice || 0);
      }

      return acc;
    }, 0);

    return {
      day,
      revenue: totalRevenue,
    };
  });
  return (
    <div className="space-y-6">
      {/* ⭐ KPI CARDS */}
      <StatsCards hotels={hotels} bookings={bookings} />

      {/* 📊 GRAPHS SECTION */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* BOOKINGS GRAPH */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Bookings (Weekly)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingChart}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#8458B3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* REVENUE GRAPH */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChart}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF385C"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
