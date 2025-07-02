import React from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';

const ProfileAvatar = ({ userProfile, onClick }) => (
  <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 100 }}>
    <img
      src={userProfile?.profilePhoto && userProfile.profilePhoto.startsWith('/uploads/profile_photos') ? userProfile.profilePhoto : (userProfile?.profilePhoto || defaultAvatar)}
      alt="Profile"
      className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
      onClick={onClick}
      title="Edit Profile"
    />
  </div>
);

export default ProfileAvatar; 