import React from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { HiOutlineMail } from "react-icons/hi"
import { TbWorldWww } from "react-icons/tb"

import { FaTelegramPlane } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { CiLinkedin } from "react-icons/ci";
import { Mail, Phone, MessageSquareText, MapPin, } from "lucide-react"
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

import Download from '../../Project_Components/Download';

const imageStyle = {
    width: '80px',
    height: '80px',
  };

    const Card3 = ({ contactData, primaryActionData,secondaryActionData, selectedImage,selectedProfile,selectedLogo,secondaryActionBtns }) => {
      const { gender_pronouns, first_name, last_name, job_title, business_name,business_address} = contactData;
      
    
      return (
        <div className="right bg-gray-900 w-full lg:w-[45%] sm:w-[30%] flex justify-center " id='pagetodownload'>
        <div className='preview preview lg:fixed w-[392px] h-[244px] bg-white flex flex-col  rounded-2xl overflow-hidden  sm:w-[400px] md:w-[360px]'>
            <div className="">
          
    
    
    
         
          
          <div className=' text-2xl   flex justify-end    mt-7 mr-5'>{gender_pronouns+first_name + " " + last_name}</div>
          <div className=' text-end flex flex-col mt-2 mr-5 '>{job_title}</div>
          <div className=' text-end flex flex-col mt-2 mr-5 '>{business_name}</div>
          <div className={`flex justify-between items-end ml-8 ${selectedProfile ? 'bg-transparent' : 'bg-white'}`}>
  {/* Align image and hr at ends */}
  {selectedProfile && (
    <img src={selectedProfile} className="absolute h-14 w-20" />
  )}
</div> 
      <hr className='   ml-32 mt-2 border-2   border-green-300' />
          <div  className='  items-center flex     mr-1 Class '></div>
        
             
          
          <div className={`  ml-64 mt-2 ${selectedLogo ? '' : 'bg-white'}`}>
  {/* Align image */}
  {selectedLogo && (
    <img className='absolute h-20 w-20' alt="" src={selectedLogo} />
  )}
</div>
          
    
    <div className="flex justify-start mr-5 mt-4 ml-4" >
    
    <div className="grid grid-cols-4 gap-2">
    {primaryActionData.sms && (
  <div className="flex items-center my-1 icon-container "onClick={() => handlePrimaryActionClick('sms')}>
     <a href={`sms:${primaryActionData.sms}`}target='blank'  className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full md:ml-5">
      <MessageSquareText className="h-5 w-8 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.mobile && (
  <div className="flex items-center my-1 icon-container"onClick={() => handlePrimaryActionClick('mobile')}>
   <a href={`tel${primaryActionData.mobile}`}target='blank'  className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <Phone className="h-4 w-9 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.email && (
  <div className="flex items-center my-1 icon-container"onClick={() => handlePrimaryActionClick('email')}>
    <a href={`mailto:${primaryActionData.email}`}target='blank'  className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <HiOutlineMail className="h-5 w-8 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.location && (
  <div className="flex items-center my-2 icon-container"onClick={() => handlePrimaryActionClick('locatin')}>
    <a href={primaryActionData.location} target='blank'  className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <MapPin className="h-5 w-8 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.website && (
  <div className="flex items-center my-2 icon-container"onClick={() => handlePrimaryActionClick('website')}>
    <a href={primaryActionData.website} target='blank'  className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <TbWorldWww className="h-5 w-8 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.telegram && (
  <div className="flex items-center my-2 icon-container"onClick={() => handlePrimaryActionClick('telegram')}>
   <a href={primaryActionData.telegram} target='blank' className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <FaTelegramPlane className="h-4 w-8 text-white icon" />
    </a>
  
  </div>
)}

{primaryActionData.whatsapp && (
  <div className="flex items-center my-2 icon-container"onClick={() => handlePrimaryActionClick('whatsapp')}>
    <a href={primaryActionData.whatsapp} target='blank' className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <FaWhatsapp className="h-4 w-4 text-white icon" />
    </a>
    
  </div>
)}

{primaryActionData.calendar && (
  <div className="flex items-center my-2 icon-container"onClick={() => handlePrimaryActionClick('calender')}>
    <a href='' className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
      <BsFillCalendarDateFill className="h-4 w-4 text-white icon" />
    </a>
    
  </div> 
  )}
   {secondaryActionData.facebook && (
    <div className="flex items-center my-1 icon-container">
      <a href={secondaryActionData.facebook} target='blank' className="h-7 w-7 bg-sky-600 flex justify-center items-center rounded-full ml-5">
        <FaFacebook className="h-4 w-4 text-white icon" />
      </a>
      {console.log(secondaryActionData.facebook)}
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.facebook}</p> */}
    </div>
  )}

  {secondaryActionData.youtube && (
    <div className="flex items-center my-1 icon-container"onClick={() => handlePrimaryActionClick('')}>
      <a href={secondaryActionData.youtube}target='blank' className="h-7 w-7 bg-red-700 flex justify-center items-center rounded-full ml-5">
        <FaYoutube className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.youtube}</p> */}
    </div>
  )}



{secondaryActionData.instagram && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.instagram}target='blank'className="h-7 w-7 bg-blue-600 flex justify-center items-center rounded-full ml-5">
        <FaInstagram className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.instagram}</p> */}
    </div>
  )}

{secondaryActionData.github && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.github}target='blank' className="h-7 w-7 bg-black flex justify-center items-center rounded-full ml-5">
        <FaGithub className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.github}</p> */}
    </div>
  )}

{secondaryActionData.snapchat && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.snapchat}target='blank' className="h-7 w-7 bg-yellow-400 flex justify-center items-center rounded-full ml-5">
        <FaSnapchat className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.snapchat}</p> */}
    </div>
  )}

{secondaryActionData.twitter && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.twitter}target='blank' className="h-7 w-7 bg-sky-400 flex justify-center items-center rounded-full ml-5">
        <FaTwitter className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.twitter}</p> */}
    </div>
  )}

{secondaryActionData.linkdin && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.linkdin}target='blank' className="h-7 w-7 bg-sky-600 flex justify-center items-center rounded-full ml-5">
        <FaLinkedin className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.linkdin}</p> */}
    </div>
  )}
  {secondaryActionData.spotify && (
    <div className="flex items-center my-1 icon-container">
      <a href= {secondaryActionData.spotify}target='blank' className="h-7 w-7 bg-green-600 flex justify-center items-center rounded-full ml-5">
        <FaSpotify className="h-4 w-4 text-white icon" />
      </a>
      {/* <p className='text-center p-2 opacity-80 font-thin'>{secondaryActionData.spotify}</p> */}
    </div>
  )}</div></div></div>

  </div></div>
    );
};

export default Card3;