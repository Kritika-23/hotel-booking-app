import React from 'react'
import ExclusiveOffers from '../components/ExclusiveOffers'
const About = () => {
  return (
   <section className='bg-white py-24 px-4 md:px-8 lg:px-16'>
    <div className='max-w-4xl mx-auto text-center mt-12'>
   <h2 className='text-3xl font-bold text-gray-800 mb-3'>About Us</h2>
   <p className='text-gray-600 text-lg leading-relaxed'>

Welcome to Glamour Stays, your trusted hotel booking platform that makes travel simple and stress-free.
Explore top hotels, compare prices, view amenities, and book your stay instantly — all in one place.
Designed with modern technology, Glamour Stays offers a fast, secure, and user-friendly experience on any device.
  
   </p>
   </div>
    <ExclusiveOffers />
   </section>

  )
}

export default About
