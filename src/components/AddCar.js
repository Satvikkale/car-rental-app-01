import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const navigate = useNavigate();

    const [carDetails, setCarDetails] = useState({
        image: '',
        image2: '',
        image3: '',
        ownerName: '',
        carname: '',
        carmodel: '',
        mileage: '',
        perkm: '',
        seatcapacity: '',
        fueltype: '',
        location: '',
        otherdetails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({
            ...carDetails,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setCarDetails({
            ...carDetails,
            [name]: base64
        });
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const carData = {
            image: carDetails.image,
            image2: carDetails.image2,
            image3: carDetails.image3,
            status: true,
            ownerName: carDetails.ownerName,
            carname: carDetails.carname,
            carmodel: carDetails.carmodel,
            mileage: carDetails.mileage,
            perkm: carDetails.perkm,
            seatcapacity: carDetails.seatcapacity,
            fueltype: carDetails.fueltype,
            location: carDetails.location,
            otherdetails: carDetails.otherdetails
        };

        try {
            console.log('Sending car data:', carData); // Add logging
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/addcar`,
                carData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 201) {
                alert('Car added successfully');
                navigate('/');
            } else {
                alert('Fill all the fields to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error); // Add logging
            alert('Error adding car');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 space-y-6 mb-[100px] bg-white rounded shadow-md mt-5">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload Car Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image2">
                        Upload Car Image 2
                    </label>
                    <input
                        type="file"
                        id="image2"
                        name="image2"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image3">
                        Upload Car Image 3
                    </label>
                    <input
                        type="file"
                        id="image3"
                        name="image3"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ownerName">
                        Car Owner Name
                    </label>
                    <input
                        placeholder='ex: John Doe'
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={carDetails.ownerName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carname">
                    Car Name
                    </label>
                    <input
                        placeholder='ex: Maruti Suzuki Swift'
                        type="text"
                        id="carname"
                        name="carname"
                        value={carDetails.carname}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carmodel">
                        Car Model
                    </label>
                    <input
                        placeholder='ex: 2021'
                        type="text"
                        id="carmodel"
                        name="carmodel"
                        value={carDetails.carmodel}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">
                        Mileage
                    </label>
                    <input
                        placeholder='ex: 15 km in 1 litre'
                        type="text"
                        id="mileage"
                        name="mileage"
                        value={carDetails.mileage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perkm">
                        Rs/Km
                    </label>
                    <input
                        placeholder='ex: 10'
                        type="text"
                        id="perkm"
                        name="perkm"
                        value={carDetails.perkm}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seatcapacity">
                        Seat Capacity
                    </label>
                    <input
                        placeholder='ex: 5 seater'
                        type="text"
                        id="seatcapacity"
                        name="seatcapacity"
                        value={carDetails.seatcapacity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fueltype">
                        Fuel Type
                    </label>
                    <input
                        placeholder='ex: Petrol / Diesel'
                        type="text"
                        id="fueltype"
                        name="fueltype"
                        value={carDetails.fueltype}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        placeholder='ex: Tulanga khurd,Akola'
                        type="text"
                        id="location"
                        name="location"
                        value={carDetails.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otherdetails">
                        Other details
                    </label>
                    <textarea
                        type="text"
                        id="otherdetails"
                        name="otherdetails"
                        value={carDetails.otherdetails}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
};

export default AddCar;