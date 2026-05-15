import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import ExclusiveOffers from '../components/ExclusiveOffers';
    
    const Rooms = () => {
      const {roomData} = useContext(AppContext)
      return (
        <div className='py-24 max-w-7xl mx-auto'>
          <h1 className='text-5xl font-bold text-[#2c0850] my-8 px-2 text-center'>
          Rooms
          </h1>
          <h1 className='text-2xl font-semibold text-[#8458b3] my-8 px-2 text-center'>Explore our Curated Comfort collection.</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12'>
          {roomData.map((room)=>(
           <RoomCard key={ room._id} room={room} />
          ))}
       </div>
        <ExclusiveOffers />
    </div>
      );
    };
    
    export default Rooms
    