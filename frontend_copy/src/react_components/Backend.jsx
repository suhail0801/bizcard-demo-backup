import React, { useEffect } from 'react';
import { useState } from 'react';
import { Mail, Phone, MessageSquareText, MapPin, } from "lucide-react"
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Textarea } from "../components/textArea"
import { FaPhoneAlt } from "react-icons/fa"
import { BiSolidMessageDetail } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { TbWorldWww } from "react-icons/tb"
import { FaLocationArrow } from "react-icons/fa"
import { FaTelegramPlane } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaSnapchat,
  FaTwitter,
  FaLinkedin,
  FaSpotify
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card"
import { CiFileOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { PiTextTLight } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { BsUsbC } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import UserInput from './Project_Components/UserInput';
import SecondaryActions from './Project_Components/SecondaryActions'
import FeaturedContent from './Project_Components/FeaturedContent'
import PrimaryActions from './Project_Components/PrimaryActions';
// import LivePreview from './Project_Components/LivePreview';
import Card2 from './Card_Template/card1/Card2';
import Card1 from './Card_Template/card1/Card1';
import Card2Back from './Card_Template/card2/Card2Back';
import { useParams } from 'react-router-dom';

import Card3 from './Card_Template/card1/Card3';
import axios from "axios"
import Navbar from './Project_Components/Navbar'

const Backend = () => {
  const { templateId } = useParams();
  console.log(useParams(), templateId, 'params')
  const [userData, setUserData] = useState([])
  const [headers, setHeaders] = useState({})
  const [templateData, setTemplateData] = useState({})
  const [fileData, setFileData] = useState({})
  //   const pushData=(data)=>{
  //     axios.post("http://localhost:3001/card_data", data).then((response) => {
  //         console.log("data added");
  //         console.log(data);
  //         setUserData(response.data)
  //     })
  // }
  // console.log(localStorage.getItem("card_templates"));
  const fillCardVariables = async (cardPreview, cardVariables) => {
    console.log(cardPreview, 'card preview')
    cardPreview = cardPreview.toString()
    cardVariables = cardVariables || {
      "role": "Designer",
      "email": "email@yourdomain.com",
      "github_link": "https://github.com/",
      "mobile": "000-123-456-7890",
      "spotify_link": "https://open.spotify.com/user/",
      "twitter_link": "https://twitter.com/",
      "website": "https://www.visitdesk.com",
      "youtube_link": "https://www.youtube.com/c/",
      "facebook_link": "https://www.facebook.com/",
      "linkedin_link": "https://www.linkedin.com/in/",
      "location": "Your Location Here.",
      "snapchat_link": "https://www.snapchat.com/",
      "instagram_link": "https://www.instagram.com/",
      "last_name": "Doe",
      "first_name": "John",
      "business_name": "VisitDesk",
      "business_description": "Reception Management System",
      "gender_pronouns": "Mr.",
      "profile_pic": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
      "logo": "https://shorturl.at/jNY48"
    }
  
    for (const key in cardVariables) {
        const value = cardVariables[key];
        // if(cardPreview.includes(`{{${key}}}`)){
          cardPreview = cardPreview.replace(`{{${key}}}`, value)
          console.log(`{{${key}}}`, 'key', value, 'value')
        // }
    }
  
    return cardPreview
  } 

  useEffect(() => {
    const templateCard = localStorage.getItem(`template_${templateId}`)
    // console.log(templateCard, 'template card')
    const getMyData = async () => {
      const res = await axios.get("/api/template/"+templateId)
      console.log('got data')
      res.data.oldHtmlPreview = res.data.htmlPreview
      res.data.htmlPreview = await fillCardVariables(res.data.htmlPreview, null)
      console.log(res.data, 'res data')
      setTemplateData(res.data)
      localStorage.setItem(`template_${templateId}`, JSON.stringify(res.data))
    }
    // if(templateCard){
    //   setTemplateData(JSON.parse(templateCard))
    //   console.log(JSON.parse(templateCard), 'JSON.parse(templateCard)')

    // } else{
      


      // console.log(response.data, 'res')
      // .then((response) => {
      //   console.log("got data");
      //   // console.log(response, data);
      //   setTemplateData(response.data)
      // })
    // }

    const checkTokenValidity = async () => {
      const storedToken = localStorage.getItem('jwtToken');
      console.log(storedToken, 'stored token')
      if (!storedToken) {
          // If token is missing, log out the user
          navigate('/');
          return;
      }

      // Include the token in the headers for the request
      const headers = {
          Authorization: `Bearer ${storedToken}`
      };
      setHeaders(headers)

      try {
          // Check token validity by making a request to a secure endpoint
          await axios.get("/api/login", { headers });
          getMyData()
          // If the request is successful, proceed to fetch templates
          // const response = await axios.get("http://localhost:3001/template");
          // const response = await axios.get("/api/template");
          // setTemplateData(response.data);
          // localStorage.setItem("card_templates",JSON.stringify(response.data))
          // console.log(templateData);
      } catch (error) {
          console.error('Error checking token validity:', error);
          // If there is an error (e.g., token is invalid), log out the user
          navigate('/');
      }
    };

    // Call the token validity check function
    checkTokenValidity();
    
  }, []);

  console.log("ttt :"+templateData);
  // useEffect(() => {
  //   const fetchHtmlFile = async () => {
  //     try {
  //       const response = await fetch('./html_card_template/card1/card1.html'); // Replace with the actual path to your HTML file
  //       const html = await response.text();
  //       setHtmlContent(html);
  //     } catch (error) {
  //       console.error('Error fetching HTML file:', error);
  //     }
  //   };

  //   fetchHtmlFile();
  // }, []);



  // const downloadTemplate = (data) => {
  //   // Assuming data is in JSON format, you can convert it to a downloadable file
  //   const jsonContent = JSON.stringify(data);
  //   const blob = new Blob([jsonContent], { type: "application/json" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "template.json"; // Specify the file name here
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  // const downloadTemplate = (data) => {
  //   const pdf = new jsPDF();

  //   // Example content for PDF
  //   pdf.text(JSON.stringify(data), 10, 10);

  //   // Save the PDF
  //   pdf.save('template.pdf');
  // };

  // const downloadTemplate = (data) => {
  //   const pdf = new jsPDF();
  
  //   // Define card dimensions and styling
  //   const cardWidth = 100;
  //   const cardHeight = 150;
  //   const cardMargin = 10;
  //   const cardBackgroundColor = "#ffffff";
  //   const cardBorderColor = "#000000";
  
  //   // Loop through the data and create a card for each entry
  //   data.forEach((entry, index) => {
  //     // Calculate position for the card
  //     const x = index % 2 === 0 ? 10 : cardWidth + cardMargin + 10;
  //     const y = Math.floor(index / 2) * (cardHeight + cardMargin) + 10;
  
  //     // Draw the card background
  //     pdf.setFillColor(cardBackgroundColor);
  //     pdf.setDrawColor(cardBorderColor);
  //     pdf.roundedRect(x, y, cardWidth, cardHeight, 3, 3, "F");
  
  //     // Add content to the card
  //     pdf.setTextColor("#000000");
  //     pdf.setFontSize(10);
  //     pdf.text(`Name: ${entry.name}`, x + 5, y + 10);
  //     pdf.text(`Email: ${entry.email}`, x + 5, y + 20);
  //     // Add more content as needed
  
  //     // Add borders to the card
  //     pdf.setLineWidth(0.5);
  //     pdf.roundedRect(x, y, cardWidth, cardHeight, 3, 3, "D");
  //   });
  
  //   // Save the PDF
  //   pdf.save('template.pdf');
  // };

  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    gender_pronouns: "",
    role: "",
    business_name: "",
    business_description: "",
    profile_pic: "",
    logo: "",
  })
  const downloadTemplate = (contactData, primaryActionData, secondaryActionData, selectedImage, selectedProfile, selectedLogo, secondaryActionBtns) => {
    // Capture the entire page
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Get data URL of the captured image
      
      const pdf = new jsPDF();
      
      // Add the captured image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 120);
      
      // Add icons and data to the PDF
      pdf.text(`Name: ${contactData.first_name} ${contactData.last_name}`, 20, 20);
      // Add more data as needed
      
      // Save the PDF
      pdf.save('template.pdf');
    });
  };
  const pushData = async () => {
    // console.log(contactData, "contactData")
    // console.log(primaryActionData, "primaryActionData")
    // console.log(secondaryActionData, "secondaryActionData")
    const fd = new FormData()
    for (const fileObj in fileData) {
      if (contactData[fileObj]) {
        fileData[fileObj];
        fd.append(fileObj, fileData[fileObj]);
      }
    }
    
    const finalHtmlData = { ...contactData, ...primaryActionData, ...secondaryActionData }
    templateData.htmlData = finalHtmlData
    templateData.htmlPreview = templateData.oldHtmlPreview
    fd.append('userTemplateData', JSON.stringify(templateData))
    // const updatedPreview = await fillCardVariables(templateData.htmlPreview, finalHtmlData)
    // templateData.htmlPreview = updatedPreview
    
    console.log(finalHtmlData,  'finalData card')

    axios.post("/api/usercards", fd, {headers: {...headers,  'Content-Type': 'multipart/form-data'}})
      .then((response) => {
        // Check if the response contains data
        if (response.data) {
          console.log("Data added successfully");
          console.log(response.data);
          // Assuming setUserData is a state update function
          // setUserData(response.data);
          // downloadTemplate(response.data);
        } else {
          console.warn("Received an empty response");
        }
      })
      .catch((error) => {
        // Handle errors during the request
        console.error("Error adding data:", error);
        // You can add further error handling or user feedback here
      });
  };

  
  const [primaryActionData, setPrimaryActionData] = useState({
    mobile: "",
    email: "",
    location: "",
    website: "",
    telegram: "",
  })

  const [secondaryActionData, setSecondaryActionData] = useState({
    facebook_link: "",
    youtube_link: "",
    instagram_link: "",
    github_link: "",
    snapchat_link: "",
    twitter_link: "",
    linkedin_link: "",
    spotify_link: "",
  })

  const { first_name, last_name, gender_pronouns, role, business_name, business_address, business_description } = contactData
  const { mobile, sms, email, location, website, telegram, whatsapp, calendar } = primaryActionData
  const { facebook, youtube, instagram, github, snapchat, twitter, linkdin, spotify } = secondaryActionData


  // const handleInput = (e) => {
  //   setContactData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  //   setPrimaryActionData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  //   setSecondaryActionData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // }
  const handleInput = (e) => {
    const { name, value } = e.target;
    // const cardField = document.getElementById(name);
    // cardField.innerHTML = value;
    // console.log("name:"+name);
    // console.log("value:"+value);
    if (name in contactData) {
      setContactData((prev) => ({ ...prev, [name]: value }));
      const cardField = document.getElementById(name);
      cardField.innerHTML = value;
    } else if (name in primaryActionData) {
      setPrimaryActionData((prev) => ({ ...prev, [name]: value }));
      const cardField = document.getElementById(name);
      cardField.innerHTML = value;
    } else if (name in secondaryActionData) {
      setSecondaryActionData((prev) => ({ ...prev, [name]: value }));
      var icon = document.getElementById(name);
      icon.style.display = "block"
      var hrefValue = icon.getAttribute("href");
      var newHrefValue = value;
      icon.setAttribute("href", newHrefValue);
    }
  };
  

  let link = ""


  const [primaryActionBtns, setPrimaryActionBtns] = useState(
    [
      { id: 1, isVisible: true, name: "mobile", icon: Phone },
      { id: 2, isVisible: true, name: "email", icon: Mail },
      { id: 3, isVisible: true, name: "location", icon: MapPin },
      { id: 4, isVisible: true, name: "website", icon: TbWorldWww },
    ]
  )
  // const [primaryActionBtns, setPrimaryActionBtns] = useState(
  //   [ 
  //     { id: 1, isVisible: true, name: "mobile", icon: Phone },
  //     { id: 2, isVisible: true, name: "sms", icon: MessageSquareText },
  //     { id: 3, isVisible: true, name: "email", icon: Mail },
  //     { id: 4, isVisible: true, name: "location", icon: MapPin },
  //     { id: 5, isVisible: true, name: "website", icon: TbWorldWww },
  //     { id: 6, isVisible: true, name: "telegram", icon: FaTelegramPlane },
  //     { id: 7, isVisible: true, name: "whatsapp", icon: FaWhatsapp },
  //     { id: 8, isVisible: true, name: "calendar", icon: BsFillCalendarDateFill }
  //   ]
  // )
  const [secondaryActionBtns, setSecondaryActionBtns] = useState(
    [
      { id: 1, isVisible: true, name: "facebook_link", icon: FaFacebook, icon_color: 'text-sky-600', color: "bg-sky-600", hover: "bg-sky-800" },
      { id: 2, isVisible: true, name: "youtube_link", icon: FaYoutube, icon_color: 'text-red-700', color: "bg-red-700", hover: "bg-red-600" },
      { id: 3, isVisible: true, name: "instagram_link", icon: FaInstagram, icon_color: 'text-purple-700', color: "bg-gradient-to-r from-purple-700 to-pink-500", hover: "to-pink-400 justify-start bg-gradient-to-r from-purple-700 to-pink-500" },
      { id: 4, isVisible: true, name: "github_link", icon: FaGithub, icon_color: 'text-stone-600', color: "bg-stone-600", hover: "bg-stone-500" },
      { id: 5, isVisible: true, name: "snapchat_link", icon: FaSnapchat, icon_color: 'text-yellow-500', color: "bg-yellow-500", hover: "bg-yellow-400" },
      { id: 6, isVisible: true, name: "twitter_link", icon: FaTwitter, icon_color: 'text-sky-300', color: "bg-sky-300", hover: "bg-sky-200" },
      { id: 7, isVisible: true, name: "linkedin_link", icon: FaLinkedin, icon_color: 'text-sky-900', color: "bg-sky-900", hover: "bg-blue-400" },
      { id: 8, isVisible: true, name: "spotify_link", icon: FaSpotify, icon_color: 'text-green-500', color: "bg-green-500", hover: "bg-green-400" }
    ]
  )

  const cardsData = [
    {
      card1: ["role", "business_name", "business_description", "mobile", "location", "email", "website", "facebook", "youtube", "instagram", "github", "snapchat", "twitter", "linkedin", "spotify", true],
      card2: ["role", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin", true],
      card3: ["role", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin", true],
      card4: ["role", "business_name", "business_description", "mobile", "location", "email", "website", "facebook", "youtube", "instagram", "github", "snapchat", "twitter", "linkedin", "spotify", false],

    }
  ];


  const handleButtonClick = (buttonId, isPrimary) => {
    if (isPrimary) {
      const updatedPrimaryButtons = primaryActionBtns.map((button) =>
        button.id === buttonId ? { ...button, isVisible: false } : button
      );
      setPrimaryActionBtns(updatedPrimaryButtons);
    }
    else {
      const updatedSecondaryButtons = secondaryActionBtns.map((button) =>
        button.id === buttonId ? { ...button, isVisible: false } : button
      );
      setSecondaryActionBtns(updatedSecondaryButtons);
    }
  };

  const getHoverColorBasedOnContrast = (baseColor) => {
    const contrast = getContrast(baseColor);
    return getHoverColor(baseColor, contrast);
  };

  const contactFields = [
    { label: "First name", name: "first_name", placeholder: "First name", type: "text" },
    { label: "Last name", name: "last_name", placeholder: "Last name", type: "text" },
    { label: "Gender pronouns", name: "gender_pronouns", placeholder: "Gender pronouns", type: "text" },
    { label: "Role", name: "role", placeholder: "Role", type: "text" },
    { label: "Business name", name: "business_name", placeholder: "Business name", type: "text" },
    { label: "Business address", name: "business_address", placeholder: "Type your Business address.", type: "textarea" },
    { label: "Business description", name: "business_description", placeholder: "Type your Business description.", type: "textarea" },
  ];

  // const [featuredContent, setFeaturedContent] = useState([
  //   {
  //     id: 1,
  //     sectionTitle: 'Section title',
  //     primaryActions: [
  //       { id: 1, icon: CiFileOn, label: 'Add media' },
  //       { id: 2, icon: BsUsbC, label: 'Embed media' },
  //       { id: 3, icon: CiStar, label: 'Add product' },
  //       { id: 4, icon: PiTextTLight, label: 'Add text' },
  //     ],
  //   },
  // ]);
  // const [featuredContent, setFeaturedContent] = useState([
  //   {
  //     id: 1,
  //     sectionTitle: 'Section title',
  //     primaryActions: [
  //       { id: 1, icon: CiFileOn, label: 'Add media', name: "media", component: <Input />, isVisible: false },
  //       { id: 2, icon: BsUsbC, label: 'Embed media', name: "embed_media", component: <Input />, isVisible: false },
  //       { id: 3, icon: CiStar, label: 'Add product', name: "product", component: <Input />, isVisible: false },
  //       { id: 4, icon: PiTextTLight, label: 'Add text', name: "text", component: <Input />, isVisible: false },
  //     ],
  //   },
  // ]);

  // const handleAddSection = () => {
  //   setFeaturedContent((prevContent) => [
  //     ...prevContent,
  //     {
  //       id: prevContent.length + 1,
  //       sectionTitle: 'New Section',
  //       primaryActions: [
  //         { id: 1, icon: CiFileOn, label: 'Add media' },
  //         { id: 2, icon: BsUsbC, label: 'Embed media' },
  //         { id: 3, icon: CiStar, label: 'Add product' },
  //         { id: 4, icon: PiTextTLight, label: 'Add text' },
  //       ],
  //     },
  //   ]);
  // };

  // const handleRemoveSection = (sectionId) => {
  //   setFeaturedContent((prevContent) =>
  //     prevContent.filter((section) => section.id !== sectionId)
  //   );
  // };

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handleProfileChange = (event) => {
    // Handle the file selection and update the state
    console.log("profile: "+event.target.name);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    setSelectedProfile(url);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        const dataURL = reader.result;
        const profilePicture = document.getElementById('profile_pic');
        profilePicture.src = dataURL;
        console.log("dataurl :"+dataURL);
      };
  };

  const handleLogoChange = (event) => {
    // Handle the file selection and update the state
    console.log("logo: "+event.target.name);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSelectedLogo(url);
  };

  const handleRemoveImage = () => {
    // Remove the selected image
    setSelectedImage(null);
    // Clear the file input value to allow selecting the same file again
    const fileInput = document.getElementById('picture');
    if (fileInput) {
      fileInput.value = '';
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      // Create a URL for the selected image file
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    else {
      setSelectedImage(null);
    }
  };
  const handlePrimaryActionClick = (action) => {
    const link = primaryActionData[action];
    if (link) {
      window.location.href = link;
    }
  };
  const handleSecondaryActionClick = (action) => {
    const link = secondaryActionDataActionData[action];
    if (link) {
      window.location.href = link;
    }
  }; 
  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete the JWT token from local storage
    localStorage.removeItem('jwtToken');

    navigate('/');

    // You may also want to redirect the user to the login page or perform other logout-related actions
    console.log('Logout button clicked');
  };


  const handleUploadChange = (event) => {
    // Handle the file selection and update the state
    console.log("Upload File Name: "+event.target.name);
    const file = event.target.files[0];
    setFileData((prev) => ({ ...prev, [event.target.name]: file }));
    console.log(fileData, 'fileData')
    const url = URL.createObjectURL(file);
    // console.log(url);
    // setSelectedProfile(url);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        const dataURL = reader.result;
        const updloadEle = document.getElementById(event.target.name);
        setContactData((prev) => ({ ...prev, [event.target.name]: dataURL }));
      
        updloadEle.src = dataURL;
        console.log("dataurl :"+dataURL);
      };
  };



  // const card_details = [{ contactData }, { primaryActionData }, { secondaryActionData }];
  // const card_details = [{ contactData ,  primaryActionData ,  secondaryActionData }];
  // const user_card_details = { card_data: card_details }
  const card_details = {
    contactData,
    primaryActionData,
    secondaryActionData,
  };
  
  const user_card_details = { card_data: [card_details] };

  const getUserId = () =>{
    console.log("uid");
    // console.log("token: "+localStorage.getItem('jwtToken'));
        axios.get('/api/userid', {
            headers: {
            authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        .then(res => {
            console.log("user id got successfully");
            console.log(res.data.userId);
        });
        
  }

  console.log("token kk: "+localStorage.getItem('jwtToken'));




  return (
    // <div className='app flex w-[100%] max-w-screen-xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 space-x-4 md:space-x-8 lg:space-x-16 bg-gray-900'>
    // <div className='app flex w-[100%] px-48 space-x-16  bg-gray-900'>
    <div className=' bg-slate-900'>
      <Navbar
        Button={Button}
      />
      <div className='app flex w-[100%] px-20 space-x-16 h-full '>


        <div className="left w-[40%] flex flex-col  items-center">

          <UserInput
            Label={Label}
            Input={Input}
            Textarea={Textarea}
            handleInput={handleInput}
            contactFields={contactFields}
            handleUploadChange={handleUploadChange}
            // handleProfileChange={handleProfileChange}
            // handleLogoChange={handleLogoChange}
            card={templateData}
            />


          <PrimaryActions
            Button={Button}
            Input={Input}
            handleButtonClick={handleButtonClick}
            handleInput={handleInput}
            primaryActionBtns={primaryActionBtns}

          />


          <SecondaryActions
            Button={Button}
            Input={Input}
            handleButtonClick={handleButtonClick}
            handleInput={handleInput}
            secondaryActionBtns={secondaryActionBtns}
            card={templateData}
            inputData={secondaryActionData}
          />

        </div>

        <div className="right  bg-gray-900 w-[55%]  h-fit flex justify-center my-8 rounded-3xl fixed right-4">

          <div className=' space-y-10'>
           
            {templateData && <div  dangerouslySetInnerHTML={{ __html: templateData.htmlPreview  }} />}

            <div className='flex justify-center'>


              <Button
                className="h-10 w-40 bg-emerald-800 hover:bg-emerald-600 font-montserrat mr-3"
                onClick={() => pushData()}
              >
                Save
              </Button>
              <Button
                className="h-10 w-40 bg-emerald-800 hover:bg-emerald-600 font-montserrat"
                // onClick={() => pushData(user_card_details)}
              >
                Download
              </Button>
            </div>
            
            {/* <div className='flex justify-center'>
              <Button
                className="h-10 w-40 bg-emerald-800 hover:bg-emerald-600 font-montserrat "
                onClick={() => getUserId()}
              >
                user id
              </Button>
            </div> */}
            
          </div>

        </div>


      </div>
    </div>
  )
}

export default Backend;


