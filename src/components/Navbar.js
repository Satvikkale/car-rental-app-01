import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [showSignupOptions, setShowSignupOptions] = useState(false);
    const [showLoginOptions, setShowLoginOptions] = useState(false);
    // const type = localStorage.getItem('type');
    const [type, setType] = useState(localStorage.getItem('type'));


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('type');
        setType(null);
        navigate('/login'); // Navigate to the login page
        window.location.reload(); // Refresh the page to update the navbar
    };

    return (
        <nav className="bg-gray-100 p-3 transition-all duration-500 ease-in-out ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black mr-2 transition-transform duration-500 ease-in-out transform hover:scale-110 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20v-6h4v6m-6 0h8a2 2 0 002-2v-7a2 2 0 00-.59-1.41l-6-6a2 2 0 00-2.82 0l-6 6A2 2 0 004 11v7a2 2 0 002 2z" />
                        </svg>
                    </Link>
                    <Link to="/" className="text-black text-md font-semibold transition-colors duration-500 ease-in-out hover:text-gray-400">Tour&travels</Link>
                    <Link to="/booking" className="text-black text-md ml-5 font-semibold transition-colors duration-500 ease-in-out hover:text-gray-400">Car Bookings</Link>
                    {(isLoggedIn && type === 'owner') && <Link to="/addcar" className="text-black text-md font-semibold ml-4 transition-colors duration-500 ease-in-out hover:text-gray-400">Add cars</Link>}
                </div>
                <div className="flex items-center">
                    {!isLoggedIn && (
                        <>
                            <div className="relative">
                                <button onClick={() => setShowLoginOptions(!showLoginOptions)} className="border border-black rounded-md pl-3 pr-3 pb-2 pt-1 text-black text-lg font-semibold mr-4 transition-transform duration-500 ease-in-out transform hover:scale-110">
                                    Login
                                </button>
                                {showLoginOptions && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100">
                                        <Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Login</Link>
                                        <Link to="/owner_login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Owner Login</Link>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button onClick={() => setShowSignupOptions(!showSignupOptions)} className="text-black border border-black rounded-md pl-3 pr-3 pb-2 pt-1  text-lg font-semibold mr-4 transition-transform duration-500 ease-in-out transform hover:scale-110">
                                    Sign Up
                                </button>
                                {showSignupOptions && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 transition-opacity duration-500 ease-in-out opacity-0 hover:opacity-100">
                                        <>
                                            <Link to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Sign Up</Link>
                                            <Link to="/owner_signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Owner Sign Up</Link>
                                        </>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* {isLoggedIn && (
                        <Link to='/profile' className="text-black text-md font-semibold mr-4 transition-transform duration-500 ease-in-out transform hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.953 9.953 0 0112 15c2.21 0 4.21.722 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                            Profile
                        </Link>
                    )} */}

                    {isLoggedIn && (
                        <button onClick={handleLogout} className="text-black text-md font-semibold mr-4 transition-transform duration-500 ease-in-out transform hover:scale-110">
                            Logout <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;