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
        mobile: '',
        email: '',
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
        expose: false
    });

    const [featuredContent, setFeaturedContent] = useState([]);
    const [config, setConfig] = useState({
        expose: false,
        enableAddToContact: false
    });

    const [errors, setErrors] = useState({});
    const [socialLinkInput, setSocialLinkInput] = useState({ platform: '', url: '' });
    const [phoneError, setPhoneError] = useState('');

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
        if (name === 'mobile') {
            let normalized = value;
            // Only normalize if not already in '+<code> <number>' format
            if (normalized.startsWith('+')) {
                // If already has a space after country code, do not re-normalize
                if (!/^\+\d{1,4} \d+/.test(normalized)) {
                    // Remove all spaces first
                    normalized = normalized.replace(/\s+/g, '');
                    const match = normalized.match(/^(\+\d{1,4})(\d+)/);
                    if (match) {
                        normalized = match[1] + ' ' + match[2];
                    }
                }
            }
            setFormData({ ...formData, [name]: normalized });
        } else {
            setFormData({ ...formData, [name]: value });
        }
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
            alert('Video size exceeds the limit of 5MB');
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
        const response = await fetch(url, {
            method: formData.id ? "PUT" : "POST",
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify({ ...formData, mobile, featuredContent }),
        });

        if (!response.ok) {
            console.log("error")
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
        }

        const res = await response.json();
        // Defensive: ensure color fields are always set for the form
        setFormData(prev => ({
            ...prev,
            ...res,
            primaryBackgroundColor: (res.primaryBackgroundColor !== undefined && res.primaryBackgroundColor !== null && res.primaryBackgroundColor !== "") ? res.primaryBackgroundColor : "#ffffff",
            secondaryBackgroundColor: (res.secondaryBackgroundColor !== undefined && res.secondaryBackgroundColor !== null && res.secondaryBackgroundColor !== "") ? res.secondaryBackgroundColor : "#f3f4f6",
            textColor: (res.textColor !== undefined && res.textColor !== null && res.textColor !== "") ? res.textColor : "#000000",
            titleColor: (res.titleColor !== undefined && res.titleColor !== null && res.titleColor !== "") ? res.titleColor : "#000000"
        }))
        setConfig(res.config ? res.config : config)
        setFeaturedContent(res.featuredContent ? res.featuredContent : featuredContent)
    }




    return (
        <div className="min-h-screen bg-gray-900 p-8 text-white flex">
            <ToastContainer />
            <div className="max-w-lg mx-auto w-1/2">
                <h2 className="text-3xl font-bold mb-4"> Details </h2>
                <div className="mb-8 bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Header attachments</h2>
                    <div className="mb-8 flex flex-row-reverse justify-between">
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="logo-upload"
                        />
                        <label
                            htmlFor="logo-upload"
                            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
                        >
                            + logo
                        </label>
                        {/* <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none">Click me</button> */}
                        <div>
                            {errors.logo && <p className="text-red-500 mt-2">{errors.logo}</p>}
                            <p className="mt-2 text-gray-400">suggested format: svg, jpeg, png or gif</p>
                            {formData.logo.includes("/images") ?
                                <img src={"/api" + formData.logo} alt="Cover" className="h-16 mt-2 rounded-lg" /> :
                                <img src={formData.logo} alt="Cover" className="h-16 mt-2 rounded-lg" />
                            }
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row-reverse justify-between">
                        <input
                            type="file"
                            name="coverPhoto"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="cover-upload"
                        />
                        <label
                            style={{ width: "40%" }}
                            htmlFor="cover-upload"
                            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
                        >
                            + Cover Photo
                        </label>
                        <div className='w-1/2'>
                            {errors.coverPhoto && <p className="text-red-500 mt-2">{errors.coverPhoto}</p>}
                            <p className="mt-2 text-gray-400">suggested format: svg, jpeg, png or gif</p>
                            <p className="mt-2 text-gray-400">Recommended cover photo size is 960 x 640 pixels, with an aspect ratio of 3:2</p>
                            <img src={formData.coverPhoto.includes("/images") ? "/api" + formData.coverPhoto : formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" style={{ aspectRatio: '3/2' }} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='bg-gray-800  p-4 rounded-lg'>
                        <h2 className="text-xl font-bold mb-4">Personal information</h2>
                        <div className="mb-4 flex flex-row-reverse justify-between">
                            <input
                                type="file"
                                name="profilePhoto"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="profile-upload"
                            />
                            <label
                                htmlFor="profile-upload"
                                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
                            >
                                + Profile Photo
                            </label>
                            <div className='w-1/2'>
                                {errors.profilePhoto && <p className="text-red-500 mt-2">{errors.profilePhoto}</p>}
                                <p className="mt-2 text-gray-400">suggested format: jpeg, png or gif</p>
                                <p className="mt-2 text-gray-400">Recommended profile photo size is 320 x 320 pixels, with an aspect ratio of 1:1</p>
                                {formData.profilePhoto ? (
                                    <img
                                        src={formData.profilePhoto.includes("/images") ? "/api" + formData.profilePhoto : formData.profilePhoto}
                                        alt="Profile"
                                        className="w-16 h-16 mt-2 rounded-full object-cover border-2 border-gray-700"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                ) : (
                                    <img
                                        src={defaultAvatar}
                                        alt="Default"
                                        className="w-16 h-16 mt-2 rounded-full object-cover border-2 border-gray-700"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='my-4 bg-gray-800  p-4 rounded-lg'>
                        <h2 className="text-xl font-bold mb-4"> Theme </h2>
                        <div className="mb-4">
                            <label for="color" className="block text-white text-sm font-bold mb-2">Select Primary Background Color</label>
                            <input
                                type="color"
                                id="color"
                                className="h-20 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white "
                                name="primaryBackgroundColor"
                                value={formData.primaryBackgroundColor}
                                onChange={handleChange}
                            // className="appearance-none bg-none border-0 cursor-pointer h-20 w-60 rounded-xl"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="color" className="block text-white text-sm font-bold mb-2">Select Secondary Background Color</label>
                            <input
                                type="color"
                                id="color"
                                className="h-20 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white "
                                name="secondaryBackgroundColor"
                                value={formData.secondaryBackgroundColor}
                                onChange={handleChange}
                            // className="appearance-none bg-none border-0 cursor-pointer h-20 w-60 rounded-xl"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="color" className="block text-white text-sm font-bold mb-2">Select Primary Text Color</label>
                            <input
                                type="color"
                                id="color"
                                className="h-20 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white "
                                name="titleColor"
                                value={formData.titleColor}
                                onChange={handleChange}
                            // className="appearance-none bg-none border-0 cursor-pointer h-20 w-60 rounded-xl"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="color" className="block text-white text-sm font-bold mb-2">Select Secondary Text Color</label>
                            <input
                                type="color"
                                id="color"
                                className="h-20 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white "
                                name="textColor"
                                value={formData.textColor}
                                onChange={handleChange}
                            // className="appearance-none bg-none border-0 cursor-pointer h-20 w-60 rounded-xl"
                            />
                        </div>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-8 bg-gray-800 p-4 rounded-lg'>
                            <h2 className="text-xl font-bold mb-4">Contact information</h2>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full p-3  rounded-lg text-gray-300 bg-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full text-gray-300 bg-black p-3  rounded-lg "
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2"> Mobile </label>
                                <PhoneInput
                                    country={'in'}
                                    value={formData.mobile}
                                    onChange={phone => {
                                        const value = '+' + phone;
                                        setFormData({ ...formData, mobile: value });
                                        if (!isValidPhoneNumber(value)) {
                                            setPhoneError('Please enter a valid phone number.');
                                        } else {
                                            setPhoneError('');
                                        }
                                    }}
                                    inputProps={{
                                        name: 'mobile',
                                        required: true,
                                        autoFocus: false,
                                        className: 'w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none',
                                    }}
                                    containerClass="w-full"
                                    inputClass="w-full bg-white text-black p-3 rounded-lg"
                                    buttonClass="bg-white text-black border-r border-gray-300"
                                    dropdownStyle={{ zIndex: 1000 }}
                                />
                                <div className="text-xs text-gray-500 mt-1">Enter your phone number with country code.</div>
                                {phoneError && <div className="text-xs text-red-500 mt-1">{phoneError}</div>}
                                <div className="mt-2 text-gray-400">{formatPhone(formData.mobile)}</div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2"> Email </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full text-gray-300 bg-black  p-3  rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">Job title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="w-full text-gray-300 bg-black p-3  rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">Business name</label>
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full text-gray-300 bg-black p-3  rounded-lg"
                                />
                            </div>
                        </div>
                        <div className='mt-8 bg-gray-800 p-4 rounded-lg'>
                            <h2 className="text-xl font-bold mb-4">Card Title(for reference, wont be shown to others)</h2>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2"> Title </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3  rounded-lg text-gray-300 bg-black"
                                />
                            </div>

                        </div>
                        <div className="mb-4 p-4 bg-gray-800 rounded-lg mt-8">
                            <h2 className="text-xl font-bold mb-4"> Primary Connections </h2>
                            {/* <h3 className="block text-gray-400 mb-2"></h3> */}
                            {formData.primaryActions.map((socialLink, index) => (
                                <div key={index} className="flex items-center space-x-2 my-4 p-2 rounded-lg">
                                    <div style={{ backgroundColor: socialLink.color }} className={` w-20 h-10 rounded-lg flex items-center justify-center cursor-pointer`}>
                                        <IconHandler platform={socialLink.platform} />
                                    </div>
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder={socialLink.placeholder}
                                        value={socialLink.url}
                                        onChange={(e) => handleSocialLinkChange(e, index, 'primary')}
                                        className="w-full p-2 bg-white text-black rounded"
                                    />
                                    <div onClick={() => removePlatform(index, 'primary')} className='w-20 h-10 bg-red-500 rounded-lg flex items-center justify-center cursor-pointer group transition-colors hover:bg-red-700'>
                                        <FaTrash className='group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all' />
                                    </div>
                                </div>
                            ))}
                            <div className="flex mt-2 flex-wrap">
                                {actions.map((action, index) => (
                                    <div
                                        key={index}
                                        className="m-3 w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                                        style={{ backgroundColor: action.color }}
                                        onClick={() => handleAddSocialLink({ ...action, type: 'primary' })}
                                    >
                                        <IconHandler platform={action.platform} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4 p-4 bg-gray-800 rounded-lg mt-8">
                            <h2 className="text-xl font-bold mb-4"> Secondary Connections </h2>
                            {/* <h3 className="block text-gray-400 mb-2"></h3> */}
                            {formData.secondaryActions.map((socialLink, index) => (
                                <div key={index} className="flex  items-center space-x-2 my-4">
                                    <div style={{ backgroundColor: socialLink.color }} className='w-20 h-10  rounded-lg flex items-center justify-center cursor-pointer'>
                                        <IconHandler platform={socialLink.platform} />
                                    </div>
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder={socialLink.placeholder}
                                        value={socialLink.url}
                                        onChange={(e) => handleSocialLinkChange(e, index, 'secondary')}
                                        className="w-full p-2 bg-white rounded text-black"
                                    />
                                    <div onClick={() => removePlatform(index, 'secondary')} className='w-20 h-10 bg-red-500 rounded-lg flex items-center justify-center cursor-pointer group transition-colors hover:bg-red-700'>
                                        <FaTrash className='group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all' />
                                    </div>
                                </div>
                            ))}
                            <div className="flex mt-2 flex-wrap">
                                {additionalActions.map((action, index) => (
                                    <div
                                        key={index}
                                        className="m-3 w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer"
                                        style={{ backgroundColor: action.color }}
                                        onClick={() => handleAddSocialLink({ ...action, type: "secondary" })}
                                    >
                                        <IconHandler platform={action.platform} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4 p-4 bg-gray-800 rounded-lg mt-8">
                            <h2 className="text-xl font-bold mb-4">Featured Content</h2>
                            {featuredContent.map((item, index) => (
                                <div key={index} className="mb-4  bg-gray-700 p-2 rounded-lg">
                                    <div className="flex justify-between my-5">
                                        <select
                                            value={item.type}
                                            onChange={(e) => handleFeaturedContentChange(index, 'type', e.target.value)}
                                            className="w-1/3 p-3  rounded-lg text-gray-300 bg-black"
                                        >
                                            <option value="">Select type</option>
                                            {/* <option value="media">Media</option> */}
                                            <option value="product">Product</option>
                                            <option value="text">Text</option>
                                            <option value="embed">Embed</option>
                                        </select>
                                        {/* <button
                                            onClick={() => handleRemoveFeaturedContent(index)}
                                            className="bg-red-500 text-white p-2 rounded"
                                        >
                                            Remove
                                        </button> */}
                                        <div onClick={() => handleRemoveFeaturedContent(index)} className='w-20 h-10 bg-red-500 rounded-lg flex items-center justify-center cursor-pointer group transition-colors hover:bg-red-700'>
                                            <FaTrash className='group-hover:-translate-y-0.5 group-hover:-rotate-12 transition-all' />
                                        </div>
                                    </div>
                                    {item.type === 'media' && (
                                        <div className="mb-4">
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={(e) => handleVideoChange(e, index)}
                                                className="hidden"
                                                id={`media-upload-${index}`}
                                            />
                                            <label
                                                htmlFor={`media-upload-${index}`}
                                                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none"
                                            >
                                                + Add Video
                                            </label>
                                            {/* {item.content && <img src={item.content} alt="Media preview" className="mt-2 rounded-lg" />} */}
                                        </div>
                                    )}
                                    {item.type === 'product' && (
                                        <div className="mb-4">
                                            <div className="title flex">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleProductImageChange(e, index)}
                                                    className="hidden"
                                                    id={`product-image-upload-${index}`}
                                                />
                                                <label
                                                    htmlFor={`product-image-upload-${index}`}
                                                    className={`w-[10%] mx-2 group relative inline-flex items-center justify-center overflow-hidden rounded-lg border bg-transparent px-3 text-white transition-all ${item.image ? 'bg-cover bg-center' : ''}`}
                                                    style={item.image ? { backgroundImage: `url(/api${item.image})` } : {}}
                                                >
                                                    {!item.image && <FaImage />}
                                                </label>

                                                {/* {item.image && <img src={item.image} alt="Product preview" className="mt-2 rounded-lg" />} */}
                                                <input
                                                    type="text"
                                                    placeholder="Product title"
                                                    value={item.title || ''}
                                                    onChange={(e) => handleFeaturedContentChange(index, 'title', e.target.value)}
                                                    className="w-[90%] p-3  rounded-lg text-gray-300 bg-black"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Product description"
                                                value={item.description || ''}
                                                onChange={(e) => handleFeaturedContentChange(index, 'description', e.target.value)}
                                                className="p-3  rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Product price"
                                                value={item.price || ''}
                                                onChange={(e) => handleFeaturedContentChange(index, 'price', e.target.value)}
                                                className="p-3  rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Button text"
                                                value={item.buttonText || ''}
                                                onChange={(e) => handleFeaturedContentChange(index, 'buttonText', e.target.value)}
                                                className="p-3  rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Button Redirect"
                                                value={item.link || ''}
                                                onChange={(e) => handleFeaturedContentChange(index, 'link', e.target.value)}
                                                className="p-3  rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                            />
                                        </div>
                                    )}
                                    {item.type === 'text' && (
                                        <textarea
                                            placeholder="Text content"
                                            value={item.content}
                                            onChange={(e) => handleFeaturedContentChange(index, 'content', e.target.value)}
                                            className="p-3  rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                        ></textarea>
                                    )}
                                    {item.type === 'embed' && (
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                placeholder="Embed link"
                                                value={item.content}
                                                onChange={(e) => handleFeaturedContentChange(index, 'content', e.target.value)}
                                                className="p-3 rounded-lg text-gray-300 bg-black w-[100%] mt-3"
                                            />
                                        </div>
                                    )}

                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={handleAddFeaturedContent}
                                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium text-white transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none mt-2"
                            >
                                Add Featured Content
                            </button>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button type="submit" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-xl">
                                Save Card
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <div className="max-w-md mx-auto w-1/2 p-4 rounded-lg relative">
                <div
                    style={{ backgroundColor: formData.primaryBackgroundColor, top: '2rem', bottom: '2rem' }}
                    className={`p-4 rounded-lg sticky top-8 w-96 shadow-xl max-h-[80vh] overflow-y-auto`}
                >
                    <h2 className="text-lg font-bold mb-4 text-center">LIVE PREVIEW</h2>
                    {formData.logo.includes("/images") ?
                        <img src={"/api" + formData.logo} alt="Cover" className="p-4 absolute w-24 object-cover mb-4 rounded-lg" /> :
                        <img src={formData.logo} alt="Cover" className="p-4 absolute w-24 object-cover mb-4 rounded-lg" />
                    }
                    {formData.profilePhoto ? (
                        <img
                            src={formData.profilePhoto.includes("/images") ? "/api" + formData.profilePhoto : formData.profilePhoto}
                            alt="Profile"
                            className="w-28 h-28 shadow-2xl mt-2 z-50 absolute right-1/2 translate-x-1/2 top-[160px] mx-auto rounded-full mb-4 object-cover border-4 border-gray-700"
                            style={{ aspectRatio: '1/1' }}
                        />
                    ) : (
                        <img
                            src={defaultAvatar}
                            alt="Default"
                            className="w-28 h-28 shadow-2xl mt-2 z-50 absolute right-1/2 translate-x-1/2 top-[160px] mx-auto rounded-full mb-4 object-cover border-4 border-gray-700"
                            style={{ aspectRatio: '1/1' }}
                        />
                    )}
                    {formData.coverPhoto.includes("/images") ?
                        <img src={"/api" + formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" style={{ aspectRatio: '3/2' }} /> :
                        <img src={formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" />
                    }
                    <div className="text-center">
                        <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="p-4 rounded-lg mb-4 shadow-xl">

                            <h3 style={{ color: formData.titleColor }} className="text-2xl font-bold mt-10">
                                {formData.firstName} {formData.lastName}
                            </h3>
                            {/* <p style={{ color: formData.textColor }} className="text-gray-400">({formData.pronouns})</p> */}
                            <p style={{ color: formData.textColor }} className="text-lg">{formData.jobTitle}</p>
                            <p style={{ color: formData.textColor }} className="text-gray-400">{formData.businessName}</p>
                        </div>
                        {formData.primaryActions.length ? (
                            <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className='rounded-lg p-4 my-4 shadow-xl'>
                                <h2 style={{ color: formData.titleColor }} className="text-lg font-bold mb-4 text-center"> Primary Platforms</h2>
                                <div className="flex justify-center ">
                                    <div className="grid grid-cols-5 gap-4">
                                        {formData.primaryActions.map(({ platform, url, color }) => (
                                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center text-white p-4 rounded-full" style={{ background: color }}>
                                                <IconHandler platform={platform} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : ""}
                        {formData.secondaryActions.length ? (
                            <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className='rounded-lg p-4 my-4 shadow-xl'>
                                <h2 style={{ color: formData.titleColor }} className="text-lg font-bold mb-4 text-center"> Also Active in </h2>

                                <div className="flex justify-center items-center">
                                    <div className="grid grid-cols-5 gap-4">
                                        {formData.secondaryActions.map(({ platform, url, color }) => (
                                            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center text-white p-4 rounded-full" style={{ background: color }}>
                                                <IconHandler platform={platform} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : ""}
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
                                                <button style={{ background: formData.primaryBackgroundColor }} className="p-2 rounded-lg mt-2">
                                                    <a href={item.link} target='__blank' > {item.buttonText} </a>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {item.type === 'text' && <p style={{ backgroundColor: formData.secondaryBackgroundColor, color: formData.textColor }} className="text-white w-full p-4 rounded-lg shadow-xl ">{item.content}</p>}
                                    {item.type === 'embed' && item.content && (
                                        <div
                                            className="embed-wrapper w-full bg-gray-700  rounded-lg shadow-xl"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>



                    </div>
                </div>
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
