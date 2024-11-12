import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { FcElectricalSensor } from "react-icons/fc";
import Swal from "sweetalert2";
import Switch from "@mui/material/Switch";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utilities/providers/AuthProvider";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import defaultImg from "../../assets/gallary/image1.jpg";
const navLinks = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Instructors",
    route: "/instructors",
  },
  {
    name: "Classes",
    route: "/classes",
  },
];
const theme = createTheme({
  palette: {
    primary: {
      main: "#48b875", // Set the primary color
    },
    secondary: {
      main: "#48b875", // Set the secondary color
    },
  },
});

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navBg, setNavBg] = useState("bg-[#15151580]");
  const [isFixed, setIsFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handelLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure to logout ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout.!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire(
              "Logged out!",
              "You are logged out successful.",
              "success"
            );
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  console.log(user);

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkMode]);
  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      if (isHome) {
        setNavBg(
          "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:bg-black dark:text-white text-black"
        );
      } else {
        setNavBg("bg-white dark:bg-black dark:text-white text-black");
      }
    } else {
      // setNavBg(`dark:text-white ${isHome ? 'text-white bg-transparent' : 'text-black dark:text-white dark:bg-black'}`);
      setNavBg(
        `${
          isHome || location.pathname === "/"
            ? "bg-transparent"
            : "bg-white dark:bg-black"
        } dark:text-white`
      );
    }
  }, [scrollPosition]);

  console.log(user);

  return (
    <motion.nav
      className={`${
        isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2xl"
      }  ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out  w-full z-10 text-lg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div className="flex px-4 items-center justify-between py-4">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center"
          >
            <div className={``}>
              <h1 className="text-2xl font-Cinzel  inline-flex gap-3  items-center font-bold text-teal-600">
                Yoga
                <span className="dark:text-teal-600 text-teal-600">Connect</span>
                <img
                  src="/yoga-logo.jpeg"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
              </h1>
              <p className="font-bold text-[13px]  tracking-[8px] dark:text-teal-600">
                Connect Deeper
              </p>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <FaBars className="h-6  hover:text-primary w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden  text-black dark:text-white md:block text-base uppercase tracking-widest">
            <div className="flex text-primary font-semibold">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      className={({ isActive }) =>
                        `font-bold  ${
                          isActive
                            ? "text-green-600"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary relative group transition duration-300`
                      }
                      to={link.route}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                      />
                    </NavLink>
                  </li>
                ))}
                {user ? null : isLogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300 relative group`
                      }
                    >
                      Register
                      <span
                        className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                      />
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300 relative group`
                      }
                    >
                      Login
                      <span
                        className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                      />
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${
                                navBg.includes("bg-transparent")
                                  ? "text-black"
                                  : "text-black dark:text-white"
                              }`
                        } hover:text-secondary duration-300 relative group`
                      }
                    >
                      Dashboard
                      <span
                        className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                      />
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      src={
                        user.photoURL ||
                        (user.providerData && user.providerData[0].photoURL) ||
                        defaultImg
                      }
                      className="h-[40px] rounded-full w-[40px]"
                      alt=""
                    />
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      className="font-thin text-sm
                                     px-2 py-2 bg-secondary text-black rounded-md uppercase "
                      onClick={handelLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
                <li>
                  <ThemeProvider theme={theme}>
                    <div className="flex flex-col justify-center items-center">
                      <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                      <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} ${isDarkMode ? 'text-xs font-thin' : 'text-xs font-thin'}`}>
                      {isDarkMode ? 'Dark' : 'Light'}</h1>
                    </div>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-2 w-full bg-black"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              {navLinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-white"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                    to={link.route}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                    />
                  </NavLink>
                </li>
              ))}
              {user ? null : isLogin ? (
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-black"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Register
                    <span
                      className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                    />
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-black"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Login
                    <span
                      className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                    />
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : `${
                              navBg.includes("bg-transparent")
                                ? "text-black"
                                : "text-black dark:text-white"
                            }`
                      } hover:text-secondary duration-300`
                    }
                  >
                    Dashboard
                    <span
                      className={`absolute left-0 bottom-[-6px] h-0.5 w-full bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100`}
                    />
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <img
                    src={user?.photoURL || `${bgImg}`}
                    className="h-[40px] rounded-full w-[40px]"
                    alt=""
                  />
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    className="font-bold px-3 py-2 bg-secondary text-black rounded-sm not-italic"
                    onClick={handelLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}

              {/* Add more mobile menu links as needed */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;
