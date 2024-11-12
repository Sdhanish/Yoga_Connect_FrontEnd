import React, { useEffect, useState } from 'react';
import { Fade, Slide } from "react-awesome-reveal";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import axios from 'axios';

const AdminStats = ({ users}) => {
  const [data , setData] = useState({}); 
  const [Instructors , setInstructors] = useState([]); 
  console.log("🚀 ~ file: AdminStats.jsx:6 ~ AdminStats ~ data:", data)
  const axiosSecure = useAxiosSecure();
  // const axiosFetch = useAxiosFetch();
  useEffect(()=>{
    axiosSecure.get('/admin-stats')
    .then(res => { 
      setData(res.data)
    })
    .catch(err => console.log(err))
  },[])

  useEffect(() => {
    axiosSecure.get("/instructors-stats") // Ensure this endpoint is correct
      .then(response => {
        setInstructors(response.data);
        console.log(response.data);
        
      })
      .catch(error => console.error("Error fetching instructors:", error));
  }, []);

// Get the maximum number of enrollments to scale the status bars
const maxEnrollment = Math.max(...Instructors.map(instructor => instructor.totalEnrolled));

  return (
    <Slide>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Member</h3>
            <p className="text-3xl">{users.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm whitespace-nowrap   tracking-wider">Approved Class</h3>
            <p className="text-3xl">{data.approvedClasses}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Instructors</h3>
            <p className="text-3xl">{data.instructors}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Pending Class</h3>
            <p className="text-3xl">{data.pendingClasses}</p>
          </div>
        </div>
       
              
      </div>
   {/* Instructor Enrollment Status Bars */}
<h2 className="text-xl font-bold ml-8 mt-5">Instructors Status :</h2>

<div className="mt-2 px-4 shadow-md p-3 border-gray-400 w-full lg:w-[93%] ml-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {Instructors.sort((a, b) => b.totalEnrolled - a.totalEnrolled).map((instructor, index) => {
      const maxEnrollment = 100; // Set your max enrollment here or dynamically fetch it
      const widthPercentage = (instructor.totalEnrolled / maxEnrollment) * 100;

      return (
        <div key={index} className="bg-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-thin">{instructor?.instructorName}</h3>
            <span className="text-gray-600">{instructor?.totalEnrolled} Enrolled</span>
          </div>
          <div className="w-full bg-gray-300 h-2 rounded-sm overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-sm transition-all duration-300"
              style={{ width: `${widthPercentage}%` }}
            ></div>
          </div>
        </div>
      );
    })}
  </div>
</div>



    </Slide>
  );
};

export default AdminStats;
