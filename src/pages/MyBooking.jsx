import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import { useAuth } from "@clerk/clerk-react";
import {
  MapPin,
  Users,
  CreditCard,
  Calendar,
  FileDown,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext.jsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../assets/logo.png";

const MyBooking = () => {
  const { getToken } = useAuth();
  const { axios } = useContext(AppContext);

  const [bookingData, setBookingData] = useState([]);
  const [timers, setTimers] = useState({});
  const [filter, setFilter] = useState("all");

  const [cancelModal, setCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // ================= FETCH BOOKINGS =================
  const fetchMyBookings = async () => {
    try {
      const token = await getToken({ template: "backend" });

      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setBookingData(data.bookings);
    } catch {
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
              15 * 60 -
              Math.floor((Date.now() - new Date(b.createdAt)) / 1000);

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
  });

  // ================= CANCEL BOOKING =================
  const handleCancel = async () => {
    try {
      const token = await getToken({ template: "backend" });

      await axios.put(
        `/api/bookings/cancel/${selectedBooking._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking cancelled");
      setCancelModal(false);
      fetchMyBookings();
    } catch {
      toast.error("Cancel failed");
    }
  };

  // ================= PDF INVOICE =================
  const downloadInvoice = async (booking) => {
    const invoiceElement = document.getElementById(
      `invoice-${booking._id}`
    );

    if (!invoiceElement) {
      toast.error("Invoice not found");
      return;
    }

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${booking._id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-28">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-6">
          My Bookings
        </h1>

        {/* FILTERS */}
        <div className="flex justify-center gap-3 mb-10">
          {["all", "pending", "paid", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === tab
                  ? "bg-purple-600 text-white"
                  : "bg-white border"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-600">
              No bookings found
            </h2>
            <p className="text-gray-400">
              Try changing filter or book a room
            </p>
          </div>
        )}

        {/* LIST */}
     <div className="grid gap-6">
  {filteredBookings.map((booking) => {
    console.log(booking);

    return (
      <div
        key={booking._id}
        className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition p-6 border border-gray-100"
      >
        <div className="grid md:grid-cols-12 gap-6 items-center">

          {/* LEFT */}
          <div className="md:col-span-5 space-y-2">
            <h3 className="text-xl font-bold text-gray-900">
              {booking.hotel?.hotelName}
            </h3>

            <p className="text-sm text-gray-500">
              {booking.room?.roomType}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-purple-500" />
              {booking.hotel?.hotelAddress}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4 text-purple-500" />
              {booking.persons} Guests
            </div>

            <span
              className={`inline-block px-3 py-1 text-xs rounded-full font-semibold text-white ${
                booking.status === "confirmed"
                  ? "bg-green-500"
                  : booking.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {booking.status.toUpperCase()}
            </span>
          </div>

          {/* MIDDLE */}
          <div className="md:col-span-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(booking.checkIn).toLocaleDateString()} →{" "}
              {new Date(booking.checkOut).toLocaleDateString()}
            </div>

            <p className="mt-2">
              <b>ID:</b> {booking.bookingId}
            </p>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-4 flex flex-col items-end gap-3">

            <p className="text-2xl font-bold">
              ₹{booking.totalPrice}
            </p>

            {timers[booking._id] > 0 && (
              <p className="text-xs text-red-500">
                Expires in {formatTime(timers[booking._id])}
              </p>
            )}

            <div className="flex gap-2 flex-wrap justify-end">

              {!booking.isPaid &&
                booking.status === "pending" && (
                  <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm">
                    <CreditCard className="w-4 h-4 inline mr-1" />
                    Pay
                  </button>
                )}

              <button
                onClick={() => downloadInvoice(booking)}
                className="px-4 py-2 border rounded-xl text-sm flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Invoice
              </button>

              {booking.status === "pending" && (
                <button
                  onClick={() => {
                    setSelectedBooking(booking);
                    setCancelModal(true);
                  }}
                  className="px-4 py-2 text-red-500 text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>

        {/* CANCEL MODAL */}
        {cancelModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-80">
              <h2 className="text-lg font-bold">Cancel Booking?</h2>

              <div className="flex gap-2 mt-4">
                <Button onClick={handleCancel} className="bg-red-500">
                  Yes Cancel
                </Button>
                <Button
                  onClick={() => setCancelModal(false)}
                  className="bg-gray-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* HIDDEN INVOICE TEMPLATE */}
       <div style={{ position: "absolute", left: "-9999px" }}>
  {bookingData.map((b) => (
    <div
      key={b._id}
      id={`invoice-${b._id}`}
      style={{
        width: "650px",
        padding: "30px",
        background: "white",
        fontFamily: "Arial",
        color: "#333",
      }}
    >
     {/* HEADER */}
<div
  style={{
    borderBottom: "2px solid #eee",
    paddingBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  {/* LEFT SIDE */}
  <div>
    <img
      src={logo}
      alt="logo"
      style={{
        width: "120px",
        objectFit: "contain",
      }}
    />

    <p
      style={{
        margin: 0,
        fontSize: "12px",
        color: "gray",
      }}
    >
      Official Booking Invoice
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div style={{ textAlign: "right" }}>
    <h2 style={{ margin: 0 }}>INVOICE</h2>

    <p style={{ fontSize: "12px", color: "gray" }}>
      {new Date().toLocaleDateString()}
    </p>
  </div>
</div>

      {/* TITLE */}
      <h2 style={{ textAlign: "right", marginTop: "10px" }}>
        INVOICE
      </h2>

      {/* BODY */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        
        <div>
          <p><b>Hotel:</b> {b.hotel?.hotelName}</p>
          <p><b>Room:</b> {b.room?.roomType}</p>
          <p><b>Guests:</b> {b.persons}</p>
        </div>

        <div style={{ textAlign: "right" }}>
         <p>
  <b>Check-in:</b>{" "}
  {new Date(b.checkIn).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>

<p>
  <b>Check-out:</b>{" "}
  {new Date(b.checkOut).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>
        <p><b>ID:</b> {b.bookingId}</p>
          <p><b>Status:</b> {b.status}</p>
        </div>
      </div>

      {/* TOTAL */}
     
        <div
  style={{
    marginTop: "25px",
    background: "#f5f3ff",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  }}
>
  <h2 style={{ color: "#7c3aed", margin: 0 }}>
    Total Amount: ₹{b.totalPrice}
  </h2>
</div>
   
      {/* FOOTER */}
      <div style={{ marginTop: "30px", textAlign: "center", fontSize: "12px", color: "gray" }}>
        Thank you for booking with GlamourStays ✨
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default MyBooking;