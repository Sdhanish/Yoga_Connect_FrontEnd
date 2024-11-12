import React from 'react';
import bgimg from '../../../assets/dashboard/instructor.jpg'
import { Link } from 'react-router-dom';

const InstructorCP = () => {
    return (
        <div className='h-screen flex justify-center items-center bg-gray-100'>
            <div className="">
                <div className="flex justify-center items-center">
                    <img className='h-[200px] w-auto rounded-3xl' placeholder='blur' src={bgimg} alt="" />
                </div>
                <h1 className='text-4xl capitalize  font-bold'>Hi ,welcome to Instructors dashboard</h1>
                <p className='text-center text-base'>Hey Dear , This is a simple dashboard home . Our developer is trying to updating Dashboard </p>
                <div className="text-center">
                    <h1 className='font-bold'>You jump any page you want from here . </h1>
                    <div className="flex items-center justify-center my-4 gap-3">
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/add-class'>Add A Class</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/my-classes'>My Classes</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCP;