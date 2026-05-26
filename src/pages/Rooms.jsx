import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import ExclusiveOffers from '../components/ExclusiveOffers';
    
    const Rooms = () => {
      const {roomData} = useContext(AppContext)
      return (
        <div className=' text-center py-24 max-w-7xl mx-auto'>
          <p className="text-xl font-medium text-[#8458b3] uppercase tracking-wide">
  Luxury Rooms
</p>

<h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3">
  Discover Your Perfect Stay
</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 max-w-7xl mx-auto mt-12'>
          {roomData.map((room)=>(
           <RoomCard key={ room._id} room={room} />
          ))}
       </div>
        <ExclusiveOffers />
    </div>
      );
    };
    
    export default Rooms
    