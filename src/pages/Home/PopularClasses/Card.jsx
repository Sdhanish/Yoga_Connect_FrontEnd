import React from 'react';
import { motion } from 'framer-motion';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { toast } from 'react-toastify';
import { useUser } from '../../../hooks/useUser';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Card = ({ name, image, availableSeats, price, totalEnrolled, id: itmId }) => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

 const handleSelect = (id) => {
  if (!currentUser) {
    return toast.error('Please Login First');
  }

  axiosSecure.get(`/cart-item/${id}`).then((res) => {
    if (res.data.classId === id) {
      return toast.error('Already Selected');
    } else {
      const data = {
        classId: id,
        userMail: currentUser.email,
        date: new Date(),
      };

      toast.promise(
        axiosSecure.post('/add-to-cart', data),
        {
          pending: 'Selecting...',
          success: {
            render({ data }) {
              
             
              return 'Selected Successfully';
            },
          },
          error: {
            render({ data }) {
              return `Error: ${data.message}`;
            },
          },
        }
      );
    }
  });
};


  return (
    <motion.div
      className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-[#48b875] overflow-hidden m-4 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <motion.img
          loading='lazy'
          className="h-48 w-full object-cover"
          src={image}
          alt={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        {/* Overlay that appears on hover over the card */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-transparent h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 ">
        <motion.h2
          className="text-xl font-semibold mb-2 dark:text-gray-400 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {name}
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Available Seats: {availableSeats}
        </motion.p>
        <motion.p
          className="text-gray-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Price: {price}
        </motion.p>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Total Students: {totalEnrolled}
        </motion.p>
        <div className="text-center mt-2">
          <motion.button
            onClick={() => handleSelect(itmId)}
            className="px-3 w-full py-1 bg-[#48b875] rounded-xl text-white font-bold mt-2"
          >
            Select
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
