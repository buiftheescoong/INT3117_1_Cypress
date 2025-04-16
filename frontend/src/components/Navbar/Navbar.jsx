import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";
import logo from "../../assets/images/imagelogo.png";

function Navbar() {
  const { user, token } = useContext(authContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  const handleMouseEnter = () => setDropdownVisible(true);

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setDropdownVisible(false), 4000);
    return () => clearTimeout(timeout);
  };

  const toggleMobileMenu = () => setMobileMenuVisible(!isMobileMenuVisible);

  const isUserLoggedIn = Boolean(localStorage.getItem("token"));
  const profilePic =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";

  return (
    <header className="sticky top-0 left-0 bg-[#00008B] w-full px-6 py-2 shadow-md z-50">
      <nav className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link to={"/"} className="flex-shrink-0">
          <img src={logo} alt="QAIRLINE" className="h-16 w-auto" />
        </Link>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Main menu */}
        <ul
          className={`${
            isMobileMenuVisible ? "block" : "hidden"
          } md:flex md:items-center gap-6 rounded-[25px] text-[18px] md:static p-[33px] absolute top-16 right-0 w-full bg-[#00008B] md:bg-transparent shadow-md md:shadow-none z-50`}
        >
          <li>
            <Link to={"/"} className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/bookgui"} className="text-white hover:underline">
              Booking Guide
            </Link>
          </li>
          <li
            className="relative key-info-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="text-white hover:underline">Key Info</div>
            {isDropdownVisible && (
              <ul className="absolute left-0 top-8 bg-white shadow-lg border border-gray-300 rounded-lg w-64 z-50">
                <li className="p-3 border-b hover:bg-gray-100 text-[#00008B]">
                  <Link to={"/bh"}>
                    <strong>Insurance</strong>
                    <p className="text-sm text-gray-500">
                      Feel secure and comfortable with reputable insurance
                      programs...
                    </p>
                  </Link>
                </li>
                <li className="p-3 hover:bg-gray-100 text-[#00008B]">
                  <Link to={"/taxi"}>
                    <strong>
                      Taxi Service{" "}
                      <span className="bg-red-500 text-white px-1 py-0.5 text-xs rounded">
                        HOT
                      </span>
                    </strong>
                    <p className="text-sm text-gray-500">
                      Easily pre-book a Green SM Taxi at the airport with
                      affordable packages...
                    </p>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to={"/book"} className="text-white hover:underline">
              Book Flight
            </Link>
          </li>
          {isUserLoggedIn && (
            <li>
              <Link to={"/bookings"} className="text-white hover:underline">
                Current Bookings
              </Link>
            </li>
          )}
          {isMobileMenuVisible && isUserLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:underline"
              >
                Log out
              </button>
            </li>
          )}
          {isMobileMenuVisible && !isUserLoggedIn && (
            <li>
              <Link to={"/login"} className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* User actions */}
        <div className="hidden md:flex items-center gap-6">
          {isUserLoggedIn ? (
            <div className="flex items-center gap-6">
              <img
                src={profilePic}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="bg-transparent border h-[50px] w-[70px] border-white text-row text-white px-4 py-0 rounded-full hover:bg-gray-900 transition duration-200"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center bg-transparent border border-white text-white px-6 py-2 rounded-full gap-2">
              <Link to={"/login"} className="hover:underline">
                Login
              </Link>
              <span className="border-l border-white h-8"></span>
              <Link to={"/signup"} className="hover:underline">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
