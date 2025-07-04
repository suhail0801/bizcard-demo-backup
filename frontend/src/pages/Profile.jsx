import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import defaultAvatar from '../assets/default-avatar.jpg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';

const countryCodes = ['+1', '+91', '+44', '+61', '+81'];

function formatPhone(phone) {
  if (!phone) return '';
  const code = countryCodes.find(c => phone.startsWith(c));
  if (code && !phone.startsWith(code + ' ')) {
    return code + ' ' + phone.slice(code.length);
  }
  return phone;
}

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    mobile: '', // E.164 format
    jobTitle: '',
    businessName: '',
    profilePhoto: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    fetch('/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Failed to update profile. Please try again.');
      });
  }, []);

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
        // Use FormData to send file and other fields
        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('username', profile.username);
        formData.append('email', profile.email);
        formData.append('mobile', profile.mobile);
        formData.append('jobTitle', profile.jobTitle);
        formData.append('businessName', profile.businessName);
        res = await fetch('/user/profile', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            // Do not set Content-Type, browser will set it for FormData
          },
          body: formData
        });
      } else {
        // Fallback to JSON if no file
        res = await fetch('/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          },
          body: JSON.stringify(profile)
        });
      }
      if (res.ok) {
        const updatedProfile = await res.json();
        setProfile(updatedProfile);
        toast.success('Profile updated!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch {
      toast.error('Error updating profile');
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white text-gray-900 rounded-xl mt-8 shadow flex flex-col items-center border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
      <form onSubmit={handleSave} className="space-y-6 w-full">
        <div className="flex flex-col items-center">
          <label htmlFor="profilePhoto" className="cursor-pointer">
            <img
              src={profile.profilePhoto && profile.profilePhoto.startsWith('/uploads/profile_photos') ? profile.profilePhoto : (profile.profilePhoto || defaultAvatar)}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 mb-2"
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
          <span className="text-gray-400 text-sm">Click to change photo</span>
        </div>
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 border border-gray-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 border border-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Phone</label>
          <PhoneInput
            country={'in'}
            value={profile.mobile}
            onChange={phone => {
              const value = '+' + phone;
              setProfile(prev => ({ ...prev, mobile: value }));
              if (!isValidPhoneNumber(value)) {
                setPhoneError('Please enter a valid phone number.');
                toast.error('Please enter a valid phone number.');
              } else {
                setPhoneError('');
              }
            }}
            inputProps={{
              name: 'mobile',
              required: true,
              autoFocus: false,
              className: 'w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none',
            }}
            containerClass="w-full"
            inputClass="w-full bg-white text-black p-3 rounded-lg"
            buttonClass="bg-white text-black border-r border-gray-300"
            dropdownStyle={{ zIndex: 1000 }}
          />
          <div className="text-xs text-gray-500 mt-1">Enter your phone number with country code.</div>
          {phoneError && <div className="text-xs text-red-500 mt-1">{phoneError}</div>}
          <div className="mt-2 text-gray-400">{formatPhone(profile.mobile)}</div>
        </div>
        <div>
          <label className="block mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={profile.jobTitle || ''}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 border border-gray-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={profile.businessName || ''}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-900 border border-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#00C853] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:scale-[1.02]"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;