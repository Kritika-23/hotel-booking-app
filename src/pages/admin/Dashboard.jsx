import React, { useEffect, useState, useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import StatsCards from "./Component/StatsCards";
import CountUp from "react-countup";

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

// ---------------- SKELETON ----------------
const SkeletonCard = () => (
  <div className="bg-white p-4 rounded-xl animate-pulse space-y-3">
    <div className="h-3 w-24 bg-gray-200 rounded"></div>
    <div className="h-6 w-16 bg-gray-300 rounded"></div>
  </div>
);

const Dashboard = () => {
  const { axios } = useContext(AppContext);
  const { getToken } = useAuth();

  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const token = await getToken({ template: "backend" });

      const hotelRes = await axios.get("/api/hotel/get", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookingRes = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHotels(hotelRes.data.hotels || []);

      setBookings(
        bookingRes.data.hotelBookings ||
        bookingRes.data.bookings ||
        bookingRes.data.data ||
        []
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- INIT ----------------
  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // ---------------- LAST 7 DAYS ----------------
  const days = useMemo(() => {
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d;
    });
  }, []);

  // ---------------- BOOKING CHART ----------------
  const bookingChart = useMemo(() => {
    return days.map((date) => {
      const label = date.toLocaleDateString("en-US", { weekday: "short" });

      const count = bookings.filter((b) => {
        const bd = new Date(b.createdAt || b.created_at || b.date);

        return (
          bd.getFullYear() === date.getFullYear() &&
          bd.getMonth() === date.getMonth() &&
          bd.getDate() === date.getDate()
        );
      }).length;

      return {
        day: label,
        bookings: count,
      };
    });
  }, [bookings, days]);

  // ---------------- REVENUE CHART ----------------
  const revenueChart = useMemo(() => {
    return days.map((date) => {
      const label = date.toLocaleDateString("en-US", { weekday: "short" });

      const revenue = bookings.reduce((acc, b) => {
        const bd = new Date(b.createdAt || b.created_at || b.date);

        const match =
          bd.getFullYear() === date.getFullYear() &&
          bd.getMonth() === date.getMonth() &&
          bd.getDate() === date.getDate();

        if (match) return acc + Number(b.totalPrice || 0);
        return acc;
      }, 0);

      return {
        day: label,
        revenue,
      };
    });
  }, [bookings, days]);

  // ---------------- KPIs ----------------
  const totalRevenue = useMemo(() => {
    return bookings.reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);
  }, [bookings]);

  const avgBookings = useMemo(() => bookings.length / 7, [bookings]);

  const bestDay = useMemo(() => {
    return bookingChart.reduce(
      (max, d) => (d.bookings > max.bookings ? d : max),
      bookingChart[0] || { day: "-", bookings: 0 }
    );
  }, [bookingChart]);

  const hasBookingActivity = bookingChart.some((d) => d.bookings > 0);

  // ---------------- LOADING UI ----------------
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="space-y-6">

      {/* EXISTING STATS */}
      <StatsCards hotels={hotels} bookings={bookings} />

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-xl font-semibold">
            ₹
            <CountUp end={totalRevenue} duration={1.5} />
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Avg Daily Bookings</p>
          <p className="text-xl font-semibold">
            <CountUp end={avgBookings} decimals={1} duration={1.2} />
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Best Day</p>
          <p className="text-xl font-semibold">
            {bestDay.day} (
            <CountUp end={bestDay.bookings} duration={1.2} />
            )
          </p>
        </div>
      </div>

      {/* GRAPHS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BOOKINGS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Bookings (Last 7 Days)</h3>

          {!hasBookingActivity ? (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No bookings on this period
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bookingChart}>
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="bookings"
                  fill="#8458B3"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* REVENUE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4">Revenue (Last 7 Days)</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChart}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF385C"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;