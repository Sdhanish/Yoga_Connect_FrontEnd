import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdBookOnline } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import bannerImg1 from "../../assets/home/banner-1.jpg";
import girImage from "../../assets/home/girl.jpg";

const SingleClass = () => {
  const course = useLoaderData();
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate=useNavigate();

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  // console.log(course)
  const handelSelect = (id) => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));
    if (!currentUser) {
      return toast.error("Please Login First");
    }
    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        if (res.data.classId === id) {
          return toast.error("Already Selected");
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          return toast.error("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };

          toast.promise(
            axiosSecure.post("/add-to-cart", data).then((res) => {
              console.log(res.data);
              navigate("/dashboard/my-selected");
            }),

            {
              pending: "Selecting...",
              success: {
                render({ data }) {
                  return `Selected Successfully`;
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
    <>
      <div
        className=" font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[80%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        {/* breadcrumb or header */}
        <div className="breadcrumbs bg-[#f1faf4] py-5 mt-20 bg-cover dark:bg-[#070807] dark:text-gray-100 ">
          <div className="container text-center text-2xl font-bold tracking-[8px] ">
            <h2 className="text-green-800 font-bold dark:text-white">COURSE DETAILS</h2>
          </div>
        </div>

        <div className="nav-tab-wrapper tabs mt-3">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
              <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[300px] h-[350px] course-main-thumb">
                    <img
                      src={course.image}
                      alt=""
                      className=" rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-2xl mt-4 dark:text-white">{course.name}</h2>

                  <div className="nav-tab-wrapper mt-2">
                    <div id="tabs-content ">
                      <div id="tab1" className="tab-content">
                        <div>
                          <p className="mt-1 dark:text-white">{course.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="author-meta mt-3 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div>
                      <span className=" text-secondary  ">
                        Last Updated:
                        <a href="#" className=" text-black ml-1 dark:text-white">
                          {new Date(course.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                    
                  </div>
                  <div className="wdiget">
                    <h4 className=" widget-title mt-3 mb-3 dark:text-white">Related Courses:</h4>
                    <ul className="list grid grid-cols-1 sm:grid-cols-2 gap-6">
  {classes.map((rclass, index) => (
    <li key={index} className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
      <div className="flex-none mb-8">
        <div className="h-20 w-20 rounded">
          <Link to={`/classes`}>
            <img
              src={rclass.image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-1 font-semibold text-black">{rclass.name}</div>
        <span className="text-secondary font-semibold">&#8377;{rclass.price}</span>
      </div>
    </li>
  ))}
</ul>

                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0 dark:text-white">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="wdiget custom-text space-y-5 ">
                    <a className="h-[220px]  rounded relative block" href="#">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${
                          course.videoLink.split("youtu.be/")[1].split("?")[0]
                        }?start=0&end=10&autoplay=1&rel=0`}
                        title={course.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </a>
                    <h3 className="dark:text-white">${course.price}</h3>
                    <button
                      onClick={() => handelSelect(course._id)}
                      title={
                        role === "admin" || role === "instructor"
                          ? "Instructor/Admin Can not be able to select "
                            ? course.availableSeats < 1
                            : "No seat avalible"
                          : "You can select this classes"
                      }
                      disabled={
                        role === "admin" ||
                        role === "instructor" ||
                        course.availableSeats < 1
                      }
                      className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white dark:text-white "
                    >
                      Enroll Now
                    </button>
                    <ul className="list  ">
                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex" />
                          <div className=" text-black font-semibold dark:text-white">
                            Instructor
                          </div>
                        </div>
                        <div className="flex-none dark:text-white">{course.instructorName}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUsers />
                          <div className=" text-black font-semibold dark:text-white">
                            Enrolled
                          </div>
                        </div>
                        <div className="flex-none dark:text-white">{course.totalEnrolled}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUsers />
                          <div className=" text-black font-semibold dark:text-white">
                            Available Seats
                          </div>
                        </div>
                        <div className="flex-none dark:text-white">{course.availableSeats}</div>
                      </li>
                    </ul>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;
