import React from 'react';
import { useUser } from '../../../hooks/useUser';
import welcome from '../../../assets/dashboard/men.png'
import { Link } from 'react-router-dom';
const StudentCP = () => {
    const { currentUser } = useUser();
    return (
        <div className='h-screen flex justify-center items-center bg-gray-100'>
            <div className="">
                <div className="flex justify-center items-center">
                    <img onContextMenu={e => e.preventDefault()} className='h-[200px] w-auto rounded-3xl' placeholder='blur' src={welcome} alt="" />
                </div>
                <h1 className='text-4xl capitalize  font-bold'>Hey, <span className='text-secondary italic'>{currentUser.name}</span> Welcome Our dashboard</h1>
                <p className='text-center text-base'>You can explore our course and start a mindful journey with our team</p>
                <div className="text-center">
                    <h1 className='font-bold'>You jump any page you want from here . </h1>
                    <div className="flex items-center justify-center my-4 gap-3">
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/enrolled-class'>My Enroll</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/my-selected'>My Selected</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/my-payments'>Payment History</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/apply-instructor'>Join as a Instructor</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentCP;