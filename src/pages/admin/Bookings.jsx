import React, { useContext, useEffect, useState } from "react";
import { MapPin, Calendar, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext.jsx";
import { useAuth } from "@clerk/clerk-react";

const Bookings = () => {
  const { axios } = useContext(AppContext);
  const { getToken } = useAuth();
  const [bookingData, setBookingData] = useState([]);

  const fetchMyBookings = async () => {
    try {
      
    const token = await getToken({
      template: "backend",
    });

      const { data } = await axios.get(
  "/api/bookings/hotel",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      if (data.success) {
        setBookingData(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "confirmed": return "text-green-500";
      case "pending": return "text-yellow-500";
      case "cancelled": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "pending": return Clock;
      case "cancelled": return XCircle;
      default: return Clock;
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).replace(/\./g, '');

return (
  <div className="min-h-screen bg-[#f4f1f8] p-6">

    {/* HERO HEADER */}
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#8458B3] via-[#9d72cf] to-[#FF4D6D] p-8 md:p-10 shadow-2xl mb-10">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">

        <h1 className="text-4xl md:text-5xl font-black text-white">
          My Bookings
        </h1>

       <p className="text-white/80 text-lg mt-3 max-w-2xl leading-relaxed">
  Monitor hotel performance, booking activity, payments, and room management from one centralized dashboard.
</p>
      </div>

    </div>

    {/* BOOKINGS */}
    <div className="space-y-8">

      {bookingData.length === 0 ? (

        <div className="backdrop-blur-2xl bg-white/70 border border-white/40 rounded-[32px] shadow-xl p-16 text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#8458B3] to-[#FF4D6D] flex items-center justify-center shadow-lg">

            <Calendar className="text-white w-10 h-10" />

          </div>

          <h2 className="text-3xl font-black text-gray-800 mt-6">
            No Bookings Yet
          </h2>
<p className="text-gray-500 mt-2">
  Manage hotel reservations, payments, and booking activity here.
</p>

        </div>

      ) : (

        bookingData.map((booking) => {

          const StatusIcon = getStatusIcon(booking.status);

          return (

            <div
              key={booking.bookingId}
              className="group relative overflow-hidden backdrop-blur-2xl bg-white/70 border border-white/40 rounded-[32px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >

              {/* TOP GRADIENT LINE */}
              <div className="h-1.5 bg-gradient-to-r from-[#8458B3] via-[#9f6dd6] to-[#FF4D6D]"></div>

              <div className="p-6 md:p-8">

                <div className="grid xl:grid-cols-12 gap-8 items-center">

                  {/* IMAGE */}
                  <div className="xl:col-span-3">

                    <div className="relative overflow-hidden rounded-[24px]">

                      <img
                        src={`http://localhost:4000${booking.room?.images?.[0]}`}
                        alt={booking.room?.roomType}
                        className="w-full h-60 object-cover group-hover:scale-105 transition duration-700"
                      />

                      {/* STATUS BADGE */}
                      <div
                        className={`absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg shadow-lg ${
                          booking.status === "confirmed"
                            ? "bg-green-500/90"
                            : booking.status === "pending"
                            ? "bg-yellow-500/90"
                            : "bg-red-500/90"
                        }`}
                      >

                        <StatusIcon className="w-4 h-4 text-white" />

                        <span className="text-white text-sm font-semibold capitalize">
                          {booking.status}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* DETAILS */}
                  <div className="xl:col-span-5">

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8458B3] to-[#FF4D6D] flex items-center justify-center shadow-lg">

                        <Building2 className="text-white w-6 h-6" />

                      </div>

                      <div>

                        <p className="text-sm text-gray-500 font-medium">
                          Hotel Booking
                        </p>

                        <h2 className="text-3xl font-black text-gray-800 leading-tight">
                          {booking.hotel?.hotelName}
                        </h2>

                      </div>

                    </div>

                    <div className="mt-5 space-y-4">

                      <div className="flex items-center gap-3 text-gray-700">

                        <BedDouble className="w-5 h-5 text-[#8458B3]" />

                        <span className="font-semibold">
                          {booking.room?.roomType}
                        </span>

                      </div>

                      <div className="flex items-start gap-3 text-gray-500">

                        <MapPin className="w-5 h-5 mt-0.5 text-[#8458B3]" />

                        <span className="leading-relaxed">
                          {booking.hotel?.hotelAddress}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* DATES */}
                  <div className="xl:col-span-2 space-y-5">

                    <div className="backdrop-blur-xl bg-[#8458B3]/5 border border-[#8458B3]/10 rounded-2xl p-4">

                      <p className="text-sm text-gray-500 font-medium mb-2">
                        Check In
                      </p>

                      <div className="flex items-center gap-2 font-bold text-gray-800">

                        <Calendar className="w-4 h-4 text-[#8458B3]" />

                        {formatDate(booking.checkIn)}

                      </div>

                    </div>

                    <div className="backdrop-blur-xl bg-[#FF4D6D]/5 border border-[#FF4D6D]/10 rounded-2xl p-4">

                      <p className="text-sm text-gray-500 font-medium mb-2">
                        Check Out
                      </p>

                      <div className="flex items-center gap-2 font-bold text-gray-800">

                        <Calendar className="w-4 h-4 text-[#FF4D6D]" />

                        {formatDate(booking.checkOut)}

                      </div>

                    </div>

                  </div>

                  {/* PAYMENT */}
                  <div className="xl:col-span-2">

                    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#8458B3] to-[#6b42a0] p-6 text-white shadow-2xl">

                      {/* GLOW */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                      <div className="relative z-10">

                        <p className="text-sm text-white/70">
                          Total Amount
                        </p>

                        <h2 className="text-4xl font-black mt-2">
                          ₹{booking.totalPrice || 0}
                        </h2>

                        <div
                          className={`mt-5 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow ${
                            booking.isPaid
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {booking.isPaid ? "Paid" : "Pending"}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          );
        })

      )}

    </div>

  </div>
);
};

export default Bookings;
