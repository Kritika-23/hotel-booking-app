import React from 'react'

const NewsLetter = () => {
 return (
  <div className="py-16 px-6">
    <div
      className="max-w-6xl mx-auto rounded-[36px] border border-white/20 
      bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.12)]
      p-10 flex md:flex-row flex-col items-start md:items-center justify-between gap-10"
    >
      
      {/* LEFT */}
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-[#2c0850] leading-tight">
          Subscribe to our newsletter
        </h1>

        <p className="text-gray-600 mt-4 leading-7">
          Get luxury hotel deals, exclusive offers, and travel inspiration
          delivered directly to your inbox.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <input
            className="py-3 px-5 w-full outline-none border border-white/30 
            bg-white/20 backdrop-blur-xl rounded-2xl text-gray-700 
            placeholder:text-gray-500 focus:border-[#8458B3] transition-all"
            type="text"
            placeholder="Enter your email"
          />

          <button
            className="bg-[#8458B3] hover:bg-[#7345a5] transition-all 
            px-6 py-3 rounded-2xl text-white font-medium shadow-lg"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* CARD 1 */}
      <div className="space-y-4 md:max-w-52">
        <div className="flex items-center gap-3">
          <div
            className="bg-white/20 backdrop-blur-xl border border-white/20 
            w-max p-3 rounded-2xl shadow-md"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.834 20.167H9.167c-3.457 0-5.186 0-6.26-1.074s-1.074-2.802-1.074-6.26V11c0-3.457 0-5.185 1.074-6.26 1.074-1.073 2.803-1.073 6.26-1.073h3.667c3.456 0 5.185 0 6.259 1.074s1.074 2.802 1.074 6.26v1.833c0 3.457 0 5.185-1.074 6.259-.599.599-1.401.864-2.593.981M6.417 3.667V2.292m9.167 1.375V2.292m4.125 5.958H9.854m-8.02 0h3.552"
                stroke="#8458B3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-[#2c0850]">
            Weekly Articles
          </h3>
        </div>

        <p className="text-gray-600 leading-7">
          Get curated travel tips, destination guides, and luxury hotel updates
          every week.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="space-y-4 md:max-w-52">
        <div className="flex items-center gap-3">
          <div
            className="bg-white/20 backdrop-blur-xl border border-white/20 
            w-max p-3 rounded-2xl shadow-md"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.834 3.208v6.875-5.958a1.375 1.375 0 1 1 2.75 0v5.958-3.208a1.375 1.375 0 1 1 2.75 0v7.791a5.5 5.5 0 0 1-5.5 5.5H11.8a5.5 5.5 0 0 1-3.76-1.486l-4.546-4.261a1.594 1.594 0 1 1 2.218-2.291l1.623 1.623V5.958a1.375 1.375 0 1 1 2.75 0v4.125-6.875a1.375 1.375 0 1 1 2.75 0"
                stroke="#8458B3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-[#2c0850]">
            No Spam
          </h3>
        </div>

        <p className="text-gray-600 leading-7">
          Only premium offers, important updates, and exclusive hotel deals.
        </p>
      </div>
    </div>
  </div>
);
}

export default NewsLetter;