import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion, AnimatePresence } from "framer-motion";

import { X, MapPin, Users, Calendar } from "lucide-react";

const MyBooking = () => {
  const { getToken } = useAuth();
  const { axios } = useContext(AppContext);

  const [bookingData, setBookingData] = useState([]);
  const [timers, setTimers] = useState({});
  const [filter, setFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);

  // ================= FETCH BOOKINGS =================
  const fetchMyBookings = async () => {
    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBookingData(data.bookings);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  // ================= TIMER =================
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };

        bookingData.forEach((b) => {
          if (!b.isPaid && b.status === "pending") {
            const diff =
              15 * 60 - Math.floor((Date.now() - new Date(b.createdAt)) / 1000);

            updated[b._id] = diff > 0 ? diff : 0;
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingData]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // ================= FILTER =================
  const filteredBookings = bookingData.filter((b) => {
    if (filter === "all") return true;
    if (filter === "paid") return b.isPaid;
    if (filter === "pending") return b.status === "pending";
    if (filter === "cancelled") return b.status === "cancelled";

    return true;
  });

  // ================= PAYMENT =================
  const handlePayment = async (booking) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/payment/create-checkout-session",
        {
          roomName: booking.room?.roomType,
          price: booking.totalPrice,
          bookingId: booking._id,
        },
      );

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  // ================= DOWNLOAD PDF =================
  const downloadInvoice = async (booking) => {
    try {
      const element = document.getElementById(`invoice-${booking._id}`);

      if (!element) {
        toast.error("Invoice not found");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`invoice-${booking._id}.pdf`);

      toast.success("Invoice downloaded");
    } catch (error) {
      console.log(error);
      toast.error("Failed to download invoice");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5ff] via-white to-[#f3ecff] py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            My Trips
          </h1>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Manage your hotel bookings, payments, invoices, and luxury stays in
            one place.
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="flex justify-center mb-12">
          <div
            className="
            bg-white/40
            backdrop-blur-2xl
            border border-white/30
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
            rounded-full
            p-2
            flex
            gap-2
          "
          >
            {["all", "pending", "paid", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`
                  px-6 py-3 rounded-full text-sm font-medium
                  transition-all duration-300
                  ${
                    filter === tab
                      ? "bg-gradient-to-r from-[#8458b3] to-[#6d3fa0] text-white shadow-lg"
                      : "text-gray-600 hover:bg-white/50"
                  }
                `}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* BOOKINGS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBookings.map((booking, index) => (
            <React.Fragment key={booking._id}>
              {/* CARD */}
              <motion.div
                onClick={() => setSelectedTrip(booking)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-white/40
                backdrop-blur-2xl
                border border-white/30
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_12px_40px_rgba(132,88,179,0.18)]
                transition-all duration-500
                cursor-pointer
              "
              >
                <div className="p-7 relative z-10">
                  {/* STATUS */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {booking.hotel?.hotelName}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {booking.room?.roomType}
                      </p>
                    </div>

                    <span
                      className={`
                      px-4 py-2 rounded-full text-xs font-semibold
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="mt-7 space-y-4 text-sm">
                    <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#8458b3]/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#8458b3]" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Location</p>

                        <p className="text-gray-800 font-medium">
                          {booking.hotel?.hotelAddress}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#8458b3]/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#8458b3]" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Guests</p>

                        <p className="text-gray-800 font-medium">
                          {booking.persons} Guests
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#8458b3]/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#8458b3]" />
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs">Stay</p>

                        <p className="text-gray-800 font-medium">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-8 flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs">Total Price</p>

                      <h1 className="text-3xl font-bold text-gray-900 mt-1">
                        ₹{booking.totalPrice}
                      </h1>
                    </div>

                    {timers[booking._id] > 0 && (
                      <div
                        className="
                        px-4 py-2 rounded-2xl
                        bg-red-100
                        text-red-600 text-sm font-medium
                      "
                      >
                        ⏳ {formatTime(timers[booking._id])}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ================= HIDDEN INVOICE ================= */}
              <div className="fixed -top-[9999px] left-0">
                <div
                  id={`invoice-${booking._id}`}
                  className="w-[800px] bg-white p-10 text-black rounded-2xl"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center border-b pb-6">
                    {/* LOGO */}

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-4 group">
                      {/* ICON */}
                      <div
                        className="
    w-14 h-14
    rounded-2xl
    bg-gradient-to-br
    from-[#9d72d4]
    via-[#8458b3]
    to-[#6d3fa0]
    shadow-[0_10px_25px_rgba(132,88,179,0.35)]
    flex items-center justify-center
    shrink-0
    "
                      >
                        <span
                          className="
      text-white
      font-extrabold
      text-[28px]
      leading-none
      "
                        >
                          G
                        </span>
                      </div>

                      {/* TEXT */}
                      <div className="flex flex-col justify-center">
                        <h1
                          className="
      text-[30px]
      font-extrabold
      leading-none
      tracking-tight
      text-gray-900
      "
                        >
                          Glamour
                          <span className="text-[#8458b3]">Stays</span>
                        </h1>

                        <p
                          className="
      text-[11px]
      uppercase
      tracking-[5px]
      text-gray-400
      mt-[2px]
      leading-none
      "
                        >
                          Luxury Hotel Booking
                        </p>
                      </div>
                    </Link>

                    <div className="text-right">
                      <h2 className="text-2xl font-bold">INVOICE</h2>

                      <p className="text-gray-500 text-sm">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* HOTEL IMAGE */}
                  {booking.hotel?.images?.[0] && (
                    <div className="mt-6">
                      <img
                        src={`http://localhost:4000${booking.hotel.images[0]}`}
                        alt="hotel"
                        crossOrigin="anonymous"
                        className="w-full h-64 object-cover rounded-3xl"
                      />
                    </div>
                  )}

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 gap-10 mt-10">
                    <div className="space-y-4">
                      <p>
                        <strong>Hotel:</strong> {booking.hotel?.hotelName}
                      </p>

                      <p>
                        <strong>Room:</strong> {booking.room?.roomType}
                      </p>

                      <p>
                        <strong>Guests:</strong> {booking.persons}
                      </p>
                    </div>

                    <div className="space-y-4 text-right">
                      <p>
                        <strong>Check-in:</strong>{" "}
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>Check-out:</strong>{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>Status:</strong> {booking.status}
                      </p>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-10 bg-[#f5f0ff] rounded-2xl p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Total Amount</h2>

                    <h1 className="text-4xl font-bold text-[#8458b3]">
                      ₹{booking.totalPrice}
                    </h1>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-10 text-center text-gray-500">
                    <p>Thank you for booking with GlamourStays ✨</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            className="
            fixed inset-0 z-50
            bg-black/40
            backdrop-blur-md
            flex items-center justify-center
            p-4
          "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 80,
              }}
              transition={{ duration: 0.3 }}
              className="
              w-full max-w-2xl
              rounded-[36px]
              bg-white/40
              backdrop-blur-2xl
              border border-white/30
              shadow-[0_10px_50px_rgba(0,0,0,0.15)]
              overflow-hidden
            "
            >
              {/* HEADER */}
              <div
                className="
                relative
                bg-gradient-to-r
                from-[#8458b3]
                to-[#6d3fa0]
                p-8
                text-white
              "
              >
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="
                  absolute top-5 right-5
                  w-10 h-10 rounded-full
                  bg-white/20
                  hover:bg-white/30
                  flex items-center justify-center
                "
                >
                  <X />
                </button>

                <h2 className="text-3xl font-bold">
                  {selectedTrip.hotel?.hotelName}
                </h2>

                <p className="opacity-90 mt-2">{selectedTrip.room?.roomType}</p>
              </div>

              {/* BODY */}
              <div className="p-8 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white/40 p-5 rounded-3xl">
                    <MapPin className="text-[#8458b3]" />

                    <p className="text-gray-400 text-sm mt-3">Location</p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedTrip.hotel?.hotelAddress}
                    </p>
                  </div>

                  <div className="bg-white/40 p-5 rounded-3xl">
                    <Users className="text-[#8458b3]" />

                    <p className="text-gray-400 text-sm mt-3">Guests</p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {selectedTrip.persons} Guests
                    </p>
                  </div>

                  <div className="bg-white/40 p-5 rounded-3xl md:col-span-2">
                    <Calendar className="text-[#8458b3]" />

                    <p className="text-gray-400 text-sm mt-3">Stay Duration</p>

                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(selectedTrip.checkIn).toLocaleDateString()} →{" "}
                      {new Date(selectedTrip.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4 pt-4">
                  {!selectedTrip.isPaid && (
                    <button
                      onClick={() => handlePayment(selectedTrip)}
                      className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#8458b3]
                      to-[#6d3fa0]
                      text-white
                      font-medium
                    "
                    >
                      Pay Now
                    </button>
                  )}

                  {selectedTrip.isPaid && (
                    <button
                      onClick={() => downloadInvoice(selectedTrip)}
                      className="
                      flex-1
                      py-4
                      rounded-2xl
                      bg-white/50
                      border border-white/40
                    "
                    >
                      Download Invoice
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedTrip(null)}
                    className="
                    px-6
                    rounded-2xl
                    bg-white/40
                    border border-white/30
                  "
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBooking;
