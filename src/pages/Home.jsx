import React from 'react'
import Hero from '../components/Hero'
import MostPicked from '../components/MostPicked'
import PopularRooms from '../components/PopularRooms'
import Testimonials from '../components/Testimonials'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div className="bg-[#f8f7fc] overflow-hidden">

      <Hero />

      <section className="py-8">
        <MostPicked />
      </section>

      <section className="py-8">
        <PopularRooms />
      </section>

      <section className="py-8">
        <Testimonials />
      </section>

      <section className="py-8 pb-20">
        <NewsLetter />
      </section>

    </div>
  );
};

export default Home;