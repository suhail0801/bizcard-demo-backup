import React, { useRef, useLayoutEffect, useState } from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import onfraLogo from '../react_components/login/images/logo.png';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

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

const PDFCardPreview = ({ formData = {}, featuredContent = [], IconHandler, generateURL, showQr = false, qrUrl = '' }) => {
  // Format phone number in international format (spaces), matching LiveCardPreview
  function formatPhoneInternational(phone) {
    if (!phone) return '';
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber ? phoneNumber.formatInternational() : phone;
  }
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);

  // A4 size at 96dpi: 794x1123px, but we use 744x1053px for 25px margin
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const MARGIN = 25;
  const CARD_WIDTH = A4_WIDTH - 2 * MARGIN;
  const CARD_HEIGHT = A4_HEIGHT - 2 * MARGIN;

  // Improved scaling: always fit card content to 1 page
  useLayoutEffect(() => {
    if (wrapperRef.current && cardRef.current) {
      // Use scrollHeight for content height, not just bounding box
      const cardContentHeight = cardRef.current.scrollHeight;
      const cardContentWidth = cardRef.current.scrollWidth;
      // Calculate scale for both width and height
      const scaleW = CARD_WIDTH / cardContentWidth;
      const scaleH = CARD_HEIGHT / cardContentHeight;
      // Use the smaller scale, but never upscale above 1
      const finalScale = Math.min(1, scaleW, scaleH);
      setScale(finalScale);
    }
  }, [formData, featuredContent]);

  return (
    <div
      className="pdf-print-wrapper"
      ref={wrapperRef}
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        background: '#fff',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: `${MARGIN}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={cardRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${CARD_WIDTH}px`,
          minHeight: `${CARD_HEIGHT}px`,
          background: formData.primaryBackgroundColor,
          borderRadius: 16,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 32,
          gap: 16,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Main card content (top) */}
        <div style={{ width: '100%' }}>
          {/* Logo - top left, not fixed */}
          {formData.logo && (
            <img
              src={formData.logo}
              alt="Logo"
              className="mb-4"
              style={{ maxWidth: '25%', height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
          )}
          {/* Cover Photo */}
          {formData.coverPhoto && (
            <img src={formData.coverPhoto.includes("/images") ? "/api" + formData.coverPhoto : formData.coverPhoto} alt="Cover" className="w-full object-cover mb-4 rounded-lg" style={{ maxHeight: '160px', width: '100%', objectFit: 'cover', aspectRatio: '3/2' }} />
          )}
          {/* Profile Photo - centered, overlapping cover */}
          <div className="flex justify-center w-full" style={{ marginTop: '-2.5rem', marginBottom: '1.5rem', position: 'relative', zIndex: 30 }}>
            {formData.profilePhoto ? (
              <img src={formData.profilePhoto.includes("/images") ? "/api" + formData.profilePhoto : formData.profilePhoto} alt="Profile" className="rounded-full object-cover border-4 border-green-200 bg-white shadow-2xl" style={{ width: '96px', height: '96px', aspectRatio: '1/1' }} />
            ) : (
              <img src={defaultAvatar} alt="Default" className="rounded-full object-cover border-4 border-green-200 bg-white shadow-2xl" style={{ width: '96px', height: '96px', aspectRatio: '1/1' }} />
            )}
          </div>
          <div className="text-center">
            <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="p-6 rounded-lg mb-4 shadow-xl">
              <h3 style={{ color: formData.titleColor }} className="text-3xl font-bold mt-2">{formData.firstName} {formData.lastName}</h3>
              <p style={{ color: formData.textColor }} className="text-xl">{formData.jobTitle}</p>
              <p style={{ color: formData.textColor }} className="text-gray-400 text-lg">{formData.businessName}</p>
              {/* Primary Phone and Gmail */}
              <div className="flex justify-center gap-6 mt-4">
                {/* Primary Phone */}
                {Array.isArray(formData.mobiles) && formData.mobiles[0] && (
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow">
                    <FaPhone className="text-green-600" />
                    <span className="font-medium">{formatPhoneInternational(formData.mobiles[0])}</span>
                  </div>
                )}
                {/* Primary Gmail */}
                {Array.isArray(formData.emails) && formData.emails[0] && formData.emails[0].toLowerCase().includes('@gmail.com') && (
                  <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg shadow">
                    <FaEnvelope className="text-red-500" />
                    <span className="font-medium">{formData.emails[0]}</span>
                  </div>
                )}
              </div>
            </div>
            {/* About Me Video as a link only, with title */}
            {formData.featured_video && (
              <div className="w-full flex flex-col items-center my-6">
                <div className="font-bold text-lg mb-2">About Me</div>
                <a href={formData.featured_video} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-base font-semibold break-all">{formData.featured_video}</a>
              </div>
            )}
            {/* Primary/Secondary Actions, Featured Content, etc. (reuse as needed) */}
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
                      >
                        {IconHandler && <IconHandler platform={platform} />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
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
                      >
                        {IconHandler && <IconHandler platform={platform} />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
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
          </div>
        </div>
        {/* QR code and Powered by Onfra (bottom, always at end) */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 24 }}>
          <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />
          {showQr && qrUrl && (
            <div className="flex flex-col items-center">
              <div className="font-bold text-lg mb-2">If you want to connect with me, scan this QR</div>
              <div style={{ background: '#fff', padding: 16, borderRadius: 16, display: 'inline-block' }}>
                <QRCodeSVG value={qrUrl} size={96} />
              </div>
            </div>
          )}
          <div className="w-full flex justify-center mt-2 mb-2">
            <span className="flex items-center gap-2 font-semibold text-base text-green-700 bg-white px-3 py-1.5 rounded-lg shadow border border-green-200" style={{letterSpacing: '0.04em'}}>
              <span className="text-green-700">Powered by</span>
              <img src={formData.logo || 'https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png'} alt="Onfra Logo" className="h-8 w-8 object-contain" style={{minWidth: 32}} />
            </span>
          </div>
        </div>
      </div>
      {/* Move style tag outside the scaled card div to avoid unterminated JSX */}
      <style>{`
@media print {
  html, body, .pdf-print-wrapper {
    width: ${A4_WIDTH}px !important;
    height: ${A4_HEIGHT}px !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
    page-break-inside: avoid !important;
    page-break-before: avoid !important;
    page-break-after: avoid !important;
    overflow: hidden !important;
  }
  .pdf-print-wrapper > div {
    overflow: visible !important;
    max-height: ${CARD_HEIGHT}px !important;
    max-width: ${CARD_WIDTH}px !important;
    page-break-inside: avoid !important;
    page-break-before: avoid !important;
    page-break-after: avoid !important;
  }
}
`}</style>
    </div>
  );
};

export default PDFCardPreview;