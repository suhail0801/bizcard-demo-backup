// Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <div>
            < footer className="bg-gray-800 py-6 h-[10%] mt-10 m-3 rounded-lg" >
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2024 Digital Business Card Generator. All rights reserved.</p>
                    <div className="mt-4">
                        <a href="#" className="mx-2 text-gray-400 hover:text-white">Contact</a>
                        <a href="#" className="mx-2 text-gray-400 hover:text-white">Privacy</a>
                        <a href="#" className="mx-2 text-gray-400 hover:text-white">Terms</a>
                    </div>
                </div>
            </footer >
        </div>
    );
};

export default Footer;
