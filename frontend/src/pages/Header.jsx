// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from '../assets/default-avatar.jpg';

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
        if (!response.ok) {
            setIsLoggedIn(false);
            return;
        }
        const res = await response.json();
        if (response.status != 200) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
            setProfile(res)
        }
    }

    console.log(window.location.pathname, "window.location.href")

    return (
        <div className='text-white'>
            {!window.location.href.includes("digital-card") ?
                <header className='h-[10vh] bg-white shadow-md flex justify-between items-center px-4 rounded-none relative z-50'>
                    <img src="https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png" alt="Logo" className="h-12" />
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                        <span className="font-extrabold" style={{ fontSize: '3.5rem', color: '#1db954', letterSpacing: '0.2em' }}>BIZCARD</span>
                    </div>
                    <div className='text-black z-50 w-1/3 flex justify-around'>
                        {/* Visually hide the Create link, but keep it in the DOM for logic/routing. */}
                        <Link
                            className={`links p-2 create rounded-md flex items-center transition-all ${location.pathname.includes('/build') ? 'active' : ''}`}
                            to="/build/0"
                            style={{ display: 'none' }}
                        >
                            Create
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Username display removed from header. */}
                        {isLoggedIn && (
                            <img
                                src={profile.profilePhoto && profile.profilePhoto.startsWith('/uploads/profile_photos') ? profile.profilePhoto : (profile.profilePhoto || defaultAvatar)}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-400 cursor-pointer hover:border-[#00C853] transition"
                                onClick={() => navigate('/profile')}
                                title="My Profile"
                            />
                        )}
                        {
                            isLoggedIn ?
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold"
                                    onClick={() => {
                                        localStorage.removeItem('jwtToken');
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </button>
                                :
                                <div className="flex gap-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                        }
                    </div>
                </header> : ""}
        </div>
    );
};

export default Header;
