import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BizCardAuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const [signupValues, setSignupValues] = useState({ username: '', email: '', password: '', reEnterPassword: '' });
  const [step, setStep] = useState('auth'); // 'auth' | 'editProfile'
  const [jwtToken, setJwtToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTab('login');
      setError('');
      setLoginValues({ email: '', password: '' });
      setSignupValues({ username: '', email: '', password: '', reEnterPassword: '' });
      setStep('auth');
      setJwtToken(null);
      setProfile(null);
      setSaving(false);
      setFile(null);
    }
  }, [isOpen]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginValues)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Fetch user profile with this token
        const profileRes = await fetch('/user/profile', {
          headers: { Authorization: `Bearer ${data.token}` }
        });
        const profile = await profileRes.json();
        if (profileRes.ok) {
          onSuccess(data.token, profile);
        } else {
          setError('Login succeeded but failed to fetch profile.');
          toast.error('Authentication failed. Please try again.');
        }
      } else {
        setError(data.message || 'Login failed.');
        toast.error('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Login failed.');
      toast.error('Authentication failed. Please try again.');
    }
    setLoading(false);
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (signupValues.password !== signupValues.reEnterPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      toast.error('Authentication failed. Please try again.');
      return;
    }
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signupValues.username,
          email: signupValues.email,
          password: signupValues.password
        })
      });
      const data = await res.json();
      if (res.ok && data.message && data.message.toLowerCase().includes('thanks')) {
        // Auto-login after signup
        // Try to login and fetch profile
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: signupValues.email, password: signupValues.password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
          const profileRes = await fetch('/user/profile', {
            headers: { Authorization: `Bearer ${loginData.token}` }
          });
          const profile = await profileRes.json();
          if (profileRes.ok) {
            onSuccess(loginData.token, profile);
          } else {
            setError('Signup succeeded but failed to fetch profile.');
            toast.error('Authentication failed. Please try again.');
          }
        } else {
          setError('Signup succeeded but auto-login failed.');
          toast.error('Authentication failed. Please try again.');
        }
      } else {
        setError(data.message || 'Signup failed.');
        toast.error('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Signup failed.');
      toast.error('Authentication failed. Please try again.');
    }
    setLoading(false);
  };

  // Profile edit handlers
  const handleProfileChange = (e) => {
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
  const handleProfileSave = async (e) => {
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
        // Refetch updated profile
        const profileRes = await fetch('/user/profile', {
          headers: { Authorization: `Bearer ${jwtToken}` }
        });
        const updatedProfile = await profileRes.json();
        setProfile(updatedProfile);
        onSuccess(jwtToken, updatedProfile);
      } else {
        setError('Failed to update profile');
        toast.error('Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
      toast.error('Error updating profile');
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {step === 'auth' ? (
          <>
            <div className="flex justify-center mb-6">
              <button
                className={`px-6 py-2 font-semibold rounded-l-lg ${tab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setTab('login'); setError(''); }}
              >
                Login
              </button>
              <button
                className={`px-6 py-2 font-semibold rounded-r-lg ${tab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => { setTab('signup'); setError(''); }}
              >
                Sign Up
              </button>
            </div>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={loginValues.email}
                  onChange={e => setLoginValues(v => ({ ...v, email: e.target.value }))}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={loginValues.password}
                  onChange={e => setLoginValues(v => ({ ...v, password: e.target.value }))}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-2"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={signupValues.username}
                  onChange={e => setSignupValues(v => ({ ...v, username: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={signupValues.email}
                  onChange={e => setSignupValues(v => ({ ...v, email: e.target.value }))}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={signupValues.password}
                  onChange={e => setSignupValues(v => ({ ...v, password: e.target.value }))}
                  required
                />
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
                  value={signupValues.reEnterPassword}
                  onChange={e => setSignupValues(v => ({ ...v, reEnterPassword: e.target.value }))}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-2"
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </form>
            )}
          </>
        ) : (
          // Profile editing step
          <form onSubmit={handleProfileSave} className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Your Profile</h2>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
              value={profile?.username || ''}
              onChange={handleProfileChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
              value={profile?.email || ''}
              onChange={handleProfileChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Phone"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
              value={profile?.mobile || ''}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="businessName"
              placeholder="Business (Company)"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
              value={profile?.businessName || ''}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring text-black placeholder-black"
              value={profile?.jobTitle || ''}
              onChange={handleProfileChange}
            />
            <div className="flex flex-col items-center">
              <label htmlFor="profilePhoto" className="cursor-pointer">
                <img
                  src={profile?.profilePhoto || '/src/assets/default-avatar.jpg'}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 mb-2"
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
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mt-2"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BizCardAuthModal; 