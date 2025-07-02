// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        validateToken()
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        console.log('Navigation changed ----> ', location);
        if (location.pathname.includes("build")) document.querySelector(".create").cla
    }, [location]);

    useEffect(() => {
        validateToken();
        // Re-validate token on route change (login/logout)
    }, [location]);

    async function validateToken() {

        const url = `/api/validate`;

        const storedToken = localStorage.getItem('jwtToken');

        //     // Include the token in the headers for the request
        const headers = {
            Authorization: `Bearer ${storedToken}`
        };

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        // console.log(response.status == 200)
        // return 

        const res = await response.json();
        console.log(response.status, "response.status")
        // return
        if (response.status != 200) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
            setProfile(res)
        }
        console.log(res);
    }

    console.log(window.location.pathname, "window.location.href")

    return (
        <div className='text-white'>
            {!window.location.href.includes("digital-card") ?
                <header className='h-[10vh] bg-white shadow-xl flex justify-between items-center px-4 m-3 rounded-lg'>
                    {/* Left: Logo only */}
                    <div className="flex items-center">
                        <img src="https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png" alt="Logo" className="h-12" />
                    </div>
                    {/* Center: BIZCARD */}
                    <span className="text-4xl font-extrabold" style={{ color: '#1db954', letterSpacing: '2px' }}>BIZCARD</span>
                    {/* Right: Login/Signup or Logout */}
                    <div className="flex items-center gap-4">
                        {!isLoggedIn && (
                            <>
                                <Link to="/login">
                                    <button className="px-4 py-2 rounded font-semibold border-2 border-[#1db954] text-[#1db954] hover:bg-[#1db954] hover:text-white transition-colors">Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button className="px-4 py-2 rounded font-semibold border-2 border-[#1db954] text-[#1db954] hover:bg-[#1db954] hover:text-white transition-colors">Signup</button>
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
                                onClick={() => {
                                    localStorage.removeItem('jwtToken');
                                    navigate('/login');
                                }}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </header> : ""}
        </div>
    );
};

export default Header;
