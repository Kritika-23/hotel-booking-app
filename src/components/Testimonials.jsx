import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {

  return (

    <div className="py-20 px-6 bg-[#f8f7fc]">

      {/* HEADING */}
      <div className="text-center mb-14">

        <p className="text-xl font-medium text-[#8458b3] uppercase tracking-wide">
          Guest Reviews
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
          What Our Guests Say
        </h1>

      </div>

      {/* TESTIMONIAL CARDS */}
      <div className="flex flex-wrap items-center justify-center gap-10">

        {/* First Card */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 4 }}
          className="relative w-80 rounded-[32px] border border-white/30 
          bg-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.12)] 
          overflow-hidden hover:-translate-y-2 hover:shadow-2xl 
          transition-all duration-500"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center px-7 py-10">

            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-white/40 shadow-lg"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="userImage1"
            />

            <div className="pt-5 text-center">
              <h1 className="text-xl font-bold text-[#2c0850]">
                Donald Jackman
              </h1>

              <p className="text-sm text-gray-600 mt-1">
                Luxury Travel Blogger
              </p>
            </div>

            <p className="text-gray-600 text-center leading-7 mt-6 text-sm">
              Staying here felt like a true luxury experience. Beautiful ambience,
              seamless booking, and exceptional hospitality.
            </p>

            {/* Rating */}
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FACC15"
                  />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Second Card */}
        <motion.div
          animate={{ y: [0, -22, 0] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 3.5 }}
          className="relative w-80 rounded-[32px] border border-white/30 
          bg-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.12)] 
          overflow-hidden hover:-translate-y-2 hover:shadow-2xl 
          transition-all duration-500"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center px-7 py-10">

            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-white/40 shadow-lg"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="userImage2"
            />

            <div className="pt-5 text-center">
              <h1 className="text-xl font-bold text-[#2c0850]">
                Richard Nelson
              </h1>

              <p className="text-sm text-gray-600 mt-1">
                Travel Influencer
              </p>
            </div>

            <p className="text-gray-600 text-center leading-7 mt-6 text-sm">
              The rooms, hospitality, and premium services exceeded my expectations.
              Definitely booking again.
            </p>

            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FACC15"
                  />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Third Card */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 4 }}
          className="relative w-80 rounded-[32px] border border-white/30 
          bg-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.12)] 
          overflow-hidden hover:-translate-y-2 hover:shadow-2xl 
          transition-all duration-500"
        >

          <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center px-7 py-10">

            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-white/40 shadow-lg"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
              alt="userImage3"
            />

            <div className="pt-5 text-center">
              <h1 className="text-xl font-bold text-[#2c0850]">
                James Washington
              </h1>

              <p className="text-sm text-gray-600 mt-1">
                Marketing Manager
              </p>
            </div>

            <p className="text-gray-600 text-center leading-7 mt-6 text-sm">
              A perfect blend of comfort and elegance. The experience felt truly
              premium from start to finish.
            </p>

            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FACC15"
                  />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Testimonials;
