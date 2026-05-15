import React from "react";
import { Building2, Calendar, DollarSign, Star } from "lucide-react";

const StatsCards = ({ hotels, bookings }) => {

  const totalHotels = hotels?.length || 0;
  const totalBookings = bookings?.length || 0;

  const revenue =
  bookings?.reduce(
    (acc, booking) => acc + Number(booking.totalPrice || 0),
    0
  ) || 0;

 const avgRating =
  hotels?.length > 0
    ? hotels.reduce(
        (acc, hotel) => acc + Number(hotel.rating || 0),
        0
      ) / hotels.length
    : 0;

  const cards = [
    {
      title: "Total Hotels",
      value: totalHotels,
      icon: <Building2 size={22} />,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Bookings",
      value: totalBookings,
      icon: <Calendar size={22} />,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      icon: <DollarSign size={22} />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Avg Rating",
      value: avgRating.toFixed(1),
      icon: <Star size={22} />,
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {cards.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 border border-gray-100"
        >

          {/* ICON BACKGROUND */}
          <div
            className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 bg-gradient-to-r ${item.color}`}
          ></div>

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold mt-1">
                {item.value}
              </h2>
            </div>

            <div className={`p-3 rounded-xl text-white bg-gradient-to-r ${item.color}`}>
              {item.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default StatsCards;