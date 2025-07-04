// Dashboard page migrated from frontend_copy
import React, { useEffect, useState } from 'react';
import { FaIdCard, FaUsers, FaPlusCircle, FaShareAlt, FaQrcode, FaRegStar, FaInbox, FaCheckCircle, FaDownload, FaEye, FaExternalLinkAlt, FaRegClock, FaCreditCard, FaUserPlus, FaAddressBook } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const stats = [
  { label: 'Total Cards Created', value: 0, icon: <FaIdCard /> },
  { label: 'Total Contacts', value: 0, icon: <FaUsers /> },
  { label: 'Contacts Received', value: 0, icon: <FaUserPlus /> },
  { label: 'QR Scans', value: 0, icon: <FaQrcode /> },
  { label: 'Profile Views', value: 0, icon: <FaEye /> },
  { label: 'Link Clicks', value: 0, icon: <FaExternalLinkAlt /> },
  { label: 'Favorite Contacts', value: 0, icon: <FaRegStar /> },
  { label: 'Profile Completion', value: '0%', icon: <FaCheckCircle /> },
];

// Dummy data for chart and tables
const weeklyEngagement = [
  { week: 'Mon', views: 40, shares: 10, scans: 5 },
  { week: 'Tue', views: 60, shares: 15, scans: 8 },
  { week: 'Wed', views: 50, shares: 12, scans: 7 },
  { week: 'Thu', views: 70, shares: 20, scans: 10 },
  { week: 'Fri', views: 90, shares: 25, scans: 12 },
  { week: 'Sat', views: 80, shares: 18, scans: 9 },
  { week: 'Sun', views: 100, shares: 30, scans: 15 },
];
const recentActivity = [
  { type: 'Card Shared', detail: 'Shared card with John Doe', time: '2h ago' },
  { type: 'Contact Added', detail: 'Added Jane Smith to contacts', time: '4h ago' },
  { type: 'Card Viewed', detail: 'Card viewed by Alex', time: '6h ago' },
  { type: 'Card Scanned', detail: 'QR scanned by Sam', time: '1d ago' },
];
const profileChecklist = [
  { field: 'Profile Photo', complete: true },
  { field: 'Full Name', complete: true },
  { field: 'Email', complete: true },
  { field: 'Phone', complete: false },
  { field: 'Job Title', complete: false },
  { field: 'Business Name', complete: true },
];
const topCards = [
  { title: 'Sales Card', views: 120, clicks: 30 },
  { title: 'Support Card', views: 90, clicks: 22 },
  { title: 'Marketing Card', views: 80, clicks: 18 },
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
    <div className="min-h-screen bg-white px-4 sm:px-8 py-8">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 drop-shadow-sm">Welcome, Admin</h1>
        <p className="text-sm text-gray-500 mb-6">Here's your business summary</p>
      </header>
      <section className="mt-4">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              tabIndex={0}
              aria-label={stat.label}
              className="group bg-gradient-to-br from-white to-gray-50 ring-1 ring-gray-200 shadow-md hover:shadow-lg rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:-translate-y-1 scale-[1.02] hover:ring-[#00B871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B871] focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-center mb-4">
                <span className="bg-[#E6F4EA] p-2 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-focus:scale-110">
                  {React.cloneElement(stat.icon, { className: 'text-3xl text-[#00B871] transition-transform duration-300' })}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Line chart section */}
        <div className="bg-white rounded-xl shadow-md ring-1 ring-gray-100 p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Engagement</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weeklyEngagement} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#00C853" strokeWidth={2} dot={false} name="Views" />
              <Line type="monotone" dataKey="shares" stroke="#34d399" strokeWidth={2} dot={false} name="Shares" />
              <Line type="monotone" dataKey="scans" stroke="#60a5fa" strokeWidth={2} dot={false} name="Scans" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Recent activity feed and profile checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Recent Activity Feed */}
          <div className="bg-white rounded-xl shadow-lg ring-1 ring-[#e5e7eb] p-6 font-sans">
            <h2 className="text-lg font-bold text-[#1e293b] mb-4">Recent Activity</h2>
            <ul className="divide-y divide-[#e5e7eb]">
              {recentActivity.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-4 group transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  <span className="mt-1 text-[#10b981] bg-[#e6f4ea] rounded-full p-2">
                    {item.type.includes('Share') && <FaShareAlt className="text-lg" />}
                    {item.type.includes('Contact') && <FaUserPlus className="text-lg" />}
                    {item.type.includes('View') && <FaEye className="text-lg" />}
                    {item.type.includes('Scan') && <FaQrcode className="text-lg" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#1e293b]">{item.type}</div>
                    <div className="text-sm text-gray-500">{item.detail}</div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Profile Completion Checklist */}
          <div className="bg-white rounded-xl shadow-lg ring-1 ring-[#e5e7eb] p-6 font-sans">
            <h2 className="text-lg font-bold text-[#1e293b] mb-4">Profile Completion</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 font-medium">Completion</span>
                <span className="text-sm font-semibold text-[#10b981]">{stats[7].value}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="bg-[#10b981] h-3 rounded-full transition-all duration-500"
                  style={{ width: stats[7].value }}
                ></div>
              </div>
            </div>
            <table className="w-full text-sm mt-2">
              <tbody>
                {profileChecklist.map((item, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9] last:border-0">
                    <td className="py-2 text-[#1e293b] flex items-center gap-2">
                      {item.complete && <FaCheckCircle className="text-[#10b981] text-xs" aria-label="Complete" />}
                      {item.field}
                    </td>
                    <td className="py-2 text-right">
                      {item.complete ? (
                        <span className="inline-block w-3 h-3 rounded-full bg-[#10b981]" title="Complete" />
                      ) : (
                        <span className="inline-block w-3 h-3 rounded-full bg-gray-300" title="Incomplete" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Top Cards Table */}
        <div className="bg-white rounded-xl shadow-lg ring-1 ring-[#e5e7eb] p-6 font-sans">
          <h2 className="text-lg font-bold text-[#1e293b] mb-4">Top Cards</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#1e293b] text-xs uppercase tracking-wide font-bold">
                <th className="py-2 text-left font-bold">Card</th>
                <th className="py-2 text-center font-bold">Views</th>
                <th className="py-2 text-center font-bold">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {topCards.map((card, i) => (
                <tr
                  key={i}
                  className="border-b border-[#f1f5f9] last:border-0 even:bg-gray-50 hover:shadow-sm transition-shadow"
                >
                  <td className="py-2 text-[#1e293b] capitalize flex items-center gap-2 font-medium">
                    <FaIdCard className="text-[#10b981] text-base" />
                    {card.title}
                  </td>
                  <td className="py-2 text-center text-[#10b981] font-semibold">{card.views}</td>
                  <td className="py-2 text-center text-[#10b981] font-semibold">{card.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
