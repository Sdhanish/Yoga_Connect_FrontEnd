import React from 'react';
import bgImg from '../../../assets/gallary/ba11.jpg';
import { useNavigate } from 'react-router-dom';

const Hero2 = () => {
  const navigate = useNavigate();
  const classpages = () => {
    navigate('/classes');
  };

  return (
 <div
           className="relative min-h-screen bg-cover"
           style={{
            backgroundImage: `
             linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 75%),
            linear-gradient(to right, rgba(255, 255, 255, 0.9) 39%, rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255,0)), 
            url(${bgImg})
          `,
           }}
         >
      {/* Content wrapper to keep text and buttons unaffected by the overlay */}
      <div className="relative min-h-screen flex justify-start pl-11 text-white items-center">
        <div
          className="md:w-[60%] p-5"
          style={{
            background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(255, 255, 255, 0) 25%)",
          }}
        >
          <div className="space-y-4">
            <p className="md:text-4xl text-2xl text-gray-900">Achieve Total Wellness with</p>
            <h1 className="md:text-5xl text-4xl text-teal-700 font-bold">
              Our <span className='text-gray-900'>Yoga</span> and <span className='text-gray-900'>Mindfulness</span> <br />
              Experience
            </h1>
            <div className="md:w-[80%] text-gray-700">
              <p>
                Discover a transformative path to holistic well-being with our top-notch yoga and mindfulness platform. We offer expert guidance, personalized classes, and a supportive community to help you harmonize your mind and body, fostering <br />balance and inner peace
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={classpages}
                className="px-7 py-3 bg-primary rounded-lg font-bold uppercase transition duration-300 hover:bg-[#11ca58] hover:bg-opacity-80 text-white"
              >
                Join Today
              </button>
              <button
                onClick={classpages}
                className="px-7 py-3 border border-primary rounded-lg font-bold uppercase transition duration-300 hover:bg-primary hover:bg-opacity-50 text-gray-800"
              >
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
