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
    <div className="min-h-screen bg-gray-900 p-3 text-white">
      <h1 className="my-5 !text-2xl font-semibold tracking-tight text-white sm:text-6xl"> My Contacts </h1>
      {loading ? (
        <div className="text-lg mt-10">Loading contacts...</div>
      ) : error ? (
        <div className="text-lg mt-10 text-red-400">{error}</div>
      ) : contacts.length === 0 ? (
        <div className="text-lg mt-10">No contacts found.</div>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="w-full text-left border-collapse bg-white text-gray-900 rounded-lg shadow">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Business</th>
                <th className="py-3 px-4 font-semibold">Job Title</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Phone</th>
                <th className="py-3 px-4 font-semibold">Saved By</th>
                <th className="py-3 px-4 font-semibold">Added At</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-4 font-medium">{contact.contactName}</td>
                  <td className="py-3 px-4">{contact.business || contact.businessName}</td>
                  <td className="py-3 px-4">{contact['job title'] || contact.jobTitle}</td>
                  <td className="py-3 px-4">{contact.contactEmail}</td>
                  <td className="py-3 px-4">{formatPhone(contact.contactPhone)}</td>
                  <td className="py-3 px-4">{contact.savedBy}</td>
                  <td className="py-3 px-4">{contact.addedAt ? new Date(contact.addedAt).toLocaleString() : ''}</td>
                  <td className="py-3 px-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={() => handleDeleteContact(contact.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContacts;
