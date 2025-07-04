// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer w-full bg-gray-50 border-t border-gray-200 text-sm fixed bottom-0 left-0 z-30">
      <div className="footer-content w-full">
        <div className="footer-left text-gray-600">
          Powered by <span className="onfra">Onfra</span>
        </div>
        <div className="footer-right flex flex-wrap gap-x-4 gap-y-1 text-gray-500 justify-center md:justify-end">
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
