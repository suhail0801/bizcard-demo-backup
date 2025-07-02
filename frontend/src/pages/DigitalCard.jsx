import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGithub, FaWhatsapp, FaTrash, FaPhone, FaSms, FaGlobe, FaSignal, FaTelegram, FaSkype, FaViber, FaWeixin, FaImage, FaSignOutAlt } from 'react-icons/fa';
import { RiHomeLine, RiMessengerLine } from 'react-icons/ri'; // Additional icons from other packages
import { SiXmpp } from 'react-icons/si'; // XMPP icon
import { FaArtstation, FaPaypal, FaPatreon, FaDribbble, FaTiktok, FaPinterest, FaSnapchat, FaSoundcloud, FaSpotify, FaTumblr, FaTwitch, FaVimeo, FaYoutube } from 'react-icons/fa';
import { SiBuymeacoffee, SiDiaspora, SiCodeberg, SiQuora, SiOpencollective, SiPeertube, SiVk, SiYelp, SiMedium, SiReddit, SiThreads } from 'react-icons/si';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultAvatar from '../assets/default-avatar.jpg';
import BizCardAuthModal from './BizCardAuthModal';
import ProfileAvatar from '../react_components/ProfileAvatar';
import ProfileEditModal from '../react_components/ProfileEditModal';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function App() {

    function generateURL(platform, userInput) {
        let action = actions.find(a => a.platform === platform) || additionalActions.find(a => a.platform === platform);
    
        if (action) {
            return action.prefix + userInput;
        } else {
            return 'Invalid platform';
        }
    }

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encryptedQuery = queryParams.get('query');

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [jwtToken, setJwtToken] = useState(null); // Only set after modal login/signup
    const [showProfileEdit, setShowProfileEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        getCard();
        // DO NOT check for any existing JWT or user session here
        setIsAuthenticated(false);
        setUserProfile(null);
        setContacts([]);
        setJwtToken(null);
    }, []);

    const [formData, setFormData] = useState(null); // No defaults, only set after fetch
    const [featuredContent, setFeaturedContent] = useState([]);
    const [config, setConfig] = useState({
        expose: false,
        enableAddToContact: false
    });

    const [errors, setErrors] = useState({});
    const [socialLinkInput, setSocialLinkInput] = useState({ platform: '', url: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // document.getElementById('save-contact-btn').addEventListener('click', function () {

    // });

    async function handleAddToContact() {
        if (!isAuthenticated || !jwtToken) {
            setShowLoginModal(true);
            return;
        }
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    contactUserId: formData.userId || formData.id,
                    contactName: `${formData.firstName} ${formData.lastName}`,
                    contactEmail: formData.email,
                    contactPhone: formData.mobile,
                    contactCardId: formData.id,
                    jobTitle: formData.jobTitle || formData['job title'] || '',
                    businessName: formData.businessName || formData.business || '',
                    sharedBack: false,
                    notes: ''
                })
            });
            if (response.ok) {
                toast.success('Contact added successfully!', { position: 'top-center' });
                loadContacts(jwtToken);
            } else {
                const data = await response.json();
                if (data && data.error === 'You cannot add yourself as a contact.') {
                    toast.error('You cannot add yourself as a contact.', { position: 'top-center' });
                } else {
                    toast.error('Failed to add contact', { position: 'top-center' });
                }
            }
        } catch (err) {
            toast.error('Error adding contact', { position: 'top-center' });
        }
    }

    async function handleShareMyContact() {
        if (!isAuthenticated || !jwtToken || !userProfile || !formData) {
            setShowLoginModal(true);
            return;
        }
        console.log('DEBUG: formData (card owner):', formData);
        console.log('DEBUG: userProfile (visitor):', userProfile);
        const cardOwnerId = formData.userId || formData.id;
        const visitorId = userProfile.id;
        console.log('handleShareMyContact: cardOwnerId:', cardOwnerId, 'visitorId:', visitorId);
        if (String(cardOwnerId) === String(visitorId)) {
            toast.error('You cannot share your contact with yourself.', { position: 'top-center' });
            return;
        }
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({
                    userId: cardOwnerId, // card owner
                    contactUserId: visitorId, // visitor
                    contactName: userProfile.username,
                    contactEmail: userProfile.email,
                    contactPhone: userProfile.mobile,
                    jobTitle: userProfile.jobTitle,
                    businessName: userProfile.businessName,
                    savedBy: `by ${userProfile.username}`,
                    notes: ''
                })
            });
            if (response.ok) {
                toast.success('Contact shared successfully!', { position: 'top-center' });
            } else {
                toast.error('Failed to share contact', { position: 'top-center' });
            }
        } catch (err) {
            toast.error('Error sharing contact', { position: 'top-center' });
        }
    }   

    const handleFeaturedContentChange = (index, key, value) => {
        // e.preventDefault();
        const newFeaturedContent = [...featuredContent];
        newFeaturedContent[index][key] = value;
        setFeaturedContent(newFeaturedContent);
    };

    async function getCard() {
        const url = `/api/publiccard?id=${(encryptedQuery)}`;
        try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
                throw new Error('Failed to load card data');
        }
        const res = await response.json();
            console.log('Fetched card data:', res); // Debug log
            setFormData(res);
        setConfig(res.config ? res.config : config)
        setFeaturedContent(res.featuredContent ? res.featuredContent : [])
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Unknown error');
            setLoading(false);
            toast.error('Failed to load business card. Please check the link or try again later.', { position: 'top-center' });
        }
    }

    // Called after modal login/signup is successful
    async function handleLoginSuccess(token, profile) {
        setJwtToken(token);
        // Do not store in localStorage
        // Prevent card owner from logging in
        if (profile.email === formData.email) {
            toast.error('You cannot perform this action as the card owner.', { position: 'top-center' });
            setShowLoginModal(false);
            setIsAuthenticated(false);
            setUserProfile(null);
            setContacts([]);
            setJwtToken(null);
            return;
        }
        setUserProfile(profile);
        setIsAuthenticated(true);
        setShowLoginModal(false);
        loadContacts(token);
    }

    async function loadContacts(token) {
        try {
            const res = await fetch('/api/contacts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setContacts(data);
            }
        } catch {}
    }

    // Only allow add/share after login
    function handleAuthAction() {
        setShowLoginModal(true);
    }

    // Add logout handler
    function handleLogout() {
        setIsAuthenticated(false);
        setUserProfile(null);
        setContacts([]);
        setJwtToken(null);
    }

    // Add edit profile button logic
    const isCardOwner = isAuthenticated && userProfile && formData && userProfile.email === formData.email;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-xl animate-pulse">Loading business card...</div>
            </div>
        );
    }
    if (error || !formData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                {/* Toast will already show error */}
            </div>
        );
    }

    console.log('Rendering card with formData:', formData); // Debug log

    return (
        <div className="min-h-screen p-8 text-white" style={{ backgroundColor: '#0f172a' }}>
            <ToastContainer />
            {/* Profile Bar */}
            {isAuthenticated && userProfile && (
                <div className="flex justify-end items-center mb-4">
                    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg shadow">
                        <img
                            src={userProfile.profilePhoto && userProfile.profilePhoto.startsWith('/uploads/profile_photos') ? '/api' + userProfile.profilePhoto : (userProfile.profilePhoto || defaultAvatar)}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border-2 border-white cursor-pointer"
                            onClick={() => setShowProfileEdit(true)}
                            title="Edit Profile"
                        />
                        <span className="text-white font-semibold text-sm">{userProfile.username || userProfile.email}</span>
                        <button onClick={handleLogout} className="ml-2 text-red-400 hover:text-red-600" title="Logout">
                            <FaSignOutAlt size={18} />
                            </button>
                        </div>
                                    </div>
            )}
            {/* Business Card Header */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-6 tracking-wide">Business Card</h1>
            <BizCardAuthModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                {/* Business Card Container */}
                <div className="flex-1 flex flex-col items-center">
                    {formData && (
                        <BusinessCardPreview card={formData} />
                    )}
                    {/* Buttons below the card */}
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-md mx-auto mt-2">
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
                            onClick={handleAddToContact}
                        >
                            Add To Contact
                        </button>
                        <button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
                            onClick={handleShareMyContact}
                        >
                            Share My Contact
                        </button>
                                </div>
                            </div>
                {/* Contacts Section - Only show after login and not card owner */}
                {isAuthenticated && userProfile && userProfile.email !== formData.email && (
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full text-gray-900">
                            <h2 className="text-2xl font-bold mb-6 text-center">Your Contacts</h2>
                            {contacts.length === 0 ? (
                                <div className="text-gray-500 text-center p-8 bg-gray-100 rounded-lg">
                                    No contacts found.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-300">
                                                <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Business</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Job Title</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Email</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Phone</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Saved By</th>
                                                <th className="py-3 px-4 font-semibold text-gray-700">Added At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contacts.map(contact => (
                                                <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                                                    <td className="py-3 px-4 font-medium">{contact.contactName}</td>
                                                    <td className="py-3 px-4">{contact.business || contact.businessName}</td>
                                                    <td className="py-3 px-4">{contact['job title'] || contact.jobTitle}</td>
                                                    <td className="py-3 px-4">{contact.contactEmail}</td>
                                                    <td className="py-3 px-4">{formatPhone(contact.contactPhone)}</td>
                                                    <td className="py-3 px-4">{contact.savedBy}</td>
                                                    <td className="py-3 px-4">{contact.addedAt ? new Date(contact.addedAt).toLocaleString() : ''}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {showProfileEdit && (
                <ProfileEditModal isOpen={showProfileEdit} onClose={() => setShowProfileEdit(false)} userProfile={userProfile} onUpdate={setUserProfile} jwtToken={jwtToken} />
            )}
        </div>
    );
}

const actions = [
    { platform: 'Office', prefix: 'tel:', placeholder: 'office-number', color: '#204568' },
    { platform: 'Home', prefix: 'tel:', placeholder: 'home-number', color: '#204568' },
    { platform: 'SMS', prefix: 'sms:', placeholder: 'number', color: '#204568' },
    { platform: 'Website', prefix: 'https://', placeholder: 'www.example.com', color: '#204568' },
    { platform: 'Signal', prefix: 'https://signal.me/#p/', placeholder: 'number', color: '#3A76F0' },
    { platform: 'Telegram', prefix: 'https://t.me/', placeholder: 'username', color: '#0088CC' },
    { platform: 'WhatsApp', prefix: 'https://wa.me/', placeholder: 'number', color: '#25D366' },
    { platform: 'Messenger', prefix: 'https://m.me/', placeholder: 'username', color: '#0078FF' },
    { platform: 'Skype', prefix: 'skype:', placeholder: 'username?chat', color: '#00AFF0' },
    { platform: 'Viber', prefix: 'viber://chat?number=', placeholder: 'number', color: '#665CAC' },
    { platform: 'WeChat', prefix: 'weixin://dl/chat?username=', placeholder: 'username', color: '#7BB32E' },
    { platform: 'XMPP', prefix: 'xmpp:', placeholder: 'username@domain', color: '#005CB9' }
];

const additionalActions = [
    { platform: 'ArtStation', prefix: 'https://www.artstation.com/', placeholder: 'username', color: '#13AFF0' },
    { platform: 'Buy me a coffee', prefix: 'https://www.buymeacoffee.com/', placeholder: 'username', color: '#FFDD00' },
    { platform: 'Codeberg', prefix: 'https://codeberg.org/', placeholder: 'username', color: '#2185D0' },
    { platform: 'Diaspora', prefix: 'https://diasporafoundation.org/', placeholder: 'username', color: '#000000' },
    { platform: 'Dribbble', prefix: 'https://dribbble.com/', placeholder: 'username', color: '#EA4C89' },
    { platform: 'Facebook', prefix: 'https://www.facebook.com/', placeholder: 'username', color: '#1877F2' },
    { platform: 'GitHub', prefix: 'https://github.com/', placeholder: 'username', color: '#181717' },
    { platform: 'Instagram', prefix: 'https://www.instagram.com/', placeholder: 'username', color: '#E1306C' },
    { platform: 'LinkedIn', prefix: 'https://www.linkedin.com/in/', placeholder: 'username', color: '#0A66C2' },
    { platform: 'Medium', prefix: 'https://medium.com/@', placeholder: 'username', color: '#000000' },
    { platform: 'Open-Collective', prefix: 'https://opencollective.com/', placeholder: 'username', color: '#3385FF' },
    { platform: 'Patreon', prefix: 'https://www.patreon.com/', placeholder: 'username', color: '#F96854' },
    { platform: 'PayPal', prefix: 'https://paypal.me/', placeholder: 'username', color: '#00457C' },
    { platform: 'Peertube', prefix: 'https://peertube.social/accounts/', placeholder: 'username', color: '#F1680C' },
    { platform: 'Pinterest', prefix: 'https://www.pinterest.com/', placeholder: 'username', color: '#BD081C' },
    { platform: 'Quora', prefix: 'https://www.quora.com/profile/', placeholder: 'username', color: '#B92B27' },
    { platform: 'Reddit', prefix: 'https://www.reddit.com/user/', placeholder: 'username', color: '#FF4500' },
    { platform: 'Snapchat', prefix: 'https://www.snapchat.com/add/', placeholder: 'username', color: '#FFFC00' },
    { platform: 'Soundcloud', prefix: 'https://soundcloud.com/', placeholder: 'username', color: '#FF3300' },
    { platform: 'Spotify', prefix: 'https://open.spotify.com/user/', placeholder: 'username', color: '#1DB954' },
    { platform: 'Threads', prefix: 'https://threads.net/', placeholder: 'username', color: '#000000' },
    { platform: 'TikTok', prefix: 'https://www.tiktok.com/@', placeholder: 'username', color: '#010101' },
    { platform: 'Tumblr', prefix: 'https://', placeholder: 'username.tumblr.com', color: '#001935' },
    { platform: 'Twitch', prefix: 'https://www.twitch.tv/', placeholder: 'username', color: '#9146FF' },
    { platform: 'Twitter', prefix: 'https://twitter.com/', placeholder: 'username', color: '#1DA1F2' },
    { platform: 'Vimeo', prefix: 'https://vimeo.com/', placeholder: 'username', color: '#1AB7EA' },
    { platform: 'VK', prefix: 'https://vk.com/', placeholder: 'username', color: '#4C75A3' },
    { platform: 'Yelp', prefix: 'https://www.yelp.com/user_details?userid=', placeholder: 'username', color: '#D32323' },
    { platform: 'YouTube', prefix: 'https://www.youtube.com/c/', placeholder: 'username', color: '#FF0000' }
];

function formatPhone(phone) {
    if (!phone) return '';
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (phoneNumber) {
        return phoneNumber.formatInternational();
    }
    return phone;
}

const IconHandler = ({ platform }) => {
    switch (platform) {
        case 'Office':
            return <FaPhone />;
        case 'Home':
            return <RiHomeLine />;
        case 'SMS':
            return <FaSms />;
        case 'Website':
            return <FaGlobe />;
        case 'Signal':
            return <FaSignal />;
        case 'Telegram':
            return <FaTelegram />;
        case 'WhatsApp':
            return <FaWhatsapp />;
        case 'Messenger':
            return <RiMessengerLine />;
        case 'Skype':
            return <FaSkype />;
        case 'Viber':
            return <FaViber />;
        case 'WeChat':
            return <FaWeixin />;
        case 'XMPP':
            return <SiXmpp />;
        case 'LinkedIn':
            return <FaLinkedin />;
        case 'ArtStation':
            return <FaArtstation />;
        case 'Buy me a coffee':
            return <SiBuymeacoffee />;
        case 'Cash App':
            return <SiCashapp />;
        case 'Codeberg':
            return <SiCodeberg />;
        case 'Diaspora':
            return <SiDiaspora />;
        case 'Dribbble':
            return <FaDribbble />;
        case 'Facebook':
            return <FaFacebook />;
        case 'GitHub':
            return <FaGithub />;
        case 'Instagram':
            return <FaInstagram />;
        case 'Medium':
            return <SiMedium />;
        case 'LinkedIn':
            return <FaLinkedin />;
        case 'Open-Collective':
            return <SiOpencollective />;
        case 'Patreon':
            return <FaPatreon />;
        case 'PayPal':
            return <FaPaypal />;
        case 'Peertube':
            return <SiPeertube />;
        case 'Pinterest':
            return <FaPinterest />;
        case 'Quora':
            return <SiQuora />;
        case 'Reddit':
            return <SiReddit />;
        case 'Snapchat':
            return <FaSnapchat />;
        case 'Soundcloud':
            return <FaSoundcloud />;
        case 'Spotify':
            return <FaSpotify />;
        case 'Threads':
            return <SiThreads />;
        case 'TikTok':
            return <FaTiktok />;
        case 'Tumblr':
            return <FaTumblr />;
        case 'Twitch':
            return <FaTwitch />;
        case 'Twitter':
            return <FaTwitter />;
        case 'Vimeo':
            return <FaVimeo />;
        case 'VK':
            return <SiVk />;
        case 'Yelp':
            return <SiYelp />;
        case 'YouTube':
            return <FaYoutube />;
        default:
            return null;
    }
};

function BusinessCardPreview({ card }) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-0 overflow-hidden relative my-4">
            <div className="w-full h-32 md:h-40 bg-gray-200 relative">
                {card.coverPhoto && (
                    <img
                        src={card.coverPhoto}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                )}
                {card.profilePhoto && (
                    <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-20">
                        <img
                            src={card.profilePhoto.startsWith('/uploads') ? '/api' + card.profilePhoto : card.profilePhoto}
                            alt="Profile"
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg object-cover bg-gray-100"
                        />
                    </div>
                )}
            </div>
            <div className="pt-16 pb-8 px-6 flex flex-col items-center text-center">
                {card.title && <div className="uppercase tracking-widest text-sm text-gray-700 font-bold mb-3">{card.title}</div>}
                {(card.firstName || card.lastName) && (
                    <div className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">{card.firstName} {card.lastName}</div>
                )}
                {card.jobTitle && <div className="text-lg text-gray-600 font-medium mb-1">{card.jobTitle}</div>}
                {card.businessName && <div className="text-base text-gray-400 mb-4">{card.businessName}</div>}
            </div>
        </div>
    );
}

export default App;
