import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import OwnerSignup from './components/Owner_signup';
import OwnerLogin from './components/Owner_login';
import BookCar from './components/BookCar';
import AddCar from './components/AddCar';
import Footer from './components/Footer';
import MyBooking from './components/MyBooking';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/owner_signup" element={<OwnerSignup />} />
        <Route path="/owner_login" element={<OwnerLogin />} />
        <Route path="/addcar" element={isLoggedIn ? <AddCar /> : <Navigate to="/login" />} />
        <Route path="/bookcars/:id" element={<BookCar />} />
        <Route path="/booking" element={isLoggedIn ? <MyBooking /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;