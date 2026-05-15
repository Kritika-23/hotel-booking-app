import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom'; // <-- Import useLocation
import { toast } from 'react-hot-toast'; // <-- For notifications
import ExclusiveOffers from '../components/ExclusiveOffers';
import { motion } from "framer-motion";
import { Star } from 'lucide-react';
import { Link } from "react-router-dom";

const Hotels = () => {
  const { axios } =  useContext(AppContext);
  const location = useLocation(); // Get the current location object
  const searchQuery = location.search; // Get the query string (e.g., ?destination=...)

  const [searchedHotels, setSearchedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch hotels based on the search query
  const fetchHotels = async () => {
    setLoading(true);
    try {
      // Use the search route if there's a query, otherwise use the get-all route
      const endpoint = searchQuery 
        ? `/api/hotel/search${searchQuery}` 
        : `/api/hotel/get-all`; 
  
      const { data } = await axios.get(endpoint);
    
      if (data.success) {
        setSearchedHotels(data.hotels);
      } else {
        toast.error(data.message || "Failed to fetch hotels.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.response?.data?.message || "Error fetching hotel data.");
    } finally {
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchHotels();
  }, [searchQuery]); // Re-run fetch whenever the search query changes

  // Use the fetched hotels. The context's hotelData might be the overall list,
  // so we'll display the results from this component's state.
  const hotelsToDisplay = searchedHotels; 

  if (loading) {
    return <div className='py-24 text-center text-xl text-[#8458b3]'>Loading Hotels...</div>;
  }
  
  if (hotelsToDisplay.length === 0) {
    return (
      <div className='py-24 text-center'>
        <h1 className='text-5xl font-bold text-[#2c0850] my-8 px-2'>
          No Hotels Found 
        </h1>
        <p className='text-xl text-gray-600'>Try adjusting your search criteria.</p>
        <ExclusiveOffers />
      </div>
    );
  }
  return (
    <div className='py-24 mx-w-7xl  mx-auto'>
      <h1 className='text-5xl font-bold text-[#2c0850] my-8 px-2 text-center'>
            All Hotels
      </h1>
      <h2 className='text-2xl font-semibold text-[#8458b3] my-8 px-2 text-center'>
  Explore Our Preferred Hotels
</h2>
 

<div className="max-w-5xl mx-auto flex flex-col gap-6">
  
{hotelsToDisplay.map((item, index) => (
  <Link to={`/hotel/${item._id}`} key={item._id}>
    <motion.div
  className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 border rounded-xl shadow hover:shadow-lg transition w-full bg-white cursor-pointer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
  whileHover={{ scale: 1.02 }}
>
      <img
      //  src={`http://localhost:4000/images/${item.image}`}
        src={`http://localhost:4000${item.images?.[0]}`}

        alt={item.hotelName}
        className="w-full md:w-56 h-48 object-cover rounded-xl border-2 border-[#ba8dea]"
        
      />
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-[#2c0850]">{item.hotelName}</h2>
        <p className="font-bold text-gray-800">{item.hotelAddress}</p>

        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="text-gray-800 font-medium">{item.rating}/5</span>
        </div>
        <p className="text-green-600 font-medium">Price: ₹{item.price}</p>
        <p className="text-gray-700">Amenities: {item.amenities}</p>
      </div>
    </motion.div>
  </Link>
))}

  
</div>


      
       <ExclusiveOffers />
    </div>
    
  )
}

export default Hotels