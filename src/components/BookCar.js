import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [totalCost, setTotalCost] = useState(null);
    const [yourname, setYourName] = useState('');
    const [mobileno, setMobileNo] = useState('');
    const type = localStorage.getItem('type');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    useEffect(() => {
        if (distance && car) {
            const cost = distance * car.perkm;
            setTotalCost(cost);
        }
    }, [distance, car]);

    const handleBookNow = async () => {
        if (!yourname || !mobileno || !source || !destination || !distance || !startdate || !enddate || !totalCost) {
            alert('Please fill in all fields');
            return;
        }

        const bookingDetails = {
            car: car._id,
            yourname,
            mobileno,
            source,
            destination,
            distance,
            startdate,
            enddate,
            totalCost,
            user: user.id
        };
        try {
            console.log('Sending booking data:', bookingDetails); // Add logging
            const response = await axios.post('http://localhost:5000/api/bookcar', bookingDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                alert('Booking confirmed!');
                navigate('/booking');
            } else {
                alert('Failed to book car');
            }
        } catch (error) {
            console.error('Error booking car:', error); // Add logging
            alert('Error booking car');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!car) {
        return <div>Car not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flow-root mt-10 mb-10">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">

                    <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
                        <img src={car.image} alt={car.ownerName} className="w-full h-48 object-cover" />
                        <img src={car.image2} alt={car.ownerName} className="w-full h-48 object-cover" />
                        <img src={car.image3} alt={car.ownerName} className="w-full h-48 object-cover" />
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Car Owner Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.ownerName}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Car Owner Mobile Number</dt>
                        <dd className="text-gray-700 sm:col-span-2">8237602904</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Car Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.carname}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Car Model</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.carmodel}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Mileage</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.mileage}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Rs/km</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.perkm}</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Seat Capacity</dt>
                        <dd className="text-gray-700 sm:col-span-2">{car.seatcapacity}</dd>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Enter Your Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="text"
                                placeholder="Enter your Name"
                                value={yourname}
                                onChange={(e) => setYourName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Mobile Number</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="text"
                                placeholder="Enter your Mobile number"
                                value={mobileno}
                                onChange={(e) => setMobileNo(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Source/Your Location</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="text"
                                placeholder="Enter your location"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Destination</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="text"
                                placeholder="Enter destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Start Date</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="datetime-local"
                                // placeholder="startdate"
                                value={startdate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">End Date</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="datetime-local"
                                // placeholder="End date"
                                value={enddate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Distance from {source} to {destination} is</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <input
                                type="text"
                                placeholder="distance in km"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-md font-medium text-gray-900">Total Travel Bill Payment</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            {totalCost !== null ? `Rs ${totalCost}` : 'N/A'}
                        </dd>
                    </div>

                    
                    <div className="flex justify-center">
                    {(type === 'user') && <button
                        className="mt-5 w-[35%] font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                        type="submit"
                    >
                        <a href={`tel:8237602904`} >
                            📞 call now or send message on whatsapp
                        </a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 19"
                            className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                        >
                            <path
                                className="fill-gray-800 group-hover:fill-gray-800"
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            ></path>
                    </svg>
                    </button>}
                        {type === 'user' && (
                            <button
                                className="mt-5 w-[35%] font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-full px-4 py-2"
                                type="button"
                                onClick={handleBookNow}
                            >
                                Book Now
                            </button>
                        )}
                    </div>


                </dl>
            </div>
        </div>
    );
};

export default BookCar;