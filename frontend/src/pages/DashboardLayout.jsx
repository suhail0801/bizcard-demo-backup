import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaIdCard, FaUsers, FaPlusCircle, FaInfoCircle, FaTachometerAlt } from 'react-icons/fa';

const navItems = [
  { to: '/dashboard', icon: <FaTachometerAlt className="transition-colors" />, label: 'Dashboard' },
  { to: '/cards', icon: <FaIdCard className="transition-colors" />, label: 'My Cards' },
  { to: '/contacts', icon: <FaUsers className="transition-colors" />, label: 'My Contacts' },
  { to: '/build/0', icon: <FaPlusCircle className="transition-colors" />, label: 'Create' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="w-64 bg-white border-r flex flex-col py-8 px-4 min-h-screen">
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-colors text-gray-700 hover:bg-[#1db954] hover:text-white focus:bg-[#1db954] focus:text-white ${location.pathname === to ? 'bg-[#1db954] text-white' : ''}`}
            aria-current={location.pathname === to ? 'page' : undefined}
          >
            {icon} {label}
          </Link>
        ))}
        <a
          href="https://onfra.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-colors text-gray-700 hover:bg-[#1db954] hover:text-white focus:bg-[#1db954] focus:text-white"
        >
          <FaInfoCircle className="transition-colors" /> About
        </a>
      </nav>
    </aside>
  );
};

const DashboardLayout = () => {
  const location = useLocation();
  // Only show sidebar/nav for dashboard, cards, contacts, create, profile, etc.
  const sidebarRoutes = [
    '/dashboard', '/cards', '/contacts', '/build/0', '/profile', '/create', '/build', '/build/:id'
  ];
  // If not on a sidebar route, just render the main content (Outlet)
  const showSidebar = sidebarRoutes.some(route => location.pathname.startsWith(route.replace(':id', '')));

  return (
    <div className="flex min-h-screen bg-gray-50">
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? 'flex-1 p-8' : 'flex-1 flex justify-center items-center p-0'}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
