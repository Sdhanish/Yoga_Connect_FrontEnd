import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
const Classes = () => {

    useTitle("Classes | Yoga Connect - Connect With your Inner Peace");

    const [hoveredCard, setHoveredCard] = useState(null);
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    const handleHover = (index) => {
        setHoveredCard(index);
    };

    const [classes, setClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosFetch.get('/classes')
            .then(res => setClasses(res.data))
            .catch(err => console.log(err))
    }, [])

    const handelSelect = (id) => {
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
            .then(res => setEnrolledClasses(res.data))
            .catch(err => console.log(err))
        if (!currentUser) {
            return toast.error('Please Login First');
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
            .then(res => {
                if (res.data.classId === id) {
                    return toast.error('Already Selected');
                }
                else if (enrolledClasses.find(item => item.classes._id === id)) {
                    return toast.error('Already Enrolled');
                }
                else {
                    const data = {
                        classId: id,
                        userMail: currentUser.email,
                        date: new Date()
                    }

                    toast.promise(axiosSecure.post('/add-to-cart', data)
                        .then(res => {
                            console.log(res.data);
                        })

                        , {
                            pending: 'Selecting...',
                            success: {
                                render({ data }) {
                                    return `Selected Successfully`;
                                }
                            },
                            error: {
                                render({ data }) {
                                    return `Error: ${data.message}`;
                                }
                            }
                        });
                }
            })

    }


    return (
        <div>

            <div className="mt-20 pt-3">
                <h1 className="text-4xl font-bold text-center text-dark-primary">Classes</h1>
            </div>


            <div className="my-16 w-[90%] gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {classes.map((cls, index) => (
                    <div
                        key={index}
                        className={`relative hover:-translate-y-2  duration-150 hover:ring-[2px] hover:ring-secondary w-64  mx-auto ${cls.availableSeats < 1 ? 'bg-[#06d0b1]' : 'bg-white'} dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleHover(null)}
                    >
                        <div className="relative h-48">
                            <div
                                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-60' : ''
                                    }`}
                            />
                            <img
                                src={cls.image}
                                alt="Course Image"
                                className="object-cover w-full h-full"
                            />
                            <Transition
                                show={hoveredCard === index}
                                enter="transition-opacity duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">

                                    <button onClick={() => handelSelect(cls._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? cls.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || cls.availableSeats < 1} className="px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 hover:bg-[#03a363] rounded-md">
                                        Select
                                    </button>

                                </div>
                            </Transition>
                        </div>
                        <div className="px-6 py-2 dark:bg-gray-950 ">
                            <h3 className={`${cls.name.length > 25 ? 'text-[14px]' : 'text-[16px]'}  font-bold dark:text-gray-400 text-gray-800  mb-2`}>{cls.name}</h3>
                            <p className="dark:text-gray-400 text-xs text-gray-800">Instructor : {cls.instructorName}</p>
                            <div className="flex items-center justify-between mt-2 text-gray-700">
                                <span className="dark:text-gray-400 text-xs">Available Seats: <span className='text-secondary'>{cls.availableSeats}</span> </span>
                                <span className="text-green-500 font-semibold">&#8377;{cls.price}</span>
                            </div>
                            
                            <Link to={`/class/${cls._id}`}><button className="px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 hover:bg-[#04be73] rounded-xl">
                                        View
                                    </button></Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 border-t border-gray-100 pt-8">
          <p className="text-center text-sm/relaxed text-gray-500">
            ©sdhanish92@gmail.com 2024. All rights reserved.
            <br />
            Created with &nbsp;
            <a className="text-secondary dark: transition hover:text-secondary dark:/75">
              Yoga Connect
            </a>
          </p>
        </div>
        </div>
    );
};

export default Classes;
