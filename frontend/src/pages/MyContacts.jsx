import React, { useEffect, useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FaStar } from 'react-icons/fa';

function formatPhone(phone) {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    return phoneNumber.formatInternational();
  }
  return phone;
}

const LOCAL_STORAGE_KEY = 'myContactsData';

const MyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load contacts from localStorage if available, else fetch from API
  useEffect(() => {
    const localContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localContacts) {
      setContacts(JSON.parse(localContacts));
      setLoading(false);
    } else {
      async function fetchContacts() {
        setLoading(true);
        setError(null);
        try {
          const token = localStorage.getItem('jwtToken');
          const res = await fetch('/api/contacts?all=true', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!res.ok) throw new Error('Failed to fetch contacts');
          const data = await res.json();
          setContacts(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
          setError(err.message || 'Unknown error');
        }
        setLoading(false);
      }
      fetchContacts();
    }
  }, []);

  // Sync contacts to localStorage whenever contacts change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  // UI-only favorite toggle
  function handleToggleFavorite(id) {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  }

  async function handleDeleteContact(id) {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(contacts.filter(c => c.id !== id));
      } else {
        alert('Failed to delete contact');
      }
    } catch {
      alert('Error deleting contact');
    }
  }

  // Split contacts into favorites and non-favorites
  const favoriteContacts = contacts.filter(c => c.isFavorite);
  const nonFavoriteContacts = contacts.filter(c => !c.isFavorite);

  return (
    <div className="min-h-screen bg-gray-50 p-0 font-sans flex">
      {/* Sidebar and header should be fixed and joined in the layout, so just ensure content doesn't interfere */}
      <div className="flex-1 max-w-6xl mx-auto w-full pt-8 pb-8 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Contacts</h2>
        {loading ? (
          <div className="text-center py-8 text-xl text-gray-500">Loading contacts...</div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8 text-xl text-gray-500">No contacts found.</div>
        ) : (
          <>
            {/* Favorites Section */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 overflow-x-auto mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Favorites</h3>
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Phone</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Company</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Job Title</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Date Shared</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Saved By</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Favorite</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteContacts.length === 0 ? (
                    <tr><td colSpan={9} className="text-center text-gray-500 py-4">No favorites yet.</td></tr>
                  ) : favoriteContacts.map(contact => (
                    <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{contact.contactName}</td>
                      <td className="px-4 py-3 text-gray-700">{contact.contactEmail}</td>
                      <td className="px-4 py-3 text-gray-700">{formatPhone(contact.contactPhone)}</td>
                      <td className="px-4 py-3 text-gray-700">{contact.business || contact.businessName}</td>
                      <td className="px-4 py-3 text-gray-700">{contact['job title'] || contact.jobTitle}</td>
                      <td className="px-4 py-3 text-gray-500">{contact.addedAt ? new Date(contact.addedAt).toLocaleString() : ''}</td>
                      <td className="px-4 py-3 text-gray-500">{contact.savedBy}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          aria-label={contact.isFavorite ? 'Unfavorite' : 'Favorite'}
                          onClick={() => handleToggleFavorite(contact.id)}
                          className="focus:outline-none"
                        >
                          {contact.isFavorite ? (
                            // Filled star
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C853" stroke="#00C853" strokeWidth="2" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.914-1.005L12 2.5l3.086 6.25L22 9.755l-5.007 4.36 1.179 6.88z" />
                            </svg>
                          ) : (
                            // Outlined star
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.914-1.005L12 2.5l3.086 6.25L22 9.755l-5.007 4.36 1.179 6.88z" fill="none" />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs" onClick={() => handleDeleteContact(contact.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contacts Section Heading */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contacts</h3>

            {/* Contacts Table */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100 overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Phone</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Company</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Job Title</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Date Shared</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Saved By</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Favorite</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {nonFavoriteContacts.length === 0 ? (
                    <tr><td colSpan={9} className="text-center text-gray-500 py-4">No contacts found.</td></tr>
                  ) : nonFavoriteContacts.map(contact => (
                    <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{contact.contactName}</td>
                      <td className="px-4 py-3 text-gray-700">{contact.contactEmail}</td>
                      <td className="px-4 py-3 text-gray-700">{formatPhone(contact.contactPhone)}</td>
                      <td className="px-4 py-3 text-gray-700">{contact.business || contact.businessName}</td>
                      <td className="px-4 py-3 text-gray-700">{contact['job title'] || contact.jobTitle}</td>
                      <td className="px-4 py-3 text-gray-500">{contact.addedAt ? new Date(contact.addedAt).toLocaleString() : ''}</td>
                      <td className="px-4 py-3 text-gray-500">{contact.savedBy}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          aria-label={contact.isFavorite ? 'Unfavorite' : 'Favorite'}
                          onClick={() => handleToggleFavorite(contact.id)}
                          className="focus:outline-none"
                        >
                          {contact.isFavorite ? (
                            // Filled star
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00C853" stroke="#00C853" strokeWidth="2" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.914-1.005L12 2.5l3.086 6.25L22 9.755l-5.007 4.36 1.179 6.88z" />
                          </svg>
                          ) : (
                            // Outlined star
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.88L2 9.755l6.914-1.005L12 2.5l3.086 6.25L22 9.755l-5.007 4.36 1.179 6.88z" fill="none" />
                          </svg>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs" onClick={() => handleDeleteContact(contact.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyContacts;
