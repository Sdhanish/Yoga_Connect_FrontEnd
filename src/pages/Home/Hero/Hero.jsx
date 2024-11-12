import React from 'react';
import bgImg from '../../../assets/home/Simple-Yoga-Background.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const goToClassesPage = () => {
    navigate('/classes');
  };

  return (
    <div
      className="relative min-h-screen bg-cover"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 0.5) 80%, rgba(34, 197, 94, 0.1) 100%), url(${bgImg})`,
      }}
    >
      {/* Content wrapper to keep text and buttons unaffected by the overlay */}
      <div className="relative min-h-screen flex justify-start pl-11 text-teal-950 items-center">
        <div
          className="md:w-[60%] p-5"
          style={{
            background: "linear-gradient(to bottom right, rgba(34, 197, 94, 0.2), rgba(255, 255, 255, 0) 25%)",
          }}
        >
          <div className="space-y-4 ">
            <p className="md:text-4xl text-2xl text-gray-950">Empower Your Wellness Journey</p>
            <h1 className="md:text-5xl text-4xl font-bold text-gray-800">
              Experience the Best in <br />
              <span className="text-teal-700">Yoga</span> and <span className="text-teal-700">Mindfulness</span> with Us
            </h1>
            <div className="md:w-[90%] text-gray-700">
              <p>
                Explore our advanced yoga and mindfulness platform with dynamic online classes and personalized wellness plans. Connect with experts and a supportive community for holistic health from home.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={goToClassesPage}
                className="px-7 py-3 bg-primary rounded-lg font-bold uppercase transition duration-300 hover:bg-[#11ca58] hover:bg-opacity-80 text-white">
                Join Today
              </button>
              <button
                onClick={goToClassesPage}
                className="px-7 py-3 border border-primary rounded-lg font-bold uppercase transition duration-300 hover:bg-primary hover:bg-opacity-50"
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

export default Hero;
