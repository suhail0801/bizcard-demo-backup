import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaGithub, FaWhatsapp, FaTrash, FaPhone, FaSms, FaGlobe, FaSignal, FaTelegram, FaSkype, FaViber, FaWeixin, FaImage } from 'react-icons/fa';
import { RiHomeLine, RiMessengerLine } from 'react-icons/ri'; // Additional icons from other packages
import { SiXmpp } from 'react-icons/si'; // XMPP icon
import { FaArtstation, FaPaypal, FaPatreon, FaDribbble, FaTiktok, FaPinterest, FaSnapchat, FaSoundcloud, FaSpotify, FaTumblr, FaTwitch, FaVimeo, FaYoutube } from 'react-icons/fa';
import { SiBuymeacoffee, SiDiaspora, SiCodeberg, SiQuora, SiOpencollective, SiPeertube, SiVk, SiYelp, SiMedium, SiReddit, SiThreads } from 'react-icons/si';
import { useParams, useNavigate, useLocation } from "react-router-dom";

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

    useEffect(() => {
        console.log("ID HEREEEEEEEEEEEEEEEE", encryptedQuery)
        getCard()
        // validateToken()
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // document.getElementById('save-contact-btn').addEventListener('click', function () {

    // });

    async function addToContact() {
          // create a vcard file
          var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + `${formData.firstName + "  " + formData.lastName}` + "\nTEL;TYPE=work,voice:" + formData.mobile + "\nEMAIL:" + formData.email + "\nEND:VCARD";
          var blob = new Blob([vcard], { type: "text/vcard" });
          var url = URL.createObjectURL(blob);
          
          const newLink = document.createElement('a');
          newLink.download = formData.firstName + "  " + formData.lastName + ".vcf";
          newLink.textContent = formData.firstName + "  " + formData.lastName;
          newLink.href = url;
          
          newLink.click();
    }   

    const handleFeaturedContentChange = (index, key, value) => {
        // e.preventDefault();
        const newFeaturedContent = [...featuredContent];
        newFeaturedContent[index][key] = value;
        setFeaturedContent(newFeaturedContent);
    };

    async function getCard() {

        const url = `/api/publiccard?id=${(encryptedQuery)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.log("error")
        }

        const res = await response.json();
        // if (!res.auth) {
        //     location.href = " login"
        // }
        console.log(res);
        setFormData(res)
        setConfig(res.config ? res.config : config)
        setFeaturedContent(res.featuredContent ? res.featuredContent : featuredContent)
    }




    return (
        <div className="min-h-screen p-8 text-white flex justify-center" style={{ backgroundColor: formData.primaryBackgroundColor }}>
            <div className=" p-4 rounded-lg relative">
                <div className={`p-4 rounded-lg w-96 shadow-xl`}>
                    {formData.logo.includes("/images") ?
                        <img src={"/api" + formData.logo} alt="Cover" className="p-4 absolute w-24 object-cover mb-4 rounded-lg" /> :
                        <img src={formData.logo} alt="Cover" className="p-4 absolute w-24 object-cover mb-4 rounded-lg" />
                    }
                    {formData.profilePhoto.includes("/images") ?
                        <img src={"/api" + formData.profilePhoto} alt="Cover" className="w-28 shadow-2xl mt-2 z-50  absolute  right-1/2 translate-x-1/2 top-[130px]  mx-auto rounded-full mb-4" /> :
                        <img src={formData.profilePhoto} alt="Cover" className="w-28 shadow-2xl mt-2 z-50  absolute  right-1/2 translate-x-1/2 top-[130px]  mx-auto rounded-full mb-4" />
                    }
                    {/* {formData.logo && <img src={formData.logo} alt="Cover" className="p-4 absolute w-24 object-cover mb-4 rounded-lg" />}
                    {formData.profilePhoto && <img src={formData.profilePhoto} alt="Profile" className="w-28 shadow-2xl mt-2 z-50  absolute  right-1/2 translate-x-1/2 top-[160px]  mx-auto rounded-full mb-4" />} */}
                    <div className="text-center">
                        {formData.coverPhoto.includes("/images") ?
                            <img src={"/api" + formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" /> :
                            <img src={formData.coverPhoto} alt="Cover" className="w-full h-40 object-cover mb-4 rounded-lg" />
                        }
                        <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className="p-4 rounded-lg mb-4 shadow-xl">

                            <h3 style={{ color: formData.titleColor }} className="text-2xl font-bold mt-10">
                                {formData.firstName} {formData.lastName}
                            </h3>
                            {/* <p style={{ color: formData.textColor }} className="text-gray-400">({formData.pronouns})</p> */}
                            <p style={{ color: formData.textColor }} className="text-lg">{formData.jobTitle}</p>
                            <p style={{ color: formData.textColor }} className="text-gray-400">{formData.businessName}</p>
                            <button style={{ background: formData.primaryBackgroundColor }} className="p-2 rounded-lg mt-2" onClick={addToContact}>
                                Add To Contact
                            </button>
                        </div>
                        {formData.primaryActions.length ? (
                            <div style={{ backgroundColor: formData.secondaryBackgroundColor }} className='rounded-lg p-4 my-4 shadow-xl'>
                                <h2 style={{ color: formData.titleColor }} className="text-lg font-bold mb-4 text-center"> Primary Platforms</h2>
                                <div className="flex justify-center ">
                                    <div className="grid grid-cols-5 gap-4">
                                        {formData.primaryActions.map(({ platform, url, color }) => (
                                            <a key={platform} href={generateURL(platform, url)} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center text-white p-4 rounded-full" style={{ background: color }}>
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
                                            {item.image && <img src={item.image} alt="Product" className="w-full rounded-lg mb-2" />}
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
