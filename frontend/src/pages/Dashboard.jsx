import React, { useEffect, useState } from 'react';
import { FaIdCard, FaUsers, FaPlusCircle, FaShareAlt, FaQrcode, FaInfoCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../AuthContext';

const stats = [
  { label: 'Total Cards Created', value: 0, icon: <FaIdCard className="text-3xl text-blue-500" /> },
  { label: 'Total Contacts', value: 0, icon: <FaUsers className="text-3xl text-green-500" /> },
  { label: 'Cards Shared', value: 0, icon: <FaShareAlt className="text-3xl text-purple-500" /> },
  { label: 'Recently Scanned', value: 0, icon: <FaQrcode className="text-3xl text-yellow-500" /> },
];

const Dashboard = () => {
  const { state } = useAuth();
  const [username, setUsername] = useState('admin');
  const email = state?.user?.email;

  useEffect(() => {
    async function fetchUsername() {
      if (!email) return;
      try {
        const res = await fetch(`/api/user/profile?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched user data:', data); // Debug log
          setUsername(data.username || data.fullName || data.email || 'admin');
        } else {
          setUsername('admin');
        }
      } catch {
        setUsername('admin');
      }
    }
    fetchUsername();
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Only - sidebar removed */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">Hey, {username} <span role='img' aria-label='wave'>👋</span></h2>
        <p className="text-gray-500 mt-1">Welcome back!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center border border-gray-100">
            {stat.icon}
            <div className="mt-4 text-3xl font-bold text-green-600">{stat.value}</div>
            <div className="mt-2 text-gray-800 text-lg font-semibold text-center">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;