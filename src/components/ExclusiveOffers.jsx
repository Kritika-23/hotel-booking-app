import React from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// ================= DATA =================
const offers = [
  {
    title: "🔥 20% OFF First Booking",
    desc: "Use code WELCOME20 and save instantly on your first stay.",
    code: "WELCOME20",
    bg: "bg-purple-50",
  },
  {
    title: "💸 Weekend Special Deal",
    desc: "Flat ₹1000 off on weekend hotel bookings.",
    code: "WEEKEND1000",
    bg: "bg-blue-50",
  },
  {
    title: "🏨 Luxury Upgrade Offer",
    desc: "Free room upgrade on premium bookings (limited time).",
    code: "UPGRADEFREE",
    bg: "bg-pink-50",
  },
  {
    title: "🎉 Festive Sale Offer",
    desc: "Extra savings during festive season bookings.",
    code: "FESTIVE25",
    bg: "bg-yellow-50",
  },
];

// ================= COMPONENT =================
const ExclusiveOffers = () => {
  return (
    <section className="py-14 px-4 md:px-10 lg:px-20 bg-white">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Exclusive Offers
        </h2>
        <p className="text-gray-500 mt-2">
          Limited time deals & coupons for your stay
        </p>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {offers.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`${item.bg} border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition h-full`}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {item.desc}
              </p>

              {/* Coupon box */}
              <div className="mt-4 flex items-center justify-between bg-white border rounded-lg px-3 py-2">
                <span className="font-mono text-sm font-semibold text-purple-700">
                  {item.code}
                </span>

                <button
                  onClick={() => navigator.clipboard.writeText(item.code)}
                  className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition"
                >
                  Copy
                </button>
              </div>

              <Link
                to="/hotels"
                className="block mt-4 text-center text-sm font-medium text-purple-700 hover:underline"
              >
                Book Now →
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ExclusiveOffers;