import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [type, setType] = useState(localStorage.getItem('type'));

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/bookings`); 
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();

        // Fetch user role from local storage or API
        const userType = localStorage.getItem('type');
        setType(userType);
    }, []);

    const handleDelete = async (bookingId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/bookings/${bookingId}`);
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Car Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">{booking.carname}</h2>
                            <img src={booking.image} alt={booking.carname} className="w-full h-35 object-cover mb-2" />
                            <h2 className="text-md font-semibold ">Order by : {booking.yourname}</h2>
                            <h2 className="text-md font-semibold ">Mobile Number : {booking.mobileno}</h2>
                            <p className="text-gray-700">Seat Capacity : {booking.seatcapacity}</p>
                            <p className="text-gray-700">From : {booking.source}</p>
                            <p className="text-gray-700">To : {booking.destination}</p>
                            <p className="text-gray-700">Start Date: {booking.startdate}</p>
                            <p className="text-gray-700">Return Date: {booking.enddate}</p>
                            <p className="text-gray-700">Price: Rs {booking.totalCost} only</p>
                            {(type === "owner") && (
                                <button
                                onClick={() => handleDelete(booking._id)}
                                className="flex justify-center items-center gap-2 w-[100%] h-10 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]">
                                    <svg viewBox="0 0 15 15" class="w-5 fill-white">
                                        <svg
                                        class="w-6 h-6"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            stroke-linejoin="round"
                                            stroke-linecap="round"
                                        >
                                        
                                        </path>
                                        </svg>
                                    </svg>
                                    Delete  
                                </button>

                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooking;