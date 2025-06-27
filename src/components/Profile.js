import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const email = JSON.parse(localStorage.getItem('user')).email;

    const isLoggedIn = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [type, setType] = useState(localStorage.getItem('type'));

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    params: { email, type }
                });
                setProfile(response.data);
                setImage(response.data.profileImage);
            } catch (error) {
                console.error('Error fetching profile details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [email, type]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage(base64);

        try {
            await axios.put('http://localhost:5000/api/profile', {
                email,
                type,
                profileImage: base64
            });
        } catch (error) {
            console.error('Error updating profile image', error);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('type');
        setType(null);
        navigate('/login'); // Navigate to the login page
        window.location.reload(); // Refresh the page to update the navbar
    };

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white shadow-md rounded-lg transform transition-all duration-500 hover:shadow-xl hover:scale-105">
            <Link
                to="/profile"
                className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
            > <span
                className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
            ></span>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {profile.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-600">Email : {profile.email}</p>
                        {type === 'owner' && <p className="mt-1 text-sm font-medium text-gray-600">Age : {profile.age}</p>}
                        {type === 'owner' && <p className="mt-1 text-sm font-medium text-gray-600">Phone : {profile.mobile}</p>}
                        {type === 'owner' && <p className="mt-1 text-sm font-medium text-gray-600">Address : {profile.address}</p>}
                    </div>

                    <div className="mt-4 sm:mt-0 sm:shrink-0 ">
                        <img
                            alt=""
                            src={image || "https://via.placeholder.com/150"}
                            className="w-32 h-32 rounded-lg object-cover shadow-sm"
                        />
                        {!image && (
                            <input type="file" onChange={handleImageChange} className="mt-2" />
                        )}
                        {isLoggedIn && (
                            <button onClick={handleLogout} className="text-black text-md font-semibold mt-3 transition-transform duration-500 ease-in-out transform hover:scale-110">
                                Logout <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Profile;
