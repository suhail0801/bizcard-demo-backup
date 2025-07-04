// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-4 px-6 md:px-8 text-sm fixed bottom-0 left-0 z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center text-gray-600 pl-0 md:pl-0">
          Powered by
          <img
            src="https://onfra.io/wp-content/uploads/2024/09/onfra_light_bg.png"
            alt="Onfra Logo"
            className="h-7 w-auto ml-3 rounded shadow-sm border border-gray-200 bg-white p-1"
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-500 justify-center md:justify-end">
          <a href="#" className="hover:text-green-700 transition-colors">Your Country</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:text-green-700 transition-colors">Privacy Policy</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:text-green-700 transition-colors">Terms &amp; Conditions</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:text-green-700 transition-colors">Cancellation and Refund Policy</a>
          <span className="hidden md:inline">|</span>
          <a href="#" className="hover:text-green-700 transition-colors">GDPR Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
