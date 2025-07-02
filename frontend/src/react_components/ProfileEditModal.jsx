import React, { useState } from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';

function formatPhone(phone) {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    return phoneNumber.formatInternational();
  }
  return phone;
}

const ProfileEditModal = ({ isOpen, onClose, userProfile, onUpdate, jwtToken }) => {
  const [profile, setProfile] = useState({ ...userProfile });
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({ ...prev, profilePhoto: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('username', profile.username);
        formData.append('email', profile.email);
        formData.append('mobile', profile.mobile);
        formData.append('jobTitle', profile.jobTitle);
        formData.append('businessName', profile.businessName);
        res = await fetch('/user/profile', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${jwtToken}` },
          body: formData
        });
      } else {
        const body = { ...profile };
        res = await fetch('/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          },
          body: JSON.stringify(body)
        });
      }
      if (res.ok) {
        const updatedProfile = await res.json();
        onUpdate(updatedProfile);
        onClose();
      } else {
        alert('Failed to update profile');
      }
    } catch {
      alert('Error updating profile');
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-4 sm:p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col items-center mb-2">
            <label htmlFor="profilePhoto" className="cursor-pointer block mb-1 text-gray-800 font-semibold">
              <img
                src={profile.profilePhoto || defaultAvatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-700 mb-1"
              />
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <span className="text-gray-400 text-xs">Click to change photo</span>
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Full Name</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <PhoneInput
              country={'in'}
              value={profile.mobile}
              onChange={phone => {
                const value = '+' + phone;
                setProfile(prev => ({ ...prev, mobile: value }));
                if (!isValidPhoneNumber(value)) {
                  setPhoneError('Please enter a valid phone number.');
                } else {
                  setPhoneError('');
                }
              }}
              inputProps={{
                name: 'mobile',
                required: true,
                autoFocus: false,
                className: 'w-full p-2 rounded bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none',
              }}
              containerClass="w-full"
              inputClass="w-full bg-white text-black p-2 rounded"
              buttonClass="bg-white text-black border-r border-gray-300"
              dropdownStyle={{ zIndex: 1000 }}
            />
            <div className="text-xs text-gray-500 mt-1">Enter your phone number with country code.</div>
            {phoneError && <div className="text-xs text-red-500 mt-1">{phoneError}</div>}
            <div className="mt-1 text-gray-400">{formatPhone(profile.mobile)}</div>
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Business</label>
            <input
              type="text"
              name="businessName"
              value={profile.businessName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 font-semibold">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-1"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;