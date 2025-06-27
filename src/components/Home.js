import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const type = localStorage.getItem('type');
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/cars');
                setCars(response.data);
                if (type === 'user') {
                    const filteredCars = response.data.filter(cars => cars.status === true);
                    setCars(filteredCars);
                } else {
                    setCars(response.data);
                }
            } catch (error) {
                console.error('Error fetching cars', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [type]);

    const searchhandle = async (e) => {
        let key = e.target.value;
        setLoading(true);
        if (key) {
            try {
                const response = await axios.get(`http://localhost:5000/search/${key}`);
                const filteredCars = response.data.filter(cars => cars.status === true);
                setCars(filteredCars);
            } catch (error) {
                console.error('Error searching cars', error);
            } finally {
                setLoading(false);
            }
        } else {
            const fetchCars = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/cars');
                    const filteredCars = response.data.filter(cars => cars.status === true);
                    setCars(filteredCars);
                } catch (error) {
                    console.error('Error fetching cars', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchCars();
        }
    };

    const handleReadMore = (carId) => {
        navigate(`/bookcars/${carId}`);
    };

    return (
        <div className="container mx-auto p-2 mb-[100px]">
            <div className="my-4 flex items-center">
                <h1 className="text-xl font-bold">
                    👋 Welcome, {user?.name}
                </h1>
            </div>

            {/* hero section */}

            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
                        <div>
                            <div className="max-w-lg md:max-w-none">
                                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                    "Find Your Perfect Ride 🚗 - Rent with Ease!"
                                </h2>
                                <p className="mt-4 text-gray-700">
                                    "Find the Perfect Ride for Every Journey! 🚗✨
                                    Affordable, Reliable, and Ready When You Are.
                                    Drive with Comfort, Travel with Confidence.
                                    Book Your Car Rental in Just a Few Clicks!"
                                </p>
                            </div>
                        </div>
                        <div>
                            <img
                                src="https://imgs.search.brave.com/8cxZsonNI2g86tApTt6hsitiCLcOPxUEU05aHEXAN9k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/c2l4dC5jb20vMTYw/MC9lMjFkZDUxMS1j/M2U4LTQwNjQtOTg1/Zi0wMGFhMTQ2YjM4/MTguanBn"
                                className="rounded"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* close hero section */}

            {/* search bar */}
            < div className='my-8' >
                <div className="relative justify-center flex">
                    <input type="text" onChange={searchhandle} placeholder="🔍 Enter location, price, name" className="w-[90%] p-2 border border-indigo-900 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300 ease-in-out transform hover:scale-105" />
                </div>
            </div >

            {/* .card  */}
            {
                loading ? (
                    <div class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
                        <div
                            class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-400"
                        >
                            <svg
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            class="w-10 h-10 text-gray-200 dark:text-gray-600"
                            >
                            <path
                                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
                            ></path>
                            <path
                                d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
                            ></path>
                            </svg>
                        </div>
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        <div class="flex items-center mt-4">
                            <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            class="w-10 h-10 me-3 text-gray-200 dark:text-gray-400"
                            >
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                            ></path>
                            </svg>
                            <div>
                            <div
                                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32 mb-2"
                            ></div>
                            <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                            </div>
                        </div>
                        <span class="sr-only">Loading...</span>
                        </div>

                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {cars.length > 0 ? cars.map(cars => (
                            <div key={cars._id} className="block rounded-lg p-5 shadow-lg shadow-indigo-100 transition duration-500 ease-in-out transform hover:scale-105 block">
                                <img src={cars.image} alt={cars.ownerName} className="h-56 w-full rounded-md object-cover" />
                                <div className="p-4">
                                    {type === 'owner' && (
                                        <span className={`text-sm font-semibold ${cars.isAvailable ? 'text-red-500' : 'text-green-500'}`}>
                                            {cars.status ? 'Available' : 'Non-Available'}
                                        </span>
                                    )}
                                    <div className="mt-2">
                                        <dl>
                                            <div>
                                                <dt className="sr-only">Name</dt>
                                                <dd className="text-sm text-gray-500">Car owner name : {cars.ownerName}</dd>
                                            </div>

                                            <div>
                                                <dt className="sr-only">Car Name</dt>
                                                <dd className="text-sm text-gray-500">Car Name : {cars.carname}</dd>
                                            </div>

                                            <div>
                                                <dt className="sr-only">Car Model</dt>
                                                <dd className="text-sm text-gray-500">Car Model : {cars.carmodel}</dd>
                                            </div>

                                            <div>
                                                <dt className="sr-only">Address</dt>
                                                <dd className="text-sm text-gray-500">Rs/km : {cars.perkm}</dd>
                                            </div>



                                            <div className="flex justify-between mt-4">
                                                <button
                                                    type="submit"
                                                    onClick={() => handleReadMore(cars._id)}
                                                    class="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-black-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                                                    >
                                                    Explore
                                                    <svg
                                                        class="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                                                        viewBox="0 0 16 19"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                                        class="fill-gray-800 group-hover:fill-gray-800"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            {(type === 'owner') && (
                                                <div className="flex justify-between mt-4">
                                                    <button
                                                        className={`px-2 py-1 w-full rounded ${cars.status ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white transition duration-300 ease-in-out transform hover:scale-105`}
                                                        onClick={async () => {
                                                            try {
                                                                const updatedcars = { ...cars, status: !cars.status };
                                                                await axios.put(`http://localhost:5000/api/cars/${cars._id}/availability`, { status: updatedcars.status });
                                                                setCars(cars.map(r => r._id === cars._id ? updatedcars : r));
                                                            } catch (error) {
                                                                console.error('Error updating cars availability', error);
                                                            }
                                                        }}
                                                    >
                                                        {cars.status ? 'Mark Not Available' : 'Mark Available'}
                                                    </button>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))
                            :
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <svg
                                    className="w-24 h-24 text-gray-400 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25M21 12A9 9 0 1 1 3 12A9 9 0 0 1 21 12Z"
                                    ></path>
                                </svg>
                                <p className="text-gray-500 text-lg">No cars available</p>
                            </div>


                        }
                    </div>
                )}
        </div >
    );
};

export default Home;
