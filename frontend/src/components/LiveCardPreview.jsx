import React, { useState } from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import onfraLogo from '../react_components/login/images/logo.png';
import { QRCodeSVG } from 'qrcode.react';

// Accept generateURL as a prop for correct URL generation
const LiveCardPreview = ({ formData = {}, featuredContent = [], IconHandler, generateURL, showQr = false, qrUrl = '' }) => {
  // Copy to clipboard handler
  const handleCopy = (value, label) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        toast.success(`${label} copied to clipboard!`, { position: 'top-center' });
      }).catch(() => {
        toast.error('Failed to copy to clipboard.');
      });
    } else {
      toast.error('Clipboard not supported in your browser.');
    }
  };

  function getVideoEmbedUrl(url) {
    if (!url) return null;
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1`;
    }
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1`;
    }
    return null;
  }

  // Utility to ensure absolute URLs
  function ensureAbsoluteUrl(url) {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return 'https://' + url;
  }
  // Platform-specific URL generator
  function getPlatformUrl(platform, value) {
    if (!value) return '';
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return /^\+?\d+$/.test(value) ? `https://wa.me/${value.replace(/\D/g, '')}` : ensureAbsoluteUrl(value);
      case 'linkedin':
        return `https://linkedin.com/in/${value.replace(/^@/, '')}`;
      case 'twitter':
        return `https://twitter.com/${value.replace(/^@/, '')}`;
      case 'twitch':
        return `https://twitch.tv/${value.replace(/^@/, '')}`;
      case 'facebook':
        return `https://facebook.com/${value.replace(/^@/, '')}`;
      case 'instagram':
        return `https://instagram.com/${value.replace(/^@/, '')}`;
      case 'telegram':
        return `https://t.me/${value.replace(/^@/, '')}`;
      case 'github':
        return `https://github.com/${value.replace(/^@/, '')}`;
      case 'youtube':
        return `https://youtube.com/${value}`;
      case 'snapchat':
        return `https://snapchat.com/add/${value.replace(/^@/, '')}`;
      case 'pinterest':
        return `https://pinterest.com/${value.replace(/^@/, '')}`;
      case 'reddit':
        return `https://reddit.com/user/${value.replace(/^@/, '')}`;
      case 'medium':
        return `https://medium.com/@${value.replace(/^@/, '')}`;
      case 'skype':
        return `skype:${value.replace(/^@/, '')}?chat`;
      case 'signal':
        return `https://signal.me/#p/${value.replace(/^@/, '')}`;
      case 'viber':
        return `viber://chat?number=${value.replace(/^@/, '')}`;
      case 'website':
        return ensureAbsoluteUrl(value);
      default:
        return ensureAbsoluteUrl(value);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl p-6 rounded-2xl bg-white shadow-2xl border border-gray-200 flex flex-col items-center">
        <div style={{ backgroundColor: formData.primaryBackgroundColor, position: 'relative' }} className="p-6 rounded-2xl w-full shadow-xl max-h-[80vh] overflow-y-auto">
          {/* QR Code at the top if showQr is true */}
          {showQr && qrUrl && (
            <div className="flex justify-center mb-4">
              <QRCodeSVG value={qrUrl} size={120} />
            </div>
          )}
          {/* Logo - top left, not fixed */}
          {formData.logo && (
            <div className="absolute left-6 top-6 z-20">
              {formData.logo.includes("/images") ?
                <img src={"/api" + formData.logo} alt="Logo" className="w-20 h-20 object-contain rounded-lg border-4 border-white shadow-md bg-white" /> :
                <img src={formData.logo} alt="Logo" className="w-20 h-20 object-contain rounded-lg border-4 border-white shadow-md bg-white" />
              }
            </div>
          )}
          {/* Cover Photo */}
          {formData.coverPhoto && (
            <img src={formData.coverPhoto.includes("/images") ? "/api" + formData.coverPhoto : formData.coverPhoto} alt="Cover" className="w-full h-48 object-cover mb-4 rounded-lg" style={{ aspectRatio: '3/2' }} />
          )}
          {/* Profile Photo - centered, overlapping cover */}
          <div className="flex justify-center w-full" style={{ marginTop: '-3.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 30 }}>
            {formData.profilePhoto ? (
              <img src={formData.profilePhoto.includes("/images") ? "/api" + formData.profilePhoto : formData.profilePhoto} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-green-200 bg-white shadow-2xl" style={{ aspectRatio: '1/1' }} />
            ) : (
              <img src={defaultAvatar} alt="Default" className="w-32 h-32 rounded-full object-cover border-4 border-green-200 bg-white shadow-2xl" style={{ aspectRatio: '1/1' }} />
            )}
          </div>
          {/* Personal Info */}
          <div className="text-center">
            <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="p-6 rounded-lg mb-4 shadow-xl">
              <h3 style={{ color: formData.titleColor }} className="text-3xl font-bold mt-2">{formData.firstName} {formData.lastName}</h3>
              <p style={{ color: formData.textColor }} className="text-xl">{formData.jobTitle}</p>
              <p style={{ color: formData.textColor }} className="text-gray-400 text-lg">{formData.businessName}</p>
              {/* Primary Phone and Gmail */}
              <div className="flex justify-center gap-6 mt-4">
                {/* Primary Phone */}
                {Array.isArray(formData.mobiles) && formData.mobiles[0] && (
                  <div
                    className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow cursor-pointer hover:bg-green-100 transition"
                    onClick={() => handleCopy(formData.mobiles[0], 'Phone number')}
                    title="Click to copy phone number"
                  >
                    <FaPhone className="text-green-600" />
                    <span className="font-medium">{formData.mobiles[0]}</span>
                  </div>
                )}
                {/* Primary Gmail */}
                {Array.isArray(formData.emails) && formData.emails[0] && formData.emails[0].toLowerCase().includes('@gmail.com') && (
                  <div
                    className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow cursor-pointer hover:bg-red-100 transition"
                    onClick={() => handleCopy(formData.emails[0], 'Email')}
                    title="Click to copy email"
                  >
                    <FaEnvelope className="text-red-500" />
                    <span className="font-medium">{formData.emails[0]}</span>
                  </div>
                )}
              </div>
            </div>
            {/* Card Title */}
            <h1 style={{ color: formData.titleColor }} className="text-4xl font-bold mt-4 mb-2">{formData.cardTitle}</h1>
            {/* Primary Connections */}
            {formData.primaryActions && formData.primaryActions.length ? (
              <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="rounded-lg p-6 my-4 shadow-xl">
                <h2 style={{ color: formData.titleColor }} className="text-lg font-bold mb-4 text-center">Primary Platforms</h2>
                <div className="flex justify-center">
                  <div className="grid grid-cols-5 gap-4">
                    {formData.primaryActions.map(({ platform, url, color }) => (
                      <a
                        key={platform}
                        href={generateURL ? generateURL(platform, url) : getPlatformUrl(platform, url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center text-white p-4 rounded-full"
                        style={{ background: color }}
                        onClick={e => e.stopPropagation()}
                      >
                        {IconHandler && <IconHandler platform={platform} />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            {/* Secondary Connections */}
            {formData.secondaryActions && formData.secondaryActions.length ? (
              <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="rounded-lg p-6 my-4 shadow-xl">
                <h2 style={{ color: formData.titleColor }} className="text-lg font-bold mb-4 text-center">Also Active in</h2>
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-5 gap-4">
                    {formData.secondaryActions.map(({ platform, url, color }) => (
                      <a
                        key={platform}
                        href={generateURL ? generateURL(platform, url) : getPlatformUrl(platform, url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center text-white p-4 rounded-full"
                        style={{ background: color }}
                        onClick={e => e.stopPropagation()}
                      >
                        {IconHandler && <IconHandler platform={platform} />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            {/* Featured Content */}
            <div className="mt-8">
              {featuredContent.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.type === 'media' && item.content && <video src={item.content} controls autoPlay loop className="w-full p-4 rounded-lg shadow-xl" style={{ backgroundColor: formData.secondaryBackgroundColor }} />}
                  {item.type === 'product' && (
                    <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="text-center p-4 rounded-lg">
                      {item.image && <img src={`/api${item.image}`} alt="Product" className="w-full h-32 object-cover rounded-lg mb-2" style={{ aspectRatio: '4/3' }} />}
                      <h3 style={{ color: formData.titleColor }} className="text-xl font-bold">{item.title}</h3>
                      <p style={{ color: formData.textColor }} className="text-gray-400">{item.description}</p>
                      <p style={{ color: formData.textColor }} className="text-lg">{item.price}</p>
                      {item.buttonText && (
                        <button style={{ background: formData.primaryBackgroundColor }} className="p-2 rounded-lg mt-2 text-white font-semibold">
                          <a href={item.link} target="__blank">{item.buttonText}</a>
                        </button>
                      )}
                    </div>
                  )}
                  {item.type === 'text' && <p style={{ backgroundColor: formData.secondaryBackgroundColor, color: formData.textColor }} className="text-white w-full p-4 rounded-lg shadow-xl">{item.content}</p>}
                  {item.type === 'embed' && item.content && (
                    <div className="embed-wrapper w-full bg-gray-100 rounded-lg shadow-xl" dangerouslySetInnerHTML={{ __html: item.content }} />
                  )}
                </div>
              ))}
            </div>
            {/* About Me */}
            {formData.about_yourself && (
              <div className="w-full flex flex-col items-center my-4">
                <div style={{ background: formData.secondaryBackgroundColor, borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #0001', maxWidth: 520, margin: '0 auto' }}>
                  <div className="font-bold text-lg mb-2" style={{ color: formData.titleColor }}>About Me</div>
                  <div className="text-base text-center whitespace-pre-line break-words" style={{ color: formData.textColor }}>{formData.about_yourself}</div>
                </div>
              </div>
            )}
            {/* About Me Video */}
            {formData.featured_video && getVideoEmbedUrl(formData.featured_video) && (
              <div className="w-full flex justify-center my-6">
                <div className="w-full max-w-xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src={getVideoEmbedUrl(formData.featured_video)}
                    title="About Me Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ minHeight: 220 }}
                  />
                </div>
              </div>
            )}
            {/* Powered by Onfra - always at the end, with correct logo, white/light green theme, smaller */}
            <div className="w-full flex justify-center mt-8">
              <span className="flex items-center gap-2 font-semibold text-base text-green-700 bg-white px-3 py-1.5 rounded-lg shadow border border-green-200" style={{letterSpacing: '0.04em'}}>
                <span className="text-green-700">Powered by</span>
                <img src={formData.logo || 'https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png'} alt="Onfra Logo" className="h-9 w-9 object-contain" style={{minWidth: 36}} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCardPreview;
