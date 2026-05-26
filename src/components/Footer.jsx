import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: "ri-instagram-line",
      link: "https://instagram.com",
    },
    {
      icon: "ri-facebook-fill",
      link: "https://facebook.com",
    },
    {
      icon: "ri-twitter-x-line",
      link: "https://twitter.com",
    },
  ];

  return (
    <footer className="relative mt-9 px-6 md:px-16 lg:px-24 overflow-hidden">

      {/* Glow BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" />

      <div
        className="relative max-w-7xl mx-auto rounded-[40px] 
       "
      >

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 md:px-14 py-14">

          {/* BRAND */}
          <div>
             {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          {/* ICON */}
          <div
            className="
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br
            from-[#8458b3]
            to-[#6d3fa0]
            flex items-center justify-center
            shadow-lg
            shadow-purple-200/50
            "
          >
            <span className="text-white font-bold text-lg">
              G
            </span>
          </div>

          {/* TEXT */}
          <div className="leading-none">

            <h1 className="text-[22px] font-bold tracking-tight text-gray-900">
              Glamour<span className="text-[#8458b3]">Stays</span>
            </h1>

            <p className="text-[11px] text-gray-400 tracking-[3px] uppercase mt-1">
              Luxury Booking
            </p>

          </div>

        </Link>

            <p className="mt-6 text-gray-600 leading-7 text-sm">
              Experience premium stays, luxury comfort, and unforgettable
              travel moments with GlamourStays.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 mt-8">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-2xl bg-white/20 
                  backdrop-blur-xl border border-white/20
                  flex items-center justify-center text-gray-700
                  hover:bg-[#8458B3] hover:text-white
                  hover:-translate-y-1 transition-all duration-300"
                >
                  <i className={`${item.icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div className="md:mx-auto">
            <h2 className="text-xl font-bold text-[#2c0850] mb-6">
              Quick Links
            </h2>

            <ul className="space-y-4">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="text-gray-600 hover:text-[#8458B3] 
                    transition-all duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-xl font-bold text-[#2c0850] mb-6">
              Contact
            </h2>

            <div className="space-y-5 text-sm text-gray-600">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center">
                  <i className="ri-phone-line text-[#8458B3]" />
                </div>

                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center">
                  <i className="ri-mail-line text-[#8458B3]" />
                </div>

                <span>support@glamourstays.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center">
                  <i className="ri-map-pin-line text-[#8458B3]" />
                </div>

                <span>Chandigarh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="border-t border-white/10 px-8 md:px-14 py-5 
          flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-500 text-center">
            © 2026 GlamourStays. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#8458B3] transition">
              Privacy
            </a>

            <a href="#" className="hover:text-[#8458B3] transition">
              Terms
            </a>

            <a href="#" className="hover:text-[#8458B3] transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;