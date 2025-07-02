import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaPlus } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import Switch from "react-switch";

const key = 123; // The encryption/decryption key

// Hardcoded base URL for QR code (change this for production)
const QR_BASE_URL = "http://192.168.1.13:5173";

function encryptData(id) {
  return id ^ key;
}

function getNetworkUrl(path = "") {
  // Try to use the network IP if available, fallback to window.location.origin
  const { protocol, hostname, port } = window.location;
  let host = hostname;
  // If localhost, try to use the network IP
  if (host === "localhost" || host === "127.0.0.1") {
    // Try to get the local network IP from window.location (works if accessed via IP)
    host = window.location.host.replace(/:.*/, "");
  }
  return `${protocol}//${host}${port ? ":" + port : ""}${path}`;
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

    const res = await response.json();
      console.log("Validate response:", res);

    if (response.status != 200) {
        console.log("Token validation failed, redirecting to login");
      navigate("/login");
    } else {
        console.log("Token validation successful");
      setProfile(res);
      }
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
        console.log("Error getting cards:", response.status);
        setError(`Failed to fetch cards: ${response.status}`);
    }

    const res = await response.json();
      console.log("Cards response:", res);
      setCards(res || [])
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
    // Use hardcoded network IP for QR code
    const url = `${QR_BASE_URL}/digital-card?user=${profile.username}&type=digital-card&org=onfra&query=${card.id}`;
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
    <div className="min-h-screen bg-onfra-grayBg p-6 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-onfra-green">My Cards</h1>
        {/* Removed + Create Card button as requested */}
      </div>
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          <h2 className="text-lg font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-xl">Loading cards...</p>
        </div>
      )}
      
      {!loading && cards.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-xl">No cards found. Create your first card!</p>
        </div>
      )}
      
      {qrModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center relative">
            <button onClick={() => setQrModalOpen(false)} className="absolute top-2 right-2 text-black text-2xl">&times;</button>
            <h2 className="text-black text-xl font-bold mb-4">Share this card</h2>
            <div id="qr-code-img" className="bg-white p-2 rounded">
              <QRCodeSVG value={qrUrl} size={180} />
            </div>
            <button onClick={handleDownloadQR} className="mt-4 bg-gray-800 hover:bg-gray-900 text-white rounded px-4 py-2">Download QR</button>
            <button onClick={handleCopyLink} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2">{copied ? 'Copied!' : 'Copy Link'}</button>
            {shareError && <div className="text-red-600 text-sm mt-2">{shareError}</div>}
            <div className="mt-6 flex flex-col items-center">
              <span className="text-black font-semibold mb-2">Share via</span>
              <div className="flex gap-4">
                <button
                  title="Share the QR code link via WhatsApp"
                  onClick={() => handleSharePlatform('whatsapp')}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 text-xl"
                >
                  <FaWhatsapp />
                </button>
                <button
                  title="Share the QR code link via Facebook"
                  onClick={() => handleSharePlatform('facebook')}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 text-xl"
                >
                  <FaFacebook />
                </button>
                <button
                  title="Share the QR code link via Twitter"
                  onClick={() => handleSharePlatform('twitter')}
                  className="bg-blue-400 hover:bg-blue-500 text-white rounded-full p-3 text-xl"
                >
                  <FaTwitter />
                </button>
                <button
                  title="Share the QR code link via LinkedIn"
                  onClick={() => handleSharePlatform('linkedin')}
                  className="bg-blue-800 hover:bg-blue-900 text-white rounded-full p-3 text-xl"
                >
                  <FaLinkedin />
                </button>
              </div>
              <span className="text-xs text-gray-600 mt-2">These buttons share the QR code link. To share the image, download and upload it manually.</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 justify-items-center">
        {!loading && cards.map((card, index) => {
          console.log("Rendering card:", card);
          if (!card) {
            console.log("Card is null or undefined");
            return null;
          }
          
            return (
            <div key={card.id || index} className="card w-full md:w-full lg:w-full h-[470px] border-2 border-gray-600 rounded-md flex flex-col items-center">
              <Link to={`/build/${card.id}`} >
                <div className="preview h-[80%] m-3 rounded-md transition-all overflow-hidden w-96">
                    <div className="">
                    <div style={{ backgroundColor: card.primaryBackgroundColor || '#ffffff' }} className={`p-4 rounded-lg w-96 shadow-xl h-[80%] relative `}>
                      {card.logo && card.logo.includes("/images") ?
                          <img src={"/api" + card.logo} alt="Cover" className="p-4 w-24 absolute object-cover mb-4 rounded-lg" /> :
                        card.logo ? <img src={card.logo} alt="Cover" className="p-4 w-24 absolute object-cover mb-4 rounded-lg" /> : null
                        }
                      {card.profilePhoto && card.profilePhoto.includes("/images") ?
                          <img src={"/api" + card.profilePhoto} alt="Cover" className="w-28 shadow-2xl mt-2 z-50  absolute right-1/2 translate-x-1/2  top-[110px] mx-auto rounded-full mb-4" /> :
                        card.profilePhoto ? <img src={card.profilePhoto} alt="Cover" className="w-28 shadow-2xl mt-2 z-50  absolute right-1/2 translate-x-1/2  top-[110px] mx-auto rounded-full mb-4" /> : null
                      }
                      <div className="text-center">
                        {card.coverPhoto && card.coverPhoto.includes("/images") ?
                          <img src={"/api" + card.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" /> :
                          card.coverPhoto ? <img src={card.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" /> : null
                        }
                        <div style={{ backgroundColor: card.secondaryBackgroundColor || '#f3f4f6' }} className="p-4 rounded-lg mb-4 shadow-xl">
                          <h3 style={{ color: card.titleColor || '#000000' }} className="text-2xl font-bold mt-10">
                            {card.firstName || 'First'} {card.lastName || 'Last'}
                            </h3>
                          <p style={{ color: card.textColor || '#000000' }} className="text-lg">{card.jobTitle || 'Job Title'}</p>
                          <p style={{ color: card.textColor || '#000000' }} className="text-gray-400">{card.businessName || 'Business Name'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center w-96 m-3'>
                    <div>
                    <h1 className='text-xl  font-semibold tracking-tight text-white'> {card.title || 'Untitled Card'} </h1>
                    <div className='flex items-center gap-2 mt-2'>
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(card);
                      }}
                      className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-3 text-xs font-medium text-white transition-all active:translate-y-[2px] active:shadow-none"
                    >
                      Share
                    </button>
                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        deleteCard(card.id);
                      }}
                      className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md border border-red-500 bg-transparent px-3 text-xs font-medium text-red-500 transition-all active:translate-y-[2px] active:shadow-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
        {/* Create New Card grid item */}
        {!loading && (
          <div
            className="w-full md:w-full lg:w-full h-[470px] border-2 border-dashed border-[#00A86B] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all bg-[#00A86B] hover:bg-[#008f5d] text-white p-6"
            style={{ minWidth: '320px', minHeight: '400px' }}
            onClick={() => navigate('/build/0')}
          >
            <div className="flex flex-col items-center justify-center h-full w-full">
              <FaPlus className="text-5xl mb-4" />
              <span className="text-xl font-semibold">Create New Card</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Cards;