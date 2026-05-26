import React from "react";
import ExclusiveOffers from "../components/ExclusiveOffers";

const About = () => {
  return (
    <section className="bg-gradient-to-b from-white via-purple-50 to-white py-24 px-4 md:px-8 lg:px-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mt-10">
        
        <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
          About Our Platform
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
          Redefining Hotel Booking Experience
        </h2>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-purple-700">
            Glamour Stays
          </span>, your modern hotel booking platform designed to make travel
          effortless, fast, and reliable.  
          <br />
          <br />
          Discover premium hotels, compare real-time prices, explore verified
          amenities, and book your perfect stay instantly — all in one seamless
          experience.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid gap-8 md:grid-cols-3">
        
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            🚀 Fast Booking
          </h3>
          <p className="text-gray-600">
            Book rooms instantly with a smooth, frictionless checkout experience.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            🏨 Verified Hotels
          </h3>
          <p className="text-gray-600">
            All hotels are verified with real photos, ratings, and amenities.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            🔒 Secure Payments
          </h3>
          <p className="text-gray-600">
            Safe and trusted booking system with secure payment handling.
          </p>
        </div>
      </div>

      {/* Offers Section */}
      <div className="mt-20">
        <ExclusiveOffers />
      </div>
    </section>
  );
};

export default About;
