import React from 'react';
import { Link } from 'react-router-dom'; 
import myVideo from '../assets/4069480-uhd_3840_2160_25fps.mp4';

// ================= ICONS =================
const VideoIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 10.42V4H6v6.42l4.56 4.56a2 2 0 0 0 2.88 0L18 10.42ZM15 7h2v2h-2V7ZM7 7h2v2H7V7Z" />
        <path d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 17H4V4h16Z" />
    </svg>
);

const RoomIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3ZM15 18h-2v-4h-2v4H9v-6.91L12 7.27l3 3.82V18Z" fill="currentColor" />
    </svg>
);

// ================= DATA =================
const offers = [
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/cc7207f2c3d1bf3fa6cd6185c1a4ee84f0361423-700x430.jpg?w=768',
        title: "DREAM. DRIVE. DISCOVER. DELIGHT. (4D)",
        description: "Drive away to enjoy the company of your loved ones and spend unforgettable moments.",
        buttonText: "BOOK NOW",
        path: "/hotels",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/32f316e6179a065e666e274c39c39fa55398227e-700x430.jpg?w=768',
        title: "TAJ LAKE PALACE, UDAIPUR",
        description: "Float into a dream on Udaipur's Lake Pichola, where this majestic palace-turned-hotel offers surreal views.",
        buttonText: "LOGIN / JOIN",
        path: "/login",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/a7781554b1bf548e13b35a4ba28e5697af7d8dc7-700x430.jpg?w=768',
        title: "SUITE SURPRISES- ",
        description: "Member Only Indulge in a stay that goes beyond the ordinary and experience enhanced comfort, added space.",
        buttonText: "BOOK NOW",
        path: "/rooms",
    },
];

const roomImages = [
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/9288ce642c834a00831127d6d433e8b13a1db674-906x972.jpg?w=768',
        title: "The Royal Suite",
        price: "$499/night",
        path: "/room/1",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/7b247247a86c40cd01e1330e07c71287ff26348c-907x973.jpg?w=768',
        title: "Executive Deluxe",
        price: "$299/night",
        path: "/room/2",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/a707a0a1773da92dc8f0c8f50ffd0d93b50757d8-906x972.jpg?w=768',
        title: "Family Interconnect",
        price: "$350/night",
        path: "/room/3",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/feed415480ee5996fd13a5ae1e099c3f6f5fce53-912x966.jpg?w=768',
        title: "Premier Ocean View",
        price: "$550/night",
        path: "/room/4",
    },
    {
        img: 'https://cdn.tajhotels.com/images/ocl5w36p/prod5/ab26ca86816def73001fb4e4af468a6bcd3c53a7-912x966.jpg?w=768',
        title: "Standard Comfort",
        price: "$150/night",
        path: "/room/5",
    },
];

// ================= COMPONENT =================
const ExclusiveOffers = () => {
    const repeatedRoomImages = [...roomImages, ...roomImages, ...roomImages];

    return (
        <>
            <style>
                {`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes autoScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-288px - 1.5rem)); }
                }
                .marquee-scroll {
                    animation: autoScroll 15s linear infinite;
                    will-change: transform;
                }
                .marquee-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            {/* ========== 1. Exclusive Offers Section ========== */}
            <section className='bg-gray-50 py-16 px-4 md:px-8 lg:px-16'>
                <div className='max-w-6xl mx-auto text-center mb-12'>
                    <h2 className='text-4xl font-extrabold text-[#2c0850]'>Exclusive Offers</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                    {offers.map((offer, index) => (
                        <div key={index} className='bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden'>
                            <img
                                src={offer.img}
                                alt={offer.title}
                                className='w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-[1.03]'
                            />
                            <div className='p-6'>
                                <h3 className='text-xl font-bold text-[#2c0850] mb-3'>{offer.title}</h3>
                                <p className='text-gray-600 mb-4 text-sm'>{offer.description}</p>
                                <Link
                                    to={offer.path}
                                    className='block text-center bg-[#8458B3] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#a277d3] transition-colors w-full'
                                >
                                    {offer.buttonText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== 2. Horizontal Scroll Section (Rooms Gallery) ========== */}
            <section className='bg-white py-12 px-4 md:px-8 lg:px-16'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='text-3xl font-extrabold text-center text-[#2c0850] mb-8'>Explore Our Rooms & Media</h2>

                    <div className='mb-12'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl font-bold text-gray-800 flex items-center'>
                                <RoomIcon className="w-6 h-6 mr-2 text-[#8458B3]" />
                                Featured Rooms Gallery
                            </h3>
                            <Link to="/rooms" className='text-[#8458B3] font-semibold hover:text-[#a277d3] transition-colors flex items-center'>
                                View All Rooms &rarr;
                            </Link>
                        </div>

                        <div className='overflow-hidden border rounded-xl shadow-md p-9 bg-gray-50'>
                            <div className='flex space-x-6 pb-9 hide-scrollbar marquee-scroll w-max'>
                                {repeatedRoomImages.map((room, index) => (
                                    <Link
                                        key={index}
                                        to={room.path}
                                        className='flex-shrink-0 w-72 h-80 rounded-xl shadow-lg transition-transform duration-500 hover:scale-[1.02] cursor-pointer bg-white overflow-hidden border border-gray-100'
                                    >
                                        <img
                                            src={room.img}
                                            alt={room.title}
                                            className='w-full h-52 object-cover'
                                        />
                                        <div className='p-4'>
                                            <h3 className='text-lg font-bold text-[#2c0850] mb-1'>{room.title}</h3>
                                            <p className='text-gray-600 text-sm font-semibold'>{room.price}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ========== 3. Video Gallery Section ========== */}
                    <div className='mt-12'>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-2xl font-bold text-gray-800 flex items-center'>
                                <VideoIcon className="w-6 h-6 mr-2 text-[#8458B3]" />
                                Video Highlights
                            </h3>
                            <Link to="/videos" className='text-[#8458B3] font-semibold hover:text-[#a277d3] transition-colors flex items-center'>
                                Watch More Videos &rarr;
                            </Link>
                        </div>

                        <Link
                            to="/videos"
                            className='block p-3 rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl bg-white text-[#2c0850] cursor-pointer'
                        >
                            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                                <div className='flex-1'>
                                    <h4 className='text-4xl font-bold mb-4'>Explore the Visuals</h4>
                                    <div className="mt-4 inline-block bg-[#8458b3] bg-opacity-90 text-white px-5 py-2 rounded-xl font-semibold shadow-lg text-sm sm:text-base">
                                        🌟 Click to open the video gallery page. 🌟
                                    </div>
                                    <p className='text-lg text-[#8555b8] opacity-80 mt-4'>
                                        It's an invitation to immerse yourself in the atmosphere. See the moments of stillness and the luxury that awaits your stay.
                                    </p>
                                </div>

                                <div className='rounded-2xl overflow-hidden w-full md:w-1/2'>
                                    <video
                                        src={myVideo}
                                        controls
                                        muted
                                        loop
                                        className='w-full h-full object-cover rounded-2xl'
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ExclusiveOffers;
