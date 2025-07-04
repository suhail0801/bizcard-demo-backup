import React, { useRef, useLayoutEffect, useState } from 'react';
import defaultAvatar from '../assets/default-avatar.jpg';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function formatPhoneInternational(phone) {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber ? phoneNumber.formatInternational() : phone;
}

const PDFCardSinglePage = ({ formData = {}, featuredContent = [], IconHandler, generateURL, showQr = false, qrUrl = '' }) => {
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;


  const wrapperRef = useRef(null);
  const groupRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (wrapperRef.current && groupRef.current) {
      const groupHeight = groupRef.current.scrollHeight;
      const groupWidth = groupRef.current.scrollWidth;
      const scaleW = A4_WIDTH / groupWidth;
      const scaleH = A4_HEIGHT / groupHeight;
      const finalScale = Math.min(1, scaleW, scaleH);
      setScale(finalScale);
    }
  }, [formData, featuredContent]);

  // Helper for platform URLs
  function getPlatformUrl(platform, value) {
    if (!value) return '';
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return /^\+?\d+$/.test(value) ? `https://wa.me/${value.replace(/\D/g, '')}` : value;
      case 'linkedin':
        return `https://linkedin.com/in/${value.replace(/^@/, '')}`;
      case 'twitter':
        return `https://twitter.com/${value.replace(/^@/, '')}`;
      case 'facebook':
        return `https://facebook.com/${value.replace(/^@/, '')}`;
      case 'instagram':
        return `https://instagram.com/${value.replace(/^@/, '')}`;
      default:
        return value;
    }
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        background: '#fff',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: `0`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={groupRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          background: formData.primaryBackgroundColor || '#f5f5f5',
          borderRadius: 0,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
          gap: 12,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Cover photo with logo inside */}
        <div style={{ position: 'relative', width: '100%', height: 140, marginBottom: 40 }}>
          {formData.coverPhoto && (
            <img src={formData.coverPhoto.includes('/images') ? '/api' + formData.coverPhoto : formData.coverPhoto} alt="Cover" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12 }} />
          )}
          {/* Logo inside cover photo, top-left, small */}
          {formData.logo && (
            <img src={formData.logo} alt="Logo" style={{ position: 'absolute', top: 12, left: 16, width: 48, height: 48, objectFit: 'contain', background: '#fff', borderRadius: 8, padding: 4 }} />
          )}
          {/* Profile photo overlapping cover, centered */}
          <div style={{ position: 'absolute', left: '50%', bottom: -40, transform: 'translateX(-50%)', zIndex: 2 }}>
            {formData.profilePhoto ? (
              <img src={formData.profilePhoto.includes('/images') ? '/api' + formData.profilePhoto : formData.profilePhoto} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '4px solid #86efac', background: '#fff', boxShadow: '0 2px 8px #0001' }} />
            ) : (
              <img src={defaultAvatar} alt="Default" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '4px solid #86efac', background: '#fff', boxShadow: '0 2px 8px #0001' }} />
            )}
          </div>
        </div>
        {/* Name, title, business, phone, email */}
        <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 8 }}>
          <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', borderRadius: 12, padding: 12, marginBottom: 8, boxShadow: '0 2px 8px #0001' }}>
            <h3 style={{ color: formData.titleColor || '#222', fontSize: 22, fontWeight: 700, margin: 0 }}>{formData.firstName} {formData.lastName}</h3>
            <p style={{ color: formData.textColor || '#444', fontSize: 16, margin: 0 }}>{formData.jobTitle}</p>
            <p style={{ color: formData.textColor || '#666', fontSize: 15, margin: 0 }}>{formData.businessName}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
              {Array.isArray(formData.mobiles) && formData.mobiles[0] && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', color: '#222', borderRadius: 8, padding: '4px 10px', fontSize: 14 }}>
                  <FaPhone style={{ color: '#16a34a' }} />
                  <span>{formatPhoneInternational(formData.mobiles[0])}</span>
                </div>
              )}
              {Array.isArray(formData.emails) && formData.emails[0] && formData.emails[0].toLowerCase().includes('@gmail.com') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f3f4f6', color: '#222', borderRadius: 8, padding: '4px 10px', fontSize: 14 }}>
                  <FaEnvelope style={{ color: '#dc2626' }} />
                  <span>{formData.emails[0]}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* About Me */}
        {formData.about_yourself && (
          <div style={{ width: '100%', margin: '8px 0', textAlign: 'center' }}>
            <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #0001', maxWidth: 520, margin: '0 auto' }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2, color: formData.titleColor || '#222' }}>About Me</div>
              <div style={{ color: formData.textColor || '#374151', fontSize: 13, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{formData.about_yourself}</div>
            </div>
          </div>
        )}
        {/* Primary Connections */}
        {formData.primaryActions && formData.primaryActions.length > 0 && (
          <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', borderRadius: 10, padding: 10, margin: '8px 0', width: '100%' }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, textAlign: 'center' }}>Primary Platforms</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {formData.primaryActions.map(({ platform, url, color }) => (
                <a
                  key={platform}
                  href={getPlatformUrl(platform, url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: color, color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 18, textDecoration: 'none' }}
                >
                  {IconHandler && <IconHandler platform={platform} />}
                </a>
              ))}
            </div>
          </div>
        )}
        {/* Secondary Connections */}
        {formData.secondaryActions && formData.secondaryActions.length > 0 && (
          <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', borderRadius: 10, padding: 10, margin: '8px 0', width: '100%' }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, textAlign: 'center' }}>Also Active In</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {formData.secondaryActions.map(({ platform, url, color }) => (
                <a
                  key={platform}
                  href={getPlatformUrl(platform, url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: color, color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 18, textDecoration: 'none' }}
                >
                  {IconHandler && <IconHandler platform={platform} />}
                </a>
              ))}
            </div>
          </div>
        )}
        {/* Featured Video Button */}
        {formData.featured_video && (
          <div style={{ width: '100%', margin: '8px 0', textAlign: 'center' }}>
            <a href={formData.featured_video} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 15, textDecoration: 'none', boxShadow: '0 2px 8px #0001' }}>
              Featured Video
            </a>
          </div>
        )}
        {/* Featured Content */}
        {featuredContent && featuredContent.length > 0 && (
          <div style={{ width: '100%', margin: '8px 0' }}>
            {featuredContent.map((item, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                {item.type === 'media' && item.content && <video src={item.content} controls autoPlay loop style={{ width: '100%', borderRadius: 8, background: formData.secondaryBackgroundColor || '#e5e7eb' }} />}
                {item.type === 'product' && (
                  <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                    {item.image && <img src={`/api${item.image}`} alt="Product" style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 8, marginBottom: 4 }} />}
                    <div style={{ color: formData.titleColor || '#222', fontWeight: 600 }}>{item.title}</div>
                    <div style={{ color: formData.textColor || '#444', fontSize: 13 }}>{item.description}</div>
                    <div style={{ color: formData.textColor || '#666', fontSize: 13 }}>{item.price}</div>
                    {item.buttonText && (
                      <button style={{ background: formData.primaryBackgroundColor || '#16a34a', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', marginTop: 4, fontWeight: 600 }}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{item.buttonText}</a>
                      </button>
                    )}
                  </div>
                )}
                {item.type === 'text' && <div style={{ background: formData.secondaryBackgroundColor || '#e5e7eb', color: formData.textColor || '#222', borderRadius: 8, padding: 8 }}>{item.content}</div>}
                {item.type === 'embed' && item.content && (
                  <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 8 }} dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
              </div>
            ))}
          </div>
        )}
        {/* QR code and Powered by Onfra (always at the end, part of the group) */}
        {showQr && qrUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>If you want to connect with me, scan this QR</div>
            <div style={{ background: '#fff', padding: 10, borderRadius: 10, display: 'inline-block' }}>
              <QRCodeSVG value={qrUrl} size={70} />
            </div>
          </div>
        )}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: '#15803d', background: '#fff', padding: '5px 14px', borderRadius: 8, boxShadow: '0 1px 4px #0001', border: '1px solid #bbf7d0', letterSpacing: '0.04em' }}>
            <span>Powered by</span>
            <img src={formData.logo || 'https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png'} alt="Onfra Logo" style={{ height: 22, width: 22, objectFit: 'contain', minWidth: 22 }} />
          </span>
        </div>
      </div>
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
    max-height: ${A4_HEIGHT}px !important;
    max-width: ${A4_WIDTH}px !important;
    page-break-inside: avoid !important;
    page-break-before: avoid !important;
    page-break-after: avoid !important;
  }
}
`}</style>
    </div>
  );
};

export default PDFCardSinglePage; 