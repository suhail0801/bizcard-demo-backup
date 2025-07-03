import React, { useEffect, useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function formatPhone(phone) {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    return phoneNumber.formatInternational();
  }
  return phone;
}

const MyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      } catch (err) {
        setError(err.message || 'Unknown error');
      }
      setLoading(false);
    }
    fetchContacts();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">My Contacts <span role='img' aria-label='contacts'>📇</span></h2>
      {loading ? (
        <div className="text-center py-8 text-xl text-gray-500">Loading contacts...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8 text-xl text-gray-500">No contacts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block bg-blue-100 text-blue-600 rounded-full p-2 text-2xl">{contact.contactName?.[0] || 'C'}</span>
                <span className="text-lg font-semibold text-gray-800">{contact.contactName}</span>
              </div>
              <div className="text-gray-600 text-sm mb-1">{contact['job title'] || contact.jobTitle}</div>
              <div className="text-gray-500 text-sm mb-1">{contact.business || contact.businessName}</div>
              <div className="text-gray-500 text-sm mb-1">{contact.contactEmail}</div>
              <div className="text-gray-500 text-sm mb-1">{formatPhone(contact.contactPhone)}</div>
              <div className="text-gray-400 text-xs mb-1">Saved by: {contact.savedBy}</div>
              <div className="text-gray-400 text-xs mb-2">Added: {contact.addedAt ? new Date(contact.addedAt).toLocaleString() : ''}</div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded self-end mt-2" onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContacts;
