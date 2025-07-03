import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaPlus } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Switch from "react-switch";
import defaultAvatar from '../assets/default-avatar.jpg';

const key = 123; // The encryption/decryption key
const QR_BASE_URL = window.location.origin;

function encryptData(id) {
  return id ^ key;
}

function getNetworkUrl(path = "") {
  // Always use your network IP for sharing
  const protocol = window.location.protocol;
  const port = window.location.port ? ":" + window.location.port : "";
  const networkIp = "192.168.1.4"; // <-- Replace with your actual IP if different
  return `${protocol}//${networkIp}${port}${path}`;
}

function Cards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([])
  const [profile, setProfile] = useState({})
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareError, setShareError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log("Cards component mounted");
    try {
    getCards()
    validateToken()
    } catch (err) {
      console.error("Error in useEffect:", err);
      setError(err.message);
    }
  }, []);

  async function validateToken() {
    try {
      console.log("Validating token...");
      const url = `/api/validate`;
      const storedToken = localStorage.getItem('jwtToken');
      console.log("Stored token:", storedToken ? "exists" : "missing");
      const headers = {
        Authorization: `Bearer ${storedToken}`
      };
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      if (!response.ok) {
        setError(`Failed to validate token: ${response.status}`);
        navigate("/login");
        return;
      }
      const res = await response.json();
      console.log("Validate response:", res);
      setProfile(res);
    } catch (err) {
      console.error("Error in validateToken:", err);
      setError(err.message);
    }
  }

  async function getCards() {
    try {
      console.log("Getting cards...");
      const url = `/api/cards`;
      const storedToken = localStorage.getItem('jwtToken');
      const headers = {
        Authorization: `Bearer ${storedToken}`
      };
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      if (!response.ok) {
        setError(`Failed to fetch cards: ${response.status}`);
        setLoading(false);
        return;
      }
      const res = await response.json();
      console.log("Cards response:", res);
      setCards(res || []);
      setLoading(false);
    } catch (err) {
      console.error("Error in getCards:", err);
      setError(err.message);
      setLoading(false);
    }
  }

  async function deleteCard(cardId) {
    const url = `/api/cards/${cardId}`;
    const storedToken = localStorage.getItem('jwtToken');
    const headers = {
      Authorization: `Bearer ${storedToken}`
    };
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    if (response.ok) {
      toast.success('Card deleted!', { position: 'top-center' });
      setCards(cards.filter(card => card.id !== cardId));
    } else {
      toast.error('Failed to delete card', { position: 'top-center' });
    }
  }

  function handleShare(card) {
    // Use the current IP/domain for QR and sharing
    const url = `${window.location.origin}/digital-card?user=${profile.username}&type=digital-card&org=onfra&query=${card.id}`;
    setQrUrl(url);
    setQrModalOpen(true);
  }

  function handleSharePlatform(platform) {
    let shareUrl = '';
    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(qrUrl)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(qrUrl)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(qrUrl)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(qrUrl)}`;
    }
    window.open(shareUrl, '_blank');
  }

  // Download QR code as PNG
  function handleDownloadQR() {
    const qrElement = document.getElementById('qr-code-img');
    if (!qrElement) return;
    html2canvas(qrElement).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('QR code downloaded!', { position: 'top-center' });
    });
  }

  function handleCopyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(qrUrl).then(() => {
        setCopied(true);
        toast.success('Link copied to clipboard!', { position: 'top-center' });
        setTimeout(() => setCopied(false), 1500);
      });
    }
  }

  // Toggle card visibility
  async function handleToggleVisibility(card) {
    try {
      const url = `/api/card`;
      const storedToken = localStorage.getItem('jwtToken');
      const headers = {
        Authorization: `Bearer ${storedToken}`
      };
      const newExpose = !card.config?.expose;
      // Send the full card object with updated config.expose
      const updatedCard = { ...card, config: { ...card.config, expose: newExpose } };
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(updatedCard)
      });
      if (response.ok) {
        setCards(cards.map(c => c.id === card.id ? { ...c, config: { ...c.config, expose: newExpose } } : c));
        toast.success(`Card is now ${newExpose ? 'Visible' : 'Hidden'}!`, { position: 'top-center' });
      } else {
        toast.error('Failed to update visibility', { position: 'top-center' });
      }
    } catch (err) {
      toast.error('Error updating visibility', { position: 'top-center' });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">My Cards <span role='img' aria-label='card'>💳</span></h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">Loading cards...</p>
        </div>
      )}
      {!loading && cards.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-xl text-gray-500">No cards found. Create your first card!</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {!loading && cards.map((card, index) => (
          <div key={card.id || index} className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-between border border-gray-100 w-full max-w-xs min-h-[420px] transition-shadow hover:shadow-md">
            <Link to={`/build/${card.id}`} className="w-full flex-1 flex flex-col items-center">
              {/* Unified Card Preview */}
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
              {/* Card Actions */}
              <div className="flex justify-between items-center w-full mt-4">
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">{card.title || 'Untitled Card'}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      onChange={() => handleToggleVisibility(card)}
                      checked={!!card.config?.expose}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#22c55e"
                      offColor="#ef4444"
                      height={20}
                      width={40}
                    />
                    <span className={card.config?.expose ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
                      {card.config?.expose ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    type='button'
                    onClick={(e) => { e.preventDefault(); handleShare(card); }}
                    className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-3 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    Share
                  </button>
                  <button
                    type='button'
                    onClick={(e) => { e.preventDefault(); deleteCard(card.id); }}
                    className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-red-500 bg-transparent px-3 text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* Create New Card grid item */}
        {!loading && (
          <div
            className="bg-white rounded-lg border-2 border-dashed border-[#00C853] flex flex-col items-center justify-center cursor-pointer hover:bg-[#00C853] transition-all hover:scale-[1.02] shadow-md w-full max-w-xs min-h-[420px] group"
            onClick={() => navigate('/build/0')}
          >
            <div className="flex flex-col items-center justify-center h-full w-full py-8">
              <FaPlus className="text-5xl text-[#00C853] mb-4 group-hover:text-white transition-colors" />
              <span className="text-xl font-semibold text-[#00C853] group-hover:text-white transition-colors">Create New Card</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative w-full max-w-xs">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setQrModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Share Card</h3>
            <div id="qr-code-img" className="mb-4">
              <QRCodeSVG value={qrUrl} size={180} />
            </div>
            <input
              type="text"
              value={qrUrl}
              readOnly
              className="w-full mb-2 p-2 border rounded text-xs text-gray-600 bg-gray-100"
              onFocus={e => e.target.select()}
            />
            <div className="flex gap-2 mb-2">
              <button onClick={handleCopyLink} className="px-3 py-1 bg-blue-500 text-white rounded text-xs">{copied ? 'Copied!' : 'Copy Link'}</button>
              <button onClick={handleDownloadQR} className="px-3 py-1 bg-green-500 text-white rounded text-xs">Download QR</button>
            </div>
            <div className="flex gap-3 mt-2">
              <button onClick={() => handleSharePlatform('whatsapp')} className="text-green-500 text-2xl" title="Share on WhatsApp"><FaWhatsapp /></button>
              <button onClick={() => handleSharePlatform('facebook')} className="text-blue-600 text-2xl" title="Share on Facebook"><FaFacebook /></button>
              <button onClick={() => handleSharePlatform('twitter')} className="text-blue-400 text-2xl" title="Share on Twitter"><FaTwitter /></button>
              <button onClick={() => handleSharePlatform('linkedin')} className="text-blue-700 text-2xl" title="Share on LinkedIn"><FaLinkedin /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards;