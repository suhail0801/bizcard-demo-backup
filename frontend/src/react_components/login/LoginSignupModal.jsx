import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { toast } from 'react-toastify';

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 font-semibold rounded-l-lg ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-r-lg ${tab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('signup')}
          >
            Sign Up
          </button>
        </div>
        <div>
          {tab === 'login' ? <Login modalMode={true} onSuccess={onClose} /> : <Signup modalMode={true} onSuccess={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal; 