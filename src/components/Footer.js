import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white py-10 mt-[20%] relative overflow-hidden">

            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Company Info */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Tours&travels</h2>
                    <p className="text-gray-400">
                        Your trusted platform for finding the perfect Cars. Experience hassle-free rentals with us.
                    </p>
                    <p className="mt-4">
                        <strong>Call:</strong> +91-8237602904
                    </p>
                    <p>
                        <a href="mailto:support@roomrentals.com"><strong>Email:</strong> support@roomrentals.com</a>
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Our services</h3>
                    <ul>
                        <li className="mb-1 text-gray-400">
                            Provide Best car facilities
                        </li>
                        <li className="mb-1 text-gray-400">
                            Direct contact with car owner
                        </li>
                        <li className="mb-1 text-gray-400">
                            Easy to book car
                        </li>
                        <li className="mb-1 text-gray-400">
                            Affordable price
                        </li>
                        <li className="mb-1 text-gray-400">
                            24/7 customer support
                        </li>
                    </ul>
                </div>

                { /* Newsletter & Social Media */}
                <div>
                    <div className="flex space-x-4">
                        <Link
                            to="https://instagram.com"
                            className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full hover:bg-pink-600 transition"
                        >
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link
                            to="https://linkedin.com"
                            className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full hover:bg-blue-800 transition"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 mt-5">Stay Connected</h3>
                    <form className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="button"
                            className="w-full mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                        >
                            Subscribe
                        </button>
                    </form>

                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t border-gray-700 pt-4 relative z-10">
                <p className="text-center text-gray-500 text-sm">
                    © 2025 Apna Room. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
