import React from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';

const UnifiedCardPreview = ({ card }) => {
  return (
    <div
      className="w-full flex flex-col items-center rounded-lg shadow-inner overflow-hidden relative min-h-[320px] py-4"
      style={{ backgroundColor: card.primaryBackgroundColor?.trim() ? card.primaryBackgroundColor : '#fff' }}
    >
      {/* Cover Photo */}
      {card.coverPhoto && (card.coverPhoto.includes("/images") ? (
        <img src={"/api" + card.coverPhoto} alt="Cover" className="w-full h-32 object-cover" />
      ) : (
        <img src={card.coverPhoto} alt="Cover" className="w-full h-32 object-cover" />
      ))}
      {/* Logo */}
      {card.logo && (card.logo.includes("/images") ? (
        <img src={"/api" + card.logo} alt="Logo" className="w-16 h-16 object-contain rounded-lg mt-[-2rem] border-4 border-white shadow-md bg-white z-10" />
      ) : (
        <img src={card.logo} alt="Logo" className="w-16 h-16 object-contain rounded-lg mt-[-2rem] border-4 border-white shadow-md bg-white z-10" />
      ))}
      {/* Profile Photo */}
      {(card.profilePhoto && card.profilePhoto.startsWith('/uploads/profile_photos')) ? (
        <img
          src={"/api" + card.profilePhoto}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-lg mt-4 bg-white z-10"
        />
      ) : card.profilePhoto ? (
        <img
          src={card.profilePhoto}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-lg mt-4 bg-white z-10"
        />
      ) : (
        <img
          src={defaultAvatar}
          alt="Default"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow-lg mt-4 bg-white z-10"
        />
      )}
      {/* Card Info */}
      <div className="flex flex-col items-center px-4 py-3 w-full">
        <h3 style={{ color: card.titleColor || '#111827' }} className="text-xl font-bold mt-2 text-center truncate w-full">
          {card.firstName || 'First'} {card.lastName || 'Last'}
        </h3>
        <p style={{ color: card.textColor || '#374151' }} className="text-base text-center w-full truncate">{card.jobTitle || 'Job Title'}</p>
        <p style={{ color: card.textColor || '#6b7280' }} className="text-sm text-center w-full truncate">{card.businessName || 'Business Name'}</p>
      </div>
    </div>
  );
};

export default UnifiedCardPreview;
