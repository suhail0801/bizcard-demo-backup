import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGithub, FaWhatsapp, FaTrash, FaPhone, FaSms, FaGlobe, FaSignal, FaTelegram, FaSkype, FaViber, FaWeixin, FaImage } from 'react-icons/fa';
import { RiHomeLine, RiMessengerLine } from 'react-icons/ri'; // Additional icons from other packages
import { SiXmpp } from 'react-icons/si'; // XMPP icon
import { FaArtstation, FaPaypal, FaPatreon, FaDribbble, FaTiktok, FaPinterest, FaSnapchat, FaSoundcloud, FaSpotify, FaTumblr, FaTwitch, FaVimeo, FaYoutube } from 'react-icons/fa';
import { SiBuymeacoffee, SiDiaspora, SiCodeberg, SiQuora, SiOpencollective, SiPeertube, SiVk, SiYelp, SiMedium, SiReddit, SiThreads } from 'react-icons/si';
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString, isValidPhoneNumber } from 'libphonenumber-js';
import defaultAvatar from '../assets/default-avatar.jpg';
import LiveCardPreview from '../components/LiveCardPreview';


function App() {

    const navigate = useNavigate();
    const params = useParams();
    const id = params.id
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if (id != 0) {
            getCard();
        } else {
            // Autofill from user profile for new card
            fetch('/user/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    let mobile = data.mobile || '';
                    if (mobile.startsWith('+')) {
                        // If already has a space after country code, do not re-normalize
                        if (!/^\+\d{1,3} \d+/.test(mobile)) {
                            // Remove all spaces first
                            mobile = mobile.replace(/\s+/g, '');
                            const matchAuto = mobile.match(/^(\+\d{1,3})(\d+)/);
                            if (matchAuto) {
                                mobile = matchAuto[1] + ' ' + matchAuto[2];
                            }
                        }
                    }
                    setFormData(prev => ({
                        ...prev,
                        email: data.email || '',
                        mobile: mobile,
                        jobTitle: data.jobTitle || '',
                        businessName: data.businessName || '',
                        profilePhoto: data.profilePhoto || prev.profilePhoto,
                        firstName: data.username || '',
                        lastName: '',
                        // Optionally: firstName, lastName if you want to split username
                    }));
                });
        }
        validateToken();
    }, []);

    const [formData, setFormData] = useState({
        id: null,
        firstName: 'Jhon',
        lastName: 'Doe',
        title: 'Digital Business Card',
        jobTitle: 'Designer',
        businessName: 'Onfra proptech soltuions',
        profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv4efwDYARf5XR46l60ibliIEuSnj6oRFZA&s',
        logo: 'https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png',
        coverPhoto: 'https://i.pinimg.com/originals/93/c5/9f/93c59fb55f3fdc378385274a6fcef7d5.gif',
        primaryActions: [],
        secondaryActions: [],
        primaryBackgroundColor: "",
        secondaryBackgroundColor: "",
        textColor: "",
        titleColor: "",
        expose: false,
        featured_video: '',
    });

    const [featuredContent, setFeaturedContent] = useState([]);
    const [config, setConfig] = useState({
        expose: false,
        enableAddToContact: false
    });

    const [errors, setErrors] = useState({});
    const [socialLinkInput, setSocialLinkInput] = useState({ platform: '', url: '' });
    const [phoneError, setPhoneError] = useState('');
    const [emails, setEmails] = useState(['']);
    const [mobiles, setMobiles] = useState(['']);

    // Add missing functions for mobiles
    const handleMobileChange = (idx, value) => {
        setMobiles(prev => prev.map((m, i) => i === idx ? value : m));
    };
    const addMobile = () => {
        setMobiles(prev => [...prev, '']);
    };
    const removeMobile = (idx) => {
        setMobiles(prev => prev.filter((_, i) => i !== idx));
    };
    // Add missing functions for emails
    const handleEmailChange = (idx, value) => {
        setEmails(prev => prev.map((e, i) => i === idx ? value : e));
    };
    const addEmail = () => {
        setEmails(prev => [...prev, '']);
    };
    const removeEmail = (idx) => {
        setEmails(prev => prev.filter((_, i) => i !== idx));
    };

    // Add state for new fields
    const [aboutYourself, setAboutYourself] = useState('');
    const [tags, setTags] = useState([]); // array of tag strings
    const [tagInput, setTagInput] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [customUrlError, setCustomUrlError] = useState('');
    const [featured_video, setFeatured_video] = useState('');
    const [aboutWordCount, setAboutWordCount] = useState(0);
    const BASE_URL = '/page/'; // for preview, can be changed later
    const CUSTOM_URL_REGEX = /^[a-z0-9_-]{3,50}$/;
    const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/i;
    const VIMEO_REGEX = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+/i;
    const RESERVED_URLS = ['admin', 'login', 'logout', 'register', 'page', 'user', 'api', 'dashboard', 'settings'];

    // Ensure aboutWordCount is updated when aboutYourself changes (including autofill)
    useEffect(() => {
      const words = aboutYourself.trim().split(/\s+/).filter(Boolean);
      setAboutWordCount(aboutYourself ? words.length : 0);
    }, [aboutYourself]);


    function formatPhone(phone) {
        if (!phone) return '';
        const phoneNumber = parsePhoneNumberFromString(phone);
        if (phoneNumber) {
            return phoneNumber.formatInternational();
        }
        return phone;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({ ...formData, [name]: event.target.result });
            };
            reader.readAsDataURL(file);
        } else {
            setErrors({ ...errors, [name]: 'Please upload a valid image file.' });
            toast.error('Please upload a valid image file.');
        }
    };

    const handleSocialLinkChange = (e, index, type) => {
        const { name, value } = e.target;
        if (type == "primary") {
            const updatedSocialLinks = [...formData.primaryActions];
            updatedSocialLinks[index][name] = value;
            setFormData({ ...formData, primaryActions: updatedSocialLinks });
        } else {
            const updatedSocialLinks = [...formData.secondaryActions];
            updatedSocialLinks[index][name] = value;
            setFormData({ ...formData, secondaryActions: updatedSocialLinks });
        }
    };

    const handleAddSocialLink = ({ platform, placeholder, color, type }) => {
        if (type == "primary") {

            if (formData.primaryActions.some((link) => link.platform === platform)) {
                console.log("Platform already exists, not adding.");
                return;
            }

            setFormData({
                ...formData,
                primaryActions: [...formData.primaryActions, { platform, url: socialLinkInput.url, placeholder, color }]
            });
            setSocialLinkInput({ platform: '', url: '' });

        } else {
            if (formData.secondaryActions.some((link) => link.platform === platform)) {
                console.log("Platform already exists, not adding.");
                return;
            }

            setFormData({
                ...formData,
                secondaryActions: [...formData.secondaryActions, { platform, url: socialLinkInput.url, placeholder, color }]
            });
        }

    };

    const removePlatform = (index, type) => {

        if (type == "primary") {

            setFormData({
                ...formData,
                primaryActions: formData.primaryActions.filter((_, i) => i !== index)
            });

        } else {

            setFormData({
                ...formData,
                secondaryActions: formData.secondaryActions.filter((_, i) => i !== index)
            });

        }

    };

    const handleSubmit = async (e) => {
        // if(id == 0) return 0
        e.preventDefault();
        console.log('Form data submitted:', featuredContent);
        // return 0
        await saveCard({ featuredContent: featuredContent, ...formData, config })
    };

    const handleAddFeaturedContent = () => {
        // e.preventDefault();
        setFeaturedContent([...featuredContent, { type: '', content: '' }]);
    };

    const handleRemoveFeaturedContent = (index) => {
        // e.preventDefault();
        setFeaturedContent(featuredContent.filter((_, i) => i !== index));
    };

    const handleFeaturedContentChange = (index, key, value) => {
        // e.preventDefault();
        const newFeaturedContent = [...featuredContent];
        newFeaturedContent[index][key] = value;
        setFeaturedContent(newFeaturedContent);
    };

    const handleVideoChange = (event, index) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {  // MAX 5MB
            const url = URL.createObjectURL(file);
            handleFeaturedContentChange(index, 'content', url);
        } else {
            toast.error('Video size exceeds the limit of 5MB');
        }
    };
    const handleProductImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleFeaturedContentChange(index, 'image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // About Me handler
    const handleAboutChange = (e) => {
      const value = e.target.value;
      const words = value.trim().split(/\s+/);
      if (words.length <= 150) {
        setAboutYourself(value);
        setAboutWordCount(words.length);
      }
    };
    // Tags handler
    const handleTagInputChange = (e) => {
      setTagInput(e.target.value);
    };
    const handleTagInputKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
        const newTag = tagInput.trim();
        if (!tags.includes(newTag)) {
          setTags([...tags, newTag]);
        }
        setTagInput('');
        e.preventDefault();
      }
    };
    const removeTag = (idx) => {
      setTags(tags.filter((_, i) => i !== idx));
    };
    // Custom URL handler
    const handleCustomUrlChange = (e) => {
      const value = e.target.value.toLowerCase();
      setCustomUrl(value);
      if (!CUSTOM_URL_REGEX.test(value) || RESERVED_URLS.includes(value)) {
        setCustomUrlError('Only lowercase letters, numbers, dashes, underscores (3-50 chars), not reserved words.');
        toast.error('Only lowercase letters, numbers, dashes, underscores (3-50 chars), not reserved words.');
      } else {
        setCustomUrlError('');
      }
    };
    // Featured Video handler
    const handleFeaturedVideoChange = (e) => {
      setFeatured_video(e.target.value);
    };


    async function saveCard(formData) {
        console.log(featuredContent, "RAW DATA")
        // return 0
        const url = `/api/card`;

        const storedToken = localStorage.getItem('jwtToken');

        //     // Include the token in the headers for the request
        const headers = {
            Authorization: `Bearer ${storedToken}`
        };

        // Normalize mobile before saving
        let mobile = formData.mobile || '';
        if (mobile.startsWith('+')) {
            // Remove all spaces first
            mobile = mobile.replace(/\s+/g, '');
            const matchSave = mobile.match(/^(\+\d{1,3})(\d+)/);
            if (matchSave) {
                mobile = matchSave[1] + ' ' + matchSave[2];
            }
        }
        // Use first value as primary
        const email = emails[0] || '';
        const response = await fetch(url, {
            method: formData.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({ ...formData, emails, mobiles, email, mobile, featuredContent, featured_video: featured_video, about_yourself: aboutYourself, tags, custom_url: customUrl, featured_video: featured_video }),
        });

        if (!response.ok) {
            console.log("error")
            toast.error('Failed to save card. Please try again.');
        }

        const data = await response.json();
        toast.success("Saved !", {
            position: "top-center"
        });
        navigate('/cards');
        // console.log(data);
        // getCard()

    }
    async function validateToken() {

        const url = `/api/validate`;

        const storedToken = localStorage.getItem('jwtToken');

        //     // Include the token in the headers for the request
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

        // console.log(response.status == 200)
        // return 

        // const res = response;
        console.log(response.status, "response.status")
        // return
        if (response.status != 200) {
            navigate("/login");
        }
        // console.log(data);
    }

    async function getCard() {

        const url = `/api/card/${id}`;

        const storedToken = localStorage.getItem('jwtToken');

        //     // Include the token in the headers for the request
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
            console.log("error")
            toast.error('Failed to load card. Please try again.');
        }

        const res = await response.json();
        setEmails(res.emails && res.emails.length ? res.emails : [res.email || '']);
        setMobiles(res.mobiles && res.mobiles.length ? res.mobiles : [res.mobile || '']);
        setFormData(prev => ({
            ...prev,
            ...res,
            primaryBackgroundColor: (res.primaryBackgroundColor !== undefined && res.primaryBackgroundColor !== null && res.primaryBackgroundColor !== "") ? res.primaryBackgroundColor : "#ffffff",
            secondaryBackgroundColor: (res.secondaryBackgroundColor !== undefined && res.secondaryBackgroundColor !== null && res.secondaryBackgroundColor !== "") ? res.secondaryBackgroundColor : "#f3f4f6",
            textColor: (res.textColor !== undefined && res.textColor !== null && res.textColor !== "") ? res.textColor : "#000000",
            titleColor: (res.titleColor !== undefined && res.titleColor !== null && res.titleColor !== "") ? res.titleColor : "#000000",
            featured_video: res.featured_video || '',
        }))
        setAboutYourself(res.about_yourself || '');
        setTags(res.tags_json || []);
        setCustomUrl(res.custom_url || '');
        setFeatured_video(res.featured_video || '');
        setConfig(res.config ? res.config : config)
        setFeaturedContent(res.featuredContent ? res.featuredContent : featuredContent)
    }




    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans flex flex-col lg:flex-row gap-8">
            <ToastContainer />
            <div className="w-full lg:w-1/2 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold mb-4 text-gray-900 tracking-tight">Create Digital Card</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Header Attachments */}
                <section className="mb-4 bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-900">Header Attachments</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                            <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="hidden" id="logo-upload" />
                            <label htmlFor="logo-upload" className="group cursor-pointer inline-flex h-10 items-center justify-center rounded-lg border border-green-200 bg-green-50 px-6 font-medium text-green-700 transition-all shadow hover:bg-green-100">
                                + Logo
                            </label>
                            {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                            <p className="text-xs text-gray-400">svg, jpeg, png, gif</p>
                            <div className="mt-2">
                                {formData.logo.includes("/images") ?
                                    <img src={"/api" + formData.logo} alt="Logo" className="h-16 rounded-lg object-contain bg-white border" /> :
                                    <img src={formData.logo} alt="Logo" className="h-16 rounded-lg object-contain bg-white border" />
                                }
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                            <input type="file" name="coverPhoto" accept="image/*" onChange={handleFileChange} className="hidden" id="cover-upload" />
                            <label htmlFor="cover-upload" className="group cursor-pointer inline-flex h-10 items-center justify-center rounded-lg border border-green-200 bg-green-50 px-6 font-medium text-green-700 transition-all shadow hover:bg-green-100">
                                + Cover Photo
                            </label>
                            {errors.coverPhoto && <p className="text-red-500 text-xs mt-1">{errors.coverPhoto}</p>}
                            <p className="text-xs text-gray-400">svg, jpeg, png, gif</p>
                            <p className="text-xs text-gray-400">960x640px, 3:2</p>
                            <img src={formData.coverPhoto.includes("/images") ? "/api" + formData.coverPhoto : formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mt-2 rounded-lg border" style={{ aspectRatio: '3/2' }} />
                        </div>
                    </div>
                </section>
                {/* Personal Info */}
                <section className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Card Customization</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                            <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} className="hidden" id="profile-upload" />
                            <label htmlFor="profile-upload" className="group cursor-pointer inline-flex h-10 items-center justify-center rounded-lg border border-green-200 bg-green-50 px-6 font-medium text-green-700 transition-all shadow hover:bg-green-100">
                                + Profile Photo
                            </label>
                            {errors.profilePhoto && <p className="text-red-500 text-xs mt-1">{errors.profilePhoto}</p>}
                            <p className="text-xs text-gray-400">jpeg, png, gif</p>
                            <p className="text-xs text-gray-400">320x320px, 1:1</p>
                            {formData.profilePhoto ? (
                                <img src={formData.profilePhoto.includes("/images") ? "/api" + formData.profilePhoto : formData.profilePhoto} alt="Profile" className="w-16 h-16 mt-2 rounded-full object-cover border-2 border-green-200 bg-white" style={{ aspectRatio: '1/1' }} />
                            ) : (
                                <img src={defaultAvatar} alt="Default" className="w-16 h-16 mt-2 rounded-full object-cover border-2 border-green-200 bg-white" style={{ aspectRatio: '1/1' }} />
                            )}
                        </div>
                        {/* Theme Colors */}
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                            <div>
                                <label htmlFor="primaryBackgroundColor" className="block text-gray-700 text-sm font-bold mb-1">Primary Background</label>
                                <input type="color" id="primaryBackgroundColor" name="primaryBackgroundColor" value={formData.primaryBackgroundColor} onChange={handleChange} className="h-12 w-full rounded-lg border border-gray-200 bg-white" />
                            </div>
                            <div>
                                <label htmlFor="secondaryBackgroundColor" className="block text-gray-700 text-sm font-bold mb-1">Secondary Background</label>
                                <input type="color" id="secondaryBackgroundColor" name="secondaryBackgroundColor" value={formData.secondaryBackgroundColor} onChange={handleChange} className="h-12 w-full rounded-lg border border-gray-200 bg-white" />
                            </div>
                            <div>
                                <label htmlFor="titleColor" className="block text-gray-700 text-sm font-bold mb-1">Primary Text</label>
                                <input type="color" id="titleColor" name="titleColor" value={formData.titleColor} onChange={handleChange} className="h-12 w-full rounded-lg border border-gray-200 bg-white" />
                            </div>
                            <div>
                                <label htmlFor="textColor" className="block text-gray-700 text-sm font-bold mb-1">Secondary Text</label>
                                <input type="color" id="textColor" name="textColor" value={formData.textColor} onChange={handleChange} className="h-12 w-full rounded-lg border border-gray-200 bg-white" />
                            </div>
                        </div>
                    </div>
                </section>
                    {/* Card Title */}
                    <section className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Card Title (for reference)</h2>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" />
                    </section>
                    {/* Contact Info */}
                    <section className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">Job Title</label>
                                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1 font-medium">Business Name</label>
                                <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-1 font-medium">Mobiles</label>
                                {mobiles.map((mobile, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-2">
                                        <PhoneInput
                                            country={'in'}
                                            value={mobile}
                                            onChange={val => handleMobileChange(idx, '+' + val)}
                                            inputProps={{
                                                name: `mobile-${idx}`,
                                                required: idx === 0,
                                                className: 'w-full p-3 rounded-lg bg-white text-black border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none',
                                            }}
                                            containerClass="w-full"
                                            inputClass="w-full bg-white text-black p-3 rounded-lg"
                                            buttonClass="bg-white text-black border-r border-gray-200"
                                            dropdownStyle={{ zIndex: 1000 }}
                                        />
                                        {mobiles.length > 1 && (
                                            <button type="button" onClick={() => removeMobile(idx)} className="bg-red-500 text-white rounded-lg px-2 py-1 ml-2">-</button>
                                        )}
                                        {idx === mobiles.length - 1 && (
                                            <button type="button" onClick={addMobile} className="bg-green-500 text-white rounded-lg px-2 py-1 ml-2">+</button>
                                        )}
                                    </div>
                                ))}
                                <div className="text-xs text-gray-400 mt-1">Enter your phone number with country code.</div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-1 font-medium">Emails</label>
                                {emails.map((email, idx) => (
                                    <div key={idx} className="flex items-center gap-2 mb-2">
                                        <input type="email" name={`email-${idx}`} value={email} onChange={e => handleEmailChange(idx, e.target.value)} className="w-full p-3 rounded-lg text-gray-900 bg-white border border-gray-200 focus:ring-2 focus:ring-green-200 outline-none" required={idx === 0} />
                                        {emails.length > 1 && (
                                            <button type="button" onClick={() => removeEmail(idx)} className="bg-red-500 text-white rounded-lg px-2 py-1 ml-2">-</button>
                                        )}
                                        {idx === emails.length - 1 && (
                                            <button type="button" onClick={addEmail} className="bg-green-500 text-white rounded-lg px-2 py-1 ml-2">+</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* About Me */}
                    <section className="mb-4 bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <label className="font-semibold text-gray-800">About Me <span className="text-xs text-gray-400">({aboutWordCount}/150 words)</span></label>
                        <textarea
                            className="border rounded-lg p-2 w-full min-h-[80px]"
                            value={aboutYourself}
                            onChange={handleAboutChange}
                            maxLength={1200} // ~150 words
                            placeholder="Describe yourself (max 150 words)"
                        />
                    </section>
                    {/* Tags */}
                    <section className="mb-4 bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <label className="font-semibold text-gray-800">Tags <span className="text-xs text-gray-400">(comma separated, for SEO only)</span></label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-lg flex items-center gap-1">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(idx)} className="ml-1 text-red-500">&times;</button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyDown={handleTagInputKeyDown}
                                className="border rounded px-2 py-1 min-w-[80px]"
                                placeholder="Add tag"
                            />
                        </div>
                    </section>
                    {/* Primary Connections */}
                    <section className="p-6 bg-white rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Primary Connections</h2>
                        {formData.primaryActions.map((socialLink, index) => (
                            <div key={index} className="flex items-center gap-2 my-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                <div style={{ backgroundColor: socialLink.color }} className="w-12 h-10 rounded-lg flex items-center justify-center">
                                    <IconHandler platform={socialLink.platform} />
                                </div>
                                <input type="text" name="url" placeholder={socialLink.placeholder} value={socialLink.url} onChange={(e) => handleSocialLinkChange(e, index, 'primary')} className="w-full p-2 bg-white text-black rounded-lg border border-gray-200" />
                                <button type="button" onClick={() => removePlatform(index, 'primary')} className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center group transition-colors hover:bg-red-700">
                                    <FaTrash className="text-white group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all" />
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {actions.map((action, index) => (
                                <button type="button" key={index} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: action.color }} onClick={() => handleAddSocialLink({ ...action, type: 'primary' })}>
                                    <IconHandler platform={action.platform} />
                                </button>
                            ))}
                        </div>
                    </section>
                    {/* Secondary Connections */}
                    <section className="p-6 bg-white rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Secondary Connections</h2>
                        {formData.secondaryActions.map((socialLink, index) => (
                            <div key={index} className="flex items-center gap-2 my-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                <div style={{ backgroundColor: socialLink.color }} className="w-12 h-10 rounded-lg flex items-center justify-center">
                                    <IconHandler platform={socialLink.platform} />
                                </div>
                                <input type="text" name="url" placeholder={socialLink.placeholder} value={socialLink.url} onChange={(e) => handleSocialLinkChange(e, index, 'secondary')} className="w-full p-2 bg-white text-black rounded-lg border border-gray-200" />
                                <button type="button" onClick={() => removePlatform(index, 'secondary')} className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center group transition-colors hover:bg-red-700">
                                    <FaTrash className="text-white group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all" />
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {additionalActions.map((action, index) => (
                                <button type="button" key={index} className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: action.color }} onClick={() => handleAddSocialLink({ ...action, type: 'secondary' })}>
                                    <IconHandler platform={action.platform} />
                                </button>
                            ))}
                        </div>
                    </section>
                    {/* Featured Content */}
                    <section className="p-6 bg-white rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-900">Featured Content</h2>
                        {featuredContent.map((item, index) => (
                            <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg flex flex-col gap-2 border border-gray-100">
                                <div className="flex justify-between items-center gap-2">
                                    <select value={item.type} onChange={(e) => handleFeaturedContentChange(index, 'type', e.target.value)} className="w-1/3 p-2 rounded-lg text-gray-900 bg-white border border-gray-200">
                                        <option value="">Select type</option>
                                        <option value="product">Product</option>
                                        <option value="text">Text</option>
                                        <option value="embed">Embed</option>
                                    </select>
                                    <button type="button" onClick={() => handleRemoveFeaturedContent(index)} className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center group transition-colors hover:bg-red-700">
                                        <FaTrash className="text-white group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all" />
                                    </button>
                                </div>
                                {item.type === 'media' && (
                                    <div>
                                        <input type="file" accept="video/*" onChange={(e) => handleVideoChange(e, index)} className="hidden" id={`media-upload-${index}`} />
                                        <label htmlFor={`media-upload-${index}`} className="group cursor-pointer inline-flex h-10 items-center justify-center rounded-lg border border-green-200 bg-green-50 px-6 font-medium text-green-700 transition-all shadow hover:bg-green-100">
                                            + Add Video
                                        </label>
                                    </div>
                                )}
                                {item.type === 'product' && (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <input type="file" accept="image/*" onChange={(e) => handleProductImageChange(e, index)} className="hidden" id={`product-image-upload-${index}`} />
                                            <label htmlFor={`product-image-upload-${index}`} className={`w-10 h-10 group cursor-pointer inline-flex items-center justify-center rounded-lg border bg-green-50 text-green-700 transition-all ${item.image ? 'bg-cover bg-center' : ''}`} style={item.image ? { backgroundImage: `url(/api${item.image})` } : {}}>
                                                {!item.image && <FaImage />}
                                            </label>
                                            <input type="text" placeholder="Product title" value={item.title || ''} onChange={(e) => handleFeaturedContentChange(index, 'title', e.target.value)} className="w-full p-2 rounded-lg text-gray-900 bg-white border border-gray-200" />
                                        </div>
                                        <input type="text" placeholder="Product description" value={item.description || ''} onChange={(e) => handleFeaturedContentChange(index, 'description', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200" />
                                        <input type="text" placeholder="Product price" value={item.price || ''} onChange={(e) => handleFeaturedContentChange(index, 'price', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200" />
                                        <input type="text" placeholder="Button text" value={item.buttonText || ''} onChange={(e) => handleFeaturedContentChange(index, 'buttonText', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200" />
                                        <input type="text" placeholder="Button Redirect" value={item.link || ''} onChange={(e) => handleFeaturedContentChange(index, 'link', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200" />
                                    </div>
                                )}
                                {item.type === 'text' && (
                                    <textarea placeholder="Text content" value={item.content} onChange={(e) => handleFeaturedContentChange(index, 'content', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200 w-full" />
                                )}
                                {item.type === 'embed' && (
                                    <input type="text" placeholder="Embed link" value={item.content} onChange={(e) => handleFeaturedContentChange(index, 'content', e.target.value)} className="p-2 rounded-lg text-gray-900 bg-white border border-gray-200 w-full" />
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddFeaturedContent} className="group inline-flex h-10 items-center justify-center rounded-lg border border-green-200 bg-green-50 px-6 font-medium text-green-700 transition-all shadow hover:bg-green-100 mt-2">
                            Add Featured Content
                        </button>
                    </section>
                    {/* Featured Video */}
                    <section className="mb-4 bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <label className="font-semibold text-gray-800">Featured Video (YouTube or Vimeo link)</label>
                        <input
                            type="text"
                            value={featured_video}
                            onChange={handleFeaturedVideoChange}
                            className="border rounded px-2 py-1"
                            placeholder="https://youtube.com/... or https://vimeo.com/..."
                        />
                        {featured_video && !(YOUTUBE_REGEX.test(featured_video) || VIMEO_REGEX.test(featured_video)) && (
                            <div className="text-xs text-red-500">Please enter a valid YouTube or Vimeo link.</div>
                        )}
                    </section>
                    
                
                
                    {/* Custom URL */}
                    <section className="mb-4 bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col gap-4">
                        <label className="font-semibold text-gray-800">Custom URL</label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">{BASE_URL}</span>
                            <input
                                type="text"
                                value={customUrl}
                                onChange={handleCustomUrlChange}
                                className="border rounded px-2 py-1 min-w-[120px]"
                                placeholder="your-custom-url"
                            />
                        </div>
                        {customUrl && (
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={`${window.location.origin}${BASE_URL}${customUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 underline font-mono"
                            >
                              {window.location.origin}{BASE_URL}{customUrl}
                            </a>
                            <button
                              type="button"
                              className="text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-1 ml-1"
                              onClick={async () => {
                                const url = `${window.location.origin}${BASE_URL}${customUrl}`;
                                if (!customUrl) {
                                  toast.error('No custom URL to copy.');
                                  return;
                                }
                                try {
                                  await navigator.clipboard.writeText(url);
                                  toast.success('Custom URL copied to clipboard!');
                                } catch (err) {
                                  toast.error('Failed to copy URL.');
                                }
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        )}
                        {customUrlError && <div className="text-xs text-red-500">{customUrlError}</div>}
                        <div className="text-xs text-gray-400 mt-1">Only the part after <span className="font-mono">{BASE_URL}</span> is editable. Once set, the custom URL cannot be changed.</div>
                    </section>
                    <div className="flex justify-end items-center mt-4">
                        <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-lg">
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
                
            {/* Live Preview */}
            <div className="w-full lg:w-1/2 max-w-md mx-auto p-4 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-4 text-center text-gray-800">LIVE PREVIEW</h2>
                <LiveCardPreview
                  formData={{
                    ...formData,
                    mobiles: (Array.isArray(mobiles) && mobiles.length > 0)
                      ? mobiles.map(mobile => {
                          // Format mobile as +91 9080723329
                          const phone = parsePhoneNumberFromString(mobile, 'IN');
                          return phone ? phone.formatInternational() : mobile;
                        })
                      : [],
                    emails,
                    featured_video: formData.featured_video,
                  }}
                  featuredContent={featuredContent}
                  IconHandler={IconHandler}
                />
            </div>
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


export default App;
