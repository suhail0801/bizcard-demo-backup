
// import React from 'react';
// import logo from './visitdesk_logo-removebg-preview.png';
// import qr from './qr.png';
// import profile from './profile.png';
// import { Mail, Phone, MessageSquareText, MapPin, Linkedin } from "lucide-react";
// import { TbWorldWww } from "react-icons/tb";
// import {
//     FaFacebook,
//     FaYoutube,
//     FaInstagram,
//     FaGithub,
//     FaSnapchat,
//     FaTwitter,
//     FaLinkedin,
//     FaSpotify
// } from "react-icons/fa";

// const Card1 = () => {
//     return (
//         <div className='flex flex-col w-full h-full bg-visit_desk_white'>
//             <div className="cardUpper flex flex-row h-[80%]">
//                 <div className="leftside w-[30%]">

//                     <div className="leftupper h-[60%]">
//                         <div className="userProfile h-[100%] flex justify-center items-center">
//                             <div className="rounded-full bg-white h-[60%] flex justify-center items-center">
//                                 <img src={profile} alt="" className='rounded-full' />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="leftlower h-[40%] text-slate-800 text-center">
//                         <div className="firstName"><h1 className='font-roboto_light text-4xl'>Mohammed</h1></div>
//                         <div className="lastName"><h1 className='font-roboto_light text-4xl'>Muzammil</h1></div>
//                         <div className="jobtitle"><h2 className='font-roboto_light text-2xl'>Intern</h2></div>
//                     </div>
//                     <hr className='border-2 border-white' />

//                 </div>
//                 <div className="rightside w-[70%]">
//                     <div className="header h-[45%] flex items-center justify-center pr-20">
//                         <div className="companyLogo flex justify-center items-center">
//                             <img src={logo} alt="not found" className='h-24 w-24' />
//                             <div className=''>
//                                 <h1 className='font-roboto_light text-5xl'>visitdesk</h1>
//                                 <h1 className='font-roboto_light font-thin text-xl'>Smart Reception Management System</h1>
//                             </div>
//                         </div>

//                     </div>
//                     <hr className='border-2 border-green-300' />
//                     <div className="body h-[55%] flex justify-center items-center p-4">
//                         <div className="b_left h-[100%] w-[80%] flex flex-col justify-center items-start space-y-4">

//                             <div className="phone flex space-x-4 justify-center items-center">
//                                 <Phone className='size-10 text-visit_desk_green' />
//                                 <h2 className='font-roboto_light font-extrabold text-xl text-black'>206-353-2846</h2>
//                             </div>
//                             <div className="location flex space-x-4 justify-center items-center">
//                                 <MapPin className='size-10 text-visit_desk_green' />
//                                 <h2 className='font-roboto_light text-xl text-black font-medium'>20098 Piney Point Rd, Callaway, MD 20620</h2>
//                             </div>
//                             <div className="mail flex space-x-4 justify-center items-center">
//                                 <Mail className='size-10 text-visit_desk_green' />
//                                 <h2 className='font-roboto_light text-xl text-black font-medium'>sandra.tucker@fineFX.com</h2>
//                             </div>
//                             <div className="website flex space-x-4 justify-center items-center">
//                                 <TbWorldWww className='size-10 text-visit_desk_green' />
//                                 <h2 className='font-roboto_light text-xl text-black font-medium'>https://visitdesk.io/</h2>
//                             </div>
//                         </div>
//                         <div className="r_left h-[100%] w-[20%] flex justify-center items-center">
//                             <img src={qr} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="cardLower h-[100%]">
//                 <hr className='border-2 border-black' />
//                 <hr className='border-2 border-green-300' />
//                 <div className='footer bg-visit_desk_green h-[19%]'>
//                     <div className="logos flex justify-evenly pt-9">
//                         <div className="location flex space-x-4">
//                             <FaLinkedin className='size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location flex space-x-4">
//                             <FaTwitter className='size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location flex space-x-4">
//                             <FaFacebook className='size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location flex space-x-4">
//                             <FaInstagram className='size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location flex space-x-4">
//                             <FaGithub className='size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location flex space-x-4">
//                             <FaSnapchat className='size-10 text-visit_desk_white' />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card1;

// working
// import React from 'react';
// import logo from './visitdesk_logo-removebg-preview.png';
// import qr from './qr.png';
// import profile from './profile.png';
// import { Mail, Phone, MessageSquareText, MapPin, Linkedin } from 'lucide-react';
// import { TbWorldWww } from 'react-icons/tb';
// import {
//     FaFacebook,
//     FaYoutube,
//     FaInstagram,
//     FaGithub,
//     FaSnapchat,
//     FaTwitter,
//     FaLinkedin,
//     FaSpotify,
// } from 'react-icons/fa';

// const Card1 = ({ first_name,
//     last_name,
//     job_title,
//     business_name,
//     business_address,
//     business_description,
//     primaryActionData,
//     primaryActionBtns }) => {
//     const { mobile, sms, email, location, website, telegram, whatsapp, calendar, selectedImage } = primaryActionData
//     return (
//         <div className='flex flex-col h-full w-full'>
//             <div className='cardUpper flex h-full w-full'>
//                 <div className='leftside flex-grow-0 flex-shrink-0 w-1/3 h-full '>
//                     <div className='leftupper h-60% w-full bg-visit_desk_white rounded-tl-3xl'>
//                         <div className='userProfile h-full w-full flex justify-center items-center'>
//                             <div className='rounded-full bg-white h-60% w-60% flex justify-center items-center'>
//                                 <img src={profile} alt='' className='rounded-full h-1/2 w-1/2 m-8' />
//                             </div>
//                         </div>
//                     </div>
//                     <div className='leftlower h-full w-full text-slate-800  bg-visit_desk_white flex-col justify-center'>
//                         <div className='firstName'>
//                             <input type="text" value={first_name} className='font-roboto_light text-4xl border-transparent caret-transparent w-full max-w-md text-center' />
//                             {/* <h1 className='font-roboto_light text-5xl'>{first_name}</h1> */}
//                         </div>
//                         <div className='lastName'>
//                             <input type="text" value={last_name} className='font-roboto_light text-4xl border-transparent caret-transparent w-full max-w-md text-center' />
//                             {/* <h1 className='font-roboto_light text-4xl'>{last_name}</h1> */}
//                         </div>
//                         <div className='jobtitle'>
//                             <input type="text" value={job_title} className='font-roboto_light text-2xl border-transparent caret-transparent w-full max-w-md text-center' />
//                             {/* <h2 className='font-roboto_light text-2xl'>{job_title}</h2> */}
//                         </div>
//                     </div>

//                     <hr className='border-8  border-white' />
//                     <hr className='border-8  border-white' />
//                     <hr className='border-8  border-white' />
//                     <hr className='border-8  border-white' />
//                     <hr className='border-3  border-white' />

//                 </div>
//                 <div className='rightside flex-grow flex-shrink w-2/3 h-full'>
//                     <div className='header h-45% w-full bg-visit_desk_white flex items-center justify-center pr-20 rounded-tr-3xl'>
//                         <div className='companyLogo flex justify-center items-center'>
//                             <img src={logo} alt='not found' className='h-24 w-24' />
//                             <div className=''>
//                                 <h1 className='font-roboto_light text-6xl'>{business_name}</h1>
//                                 <h1 className='font-roboto_light font-thin text-xl'>
//                                     {business_description}
//                                 </h1>
//                             </div>
//                         </div>
//                     </div>
//                     <hr className='border-2 border-green-300' />
//                     <div className='body h-55% w-full bg-visit_desk_white flex justify-center items-center p-4'>
//                         <div className='b_left h-full w-80% flex flex-col justify-center items-start space-y-4'>
//                             {/* ... (remaining code unchanged) ... */}
//                             <div className="phone flex space-x-4 justify-center items-center">
//                                 <Phone className=' size-10 text-visit_desk_green' />
//                                 {/* <h2 className='font-roboto_light font-extrabold text-2xl text-black  '>{mobile}</h2> */}
//                                 <input type="text" value={mobile} className="font-roboto_light font-extrabold text-2xl text-black w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent" />
//                             </div>
//                             <div className="location flex space-x-4 justify-center items-center">
//                                 <MapPin className=' size-10 text-visit_desk_green' />
//                                 {/* <h2 className='font-roboto_light text-xl text-black font-medium '>{location}</h2> */}
//                                 <input type="text" value={location} className="font-roboto_light font-medium text-xl text-black w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent overflow-wrap-break-word" />
//                                 {/* <textarea
//                                     value={location}
//                                     className='font-roboto_light font-medium text-2xl text-black border-transparent caret-transparent w-full max-w-md border-none focus:border-transparent overflow-wrap-break-word '
//                                 /> */}
//                             </div>
//                             <div className="mail flex space-x-4 justify-center items-center">
//                                 <Mail className=' size-10 text-visit_desk_green' />
//                                 {/* <h2 className='font-roboto_light text-xl text-black font-medium '>{email}</h2> */}
//                                 <input type="text" value={email} className="font-roboto_light font-medium text-xl text-black w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent" />
//                             </div>
//                             <div className="website flex space-x-4 justify-center items-center">
//                                 <TbWorldWww className=' size-10 text-visit_desk_green' />
//                                 {/* <h2 className='font-roboto_light text-xl text-black font-medium '>{website}</h2> */}
//                                 <input type="text" value={website} className="font-roboto_light font-medium text-xl text-black w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent" />

//                             </div>
//                         </div>
//                         <div className='r_left h-full w-20% flex justify-center items-center '>
//                             <img src={qr} alt='' />
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <div className='cardLower h-full w-full'>
//                 {/* <hr className='border-2 border-black' /> */}
//                 <hr className='border-2 border-green-300' />
//                 <div className='footer bg-visit_desk_green h-19% rounded-bl-3xl rounded-br-3xl'>
//                     <div className='logos flex justify-evenly items-center py-3'>
//                         {/* ... (remaining code unchanged) ... */}
//                         <FaLinkedin className=' size-10  text-visit_desk_white' />
//                         <FaTwitter className=' size-10 text-visit_desk_white' />
//                         <FaFacebook className=' size-10 text-visit_desk_white' />
//                         <FaInstagram className=' size-10 text-visit_desk_white' />
//                         <FaGithub className=' size-10 text-visit_desk_white' />
//                         <FaSnapchat className=' size-10 text-visit_desk_white' />

//                         {/* <div className="location  space-x-4 ">
//                             <FaLinkedin className=' size-10  text-visit_desk_white' />
//                         </div>
//                         <div className="location  space-x-4 ">
//                             <FaTwitter className=' size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location  space-x-4 ">
//                             <FaFacebook className=' size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location  space-x-4 ">
//                             <FaInstagram className=' size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location  space-x-4 ">
//                             <FaGithub className=' size-10 text-visit_desk_white' />
//                         </div>
//                         <div className="location  space-x-4 ">
//                             <FaSnapchat className=' size-10 text-visit_desk_white' />
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card1;

//***** */
// import React from 'react';
// import logo from './visitdesk_logo-removebg-preview.png';
// import qr from './qr.png';
// import profile from './profile.png';
// import { Mail, Phone, MessageSquareText, MapPin, Linkedin } from 'lucide-react';
// import { TbWorldWww } from 'react-icons/tb';
// import {
//     FaFacebook,
//     FaYoutube,
//     FaInstagram,
//     FaGithub,
//     FaSnapchat,
//     FaTwitter,
//     FaLinkedin,
//     FaSpotify,
// } from 'react-icons/fa';

// const Card1 = ({ first_name,
//     last_name,
//     job_title,
//     business_name,
//     business_address,
//     business_description,
//     primaryActionData,
//     primaryActionBtns ,
//     selectedProfile,
//     selectedLogo
// }) => {
//     const { mobile, sms, email, location, website, telegram, whatsapp, calendar } = primaryActionData
//     return (
//         // <div className='flex flex-col h-full w-full'>
//         <div className='card flex flex-col w-[395px]   max-w-[395px] max-h-[245px] bg-visit_desk_white rounded-3xl'>
//             <div className='cardUpper flex h-[85%] w-full'>
//                 <div className='leftside  w-1/3 h-[40%] '>
//                     <div className='leftupper h-[20%] w-full  rounded-tl-3xl flex justify-center h-[80px]'>
//                         {/* <img src={profile} alt='' className='rounded-full size-[50px] m-8' /> */}
//                         <img src={selectedProfile || profile} alt='' className='rounded-full size-[50px] m-8' />

//                     </div>
//                     <div className='leftlower h-[80%] w-full text-slate-800  flex flex-col justify-center items-center pt-2'>
//                         <h1 className="text-center leading-4 font-roboto_medium font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{first_name.toUpperCase()}</h1>
//                         <h1 className="text-center leading-4 font-roboto_medium font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{last_name.toUpperCase()}</h1>
//                         <h4 className="text-center leading-4 font-roboto_medium font-light text-xs tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{job_title.toUpperCase()}</h4>

//                     </div>
//                     <div className='r_left h-[40px] w-[40px] flex justify-center items-center '>
//                             {/* <img src={qr} alt='' /> */}
//                         </div> 





//                 </div>
//                 <div className='rightside  w-2/3 h-full'>
//                     <div className='header h-45% w-full bg-visit_desk_white flex items-center justify-center pr-20 rounded-tr-3xl'>
//                         <div className="company flex justify-start py-1 ">
//                             {/* <div className="logo flex items-center justify"> */}
//                             <div className="logo flex items-center justify-center">
//                                 <img src={selectedLogo||logo} alt="" className=' size-[40px]  ' />
//                             </div>
//                             <div className="businessDescription w-24  ">
//                                 <h1 className=" font-roboto_medium font-semibold text-[18px] flex tracking-widest text-slate-950" >{business_name}</h1>
//                                 <h6 className="font-roboto_medium font-light text-[8px] whitespace-nowrap leading-[0px] text-slate-950 ">{business_description}</h6>
//                             </div>
//                             {/* </div> */}
//                         </div>
//                     </div>
//                     <hr className='border-2 border-green-300' />
//                     <div className='body h-55% w-full bg-visit_desk_white flex justify-center items-center p-4'>
//                         <div className='b_left h-full w-80% flex flex-col justify-center items-start space-y-4'>
//                             {/* ... (remaining code unchanged) ... */}
//                             <div className="contactInfo space-y-1">
//                                 <div className="phone flex space-x-3 justify-center items-center">
//                                     <Phone className=' size-[20px] text-slate-700 ' />
//                                     {/* <input type="text" value={primaryActionData.mobile} spellCheck="false" className="font-roboto_light tracking-wide  font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-slate-200" /> */}
//                                     <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.mobile}</h1>
//                                     {/* 152x18 */}
//                                 </div>
//                                 <div className="location flex space-x-3 justify-center items-center">
//                                     <MapPin className=' size-[20px] text-slate-700' />
//                                     {/* <textarea type="text" spellCheck="false" value={primaryActionData.location} className="  font-roboto_light tracking-wide font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent  resize-none overflow-clip  bg-visit_desk_white" /> */}
//                                     {/* <h5 className=' max-w-[180px] whitespace-normal break-words bg-red-600'>dsaddfdsfsdffdsfdvfdvfdvfdvfdvfdvfdv123313213878797987</h5> */}
//                                     <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.location}</h1>

//                                 </div>
//                                 <div className="mail flex space-x-3 justify-center items-center">
//                                     <Mail className=' size-[20px] text-slate-700' />
//                                     {/* <input type="text" value={primaryActionData.email} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-visit_desk_white" /> */}
//                                     <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.email}</h1>
//                                 </div>
//                                 <div className="website flex space-x-3 justify-center items-center">
//                                     <TbWorldWww className=' size-[20px] text-slate-700' />
//                                     {/* <input type="text" value={primaryActionData.website} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-visit_desk_white" /> */}
//                                     <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.website}</h1>


//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <div className='cardLower h-[20%] w-[full]'>
//                 {/* <hr className='border-2 border-black' /> */}
//                 <hr className='border-2 border-green-300' />
//                 <div className='footer bg-visit_desk_green  rounded-bl-3xl rounded-br-3xl'>
//                     <div className='logos flex justify-evenly items-center py-[6.5px]'>
//                         <FaLinkedin className=' size-[20px]  text-visit_desk_white' />
//                         <FaTwitter className=' size-[20px] text-visit_desk_white' />
//                         <FaFacebook className=' size-[20px] text-visit_desk_white' />
//                         <FaInstagram className=' size-[20px] text-visit_desk_white' />
//                         <FaGithub className=' size-[20px] text-visit_desk_white' />
//                         <FaSnapchat className=' size-[20px] text-visit_desk_white' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card1;


// import React from 'react';
// import logo from './visitdesk_logo-removebg-preview.png';
// import qr from './qr.png';
// import profile from './profile.png';
// import { Mail, Phone, MessageSquareText, MapPin, Linkedin } from 'lucide-react';
// import { TbWorldWww } from 'react-icons/tb';
// import {
//     FaFacebook,
//     FaYoutube,
//     FaInstagram,
//     FaGithub,
//     FaSnapchat,
//     FaTwitter,
//     FaLinkedin,
//     FaSpotify,
// } from 'react-icons/fa';

// const Card1 = ({ first_name,
//     last_name,
//     job_title,
//     business_name,
//     business_address,
//     business_description,
//     primaryActionData,
//     primaryActionBtns ,
//     selectedProfile,
//     selectedLogo
// }) => {
//     const { mobile, sms, email, location, website, telegram, whatsapp, calendar } = primaryActionData
//     return (
//         // <div className='flex flex-col h-full w-full'>
//         <div className='card flex flex-col w-[395px]   max-w-[395px] max-h-[245px] bg-visit_desk_white rounded-3xl'>
//             <div className='cardUpper flex h-[85%] w-full'>
//                 <div className='leftside  w-1/3 h-[40%] '>
//                     <div className='leftupper h-[20%] w-full  rounded-tl-3xl flex justify-center h-[80px]'>
//                         {/* <img src={profile} alt='' className='rounded-full size-[50px] m-8' /> */}
//                         <img src={ profile} alt='' className='rounded-full size-[50px] m-8' />

//                     </div>
//                     <div className='leftlower h-[80%] w-full text-slate-800  flex flex-col justify-center items-center pt-2'>
//                         <h1 className="text-center leading-4 font-roboto_medium font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{first_name.toUpperCase()}</h1>
//                         <h1 className="text-center leading-4 font-roboto_medium font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{last_name.toUpperCase()}</h1>
//                         <h4 className="text-center leading-4 font-roboto_medium font-light text-xs tracking-wide min-w-[97%] max-w-[97%] overflow-clip">{job_title.toUpperCase()}</h4>

//                     </div>
//                     <div className='r_left h-[40px] w-[40px] flex justify-center items-center '>
//                             {/* <img src={qr} alt='' /> */}
//                         </div> 





//                 </div>
//                 <div className='rightside  w-2/3 h-full'>
//                     <div className='header h-45% w-full bg-visit_desk_white flex items-center justify-center pr-20 rounded-tr-3xl'>
//                         <div className="company flex justify-start py-1 ">
//                             {/* <div className="logo flex items-center justify"> */}
//                             <div className="logo flex items-center justify-center">
//                                 <img src={logo} alt="" className=' size-[40px]  ' />
//                             </div>
//                             <div className="businessDescription w-24  ">
//                                 <h1 className=" font-roboto_medium font-semibold text-[18px] flex tracking-widest text-slate-950" >{business_name}</h1>
//                                 <h6 className="font-roboto_medium font-light text-[8px] whitespace-nowrap leading-[0px] text-slate-950 ">{business_description}</h6>
//                             </div>
//                             {/* </div> */}
//                         </div>
//                     </div>
//                     <hr className='border-2 border-green-300' />
//                     <div className='body h-55% w-full bg-visit_desk_white flex justify-center items-center p-4'>
//                         <div className='b_left h-full w-80% flex flex-col justify-center items-start space-y-4'>
//                             {/* ... (remaining code unchanged) ... */}
//                             <div className="contactInfo space-y-1">
//                                 <div className="phone flex space-x-3 justify-center items-center">
//                                     <Phone className=' size-[20px] text-slate-700 ' />
//                                     <input type="text" value={primaryActionData.mobile} spellCheck="false" className="font-roboto_light tracking-wide  font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent " />
//                                     {/* <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.mobile}</h1> */}
//                                     {/* 152x18 */}
//                                 </div>
//                                 <div className="location flex space-x-3 justify-center items-center">
//                                     <MapPin className=' size-[20px] text-slate-700' />
//                                     <textarea type="text" spellCheck="false" value={primaryActionData.location} className="  font-roboto_light tracking-wide font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent  resize-none overflow-clip  bg-visit_desk_white" />
//                                     {/* <h5 className=' max-w-[180px] whitespace-normal break-words'>{primaryActionData.location}</h5> */}
//                                     {/* <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.location}</h1> */}

//                                 </div>
//                                 <div className="mail flex space-x-3 justify-center items-center">
//                                     <Mail className=' size-[20px] text-slate-700' />
//                                     <input type="text" value={primaryActionData.email} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-visit_desk_white" />
//                                     {/* <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.email}</h1> */}
//                                 </div>
//                                 <div className="website flex space-x-3 justify-center items-center">
//                                     <TbWorldWww className=' size-[20px] text-slate-700' />
//                                     <input type="text" value={primaryActionData.website} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-visit_desk_white" />
//                                     {/* <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.website}</h1> */}


//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <div className='cardLower h-[20%] w-[full]'>
//                 {/* <hr className='border-2 border-black' /> */}
//                 <hr className='border-2 border-green-300' />
//                 <div className='footer bg-visit_desk_green  rounded-bl-3xl rounded-br-3xl'>
//                     <div className='logos flex justify-evenly items-center py-[6.5px]'>
//                         <FaLinkedin className=' size-[20px]  text-visit_desk_white' />
//                         <FaTwitter className=' size-[20px] text-visit_desk_white' />
//                         <FaFacebook className=' size-[20px] text-visit_desk_white' />
//                         <FaInstagram className=' size-[20px] text-visit_desk_white' />
//                         <FaGithub className=' size-[20px] text-visit_desk_white' />
//                         <FaSnapchat className=' size-[20px] text-visit_desk_white' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card1;


import React from 'react';
import logo from './visitdesk_logo-removebg-preview.png';
import qr from './qr.png';
import profile from './profile.png';
import { Mail, Phone, MessageSquareText, MapPin, Linkedin } from 'lucide-react';
import { TbWorldWww } from 'react-icons/tb';
import {
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaGithub,
    FaSnapchat,
    FaTwitter,
    FaLinkedin,
    FaSpotify,
} from 'react-icons/fa';

const Card1 = ({ first_name,
    last_name,
    job_title,
    business_name,
    business_address,
    business_description,
    primaryActionData,
    primaryActionBtns,
    secondaryActionBtns,
    selectedProfile,
    selectedLogo
}) => {
    const { mobile, sms, email, location, website, telegram, whatsapp, calendar } = primaryActionData
    return (
        <div className='card flex flex-col w-[395px]  min-w-[395px] min-h-[210px]   max-w-[395px] max-h-[245px] rounded-t-3xl bg-gray-900'>
            <div className='cardUpper flex h-[85%] w-full bg-visit_desk_white rounded-t-3xl '>
                <div className='leftside  w-1/3 h-[40%] '>
                    <div className='leftupper  w-full  rounded-tl-3xl flex justify-center h-[80px]'>
                        <img src={selectedProfile || profile} alt='' className='rounded-full size-[50px] m-8' />

                    </div>
                    <div className='leftlower h-[80%] w-full text-slate-800  flex flex-col justify-center items-center pt-2'>
                        <h1 className="text-center leading-4 font-montserrat font-bold text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip min-h-[16px]">{first_name.toUpperCase()}</h1>
                        <h1 className="text-center leading-4 font-montserrat font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip min-h-[16px]">{last_name.toUpperCase()}</h1>
                        <h4 className="text-center leading-4 font-inter font-light text-xs tracking-wide min-w-[97%] max-w-[97%] overflow-clip min-h-[16px]">{job_title.toUpperCase()}</h4>

                    </div>
                    <div className='r_left h-[40px] w-[40px] flex justify-center items-center '></div>





                </div>
                <div className='rightside  w-2/3 h-full'>
                    <div className='header h-45% w-full bg-visit_desk_white flex items-center justify-center pr-20 rounded-tr-3xl pt-1'>
                        <div className="company flex justify-start py-1 ">
                            <div className="logo flex items-center justify-center">
                                <img src={selectedLogo || logo} alt="" className=' size-[40px]  ' />
                            </div>
                            <div className="businessDescription w-24  ">
                                <h1 className="  font-semibold text-[18px] flex tracking-widest  text-slate-800 font-montserrat min-h-[27px]" >{business_name}</h1>
                                <h6 className="font-light text-[8px] whitespace-nowrap leading-[1px] text-slate-950 font-montserrat min-w-[194px] max-w-[194px] py-1  overflow-hidden">{business_description}</h6>
                            </div>
                        </div>
                    </div>
                    <hr className='border-[1.5px]  border-green-300' />
                    <div className='body h-55% w-full bg-visit_desk_white flex justify-center items-center p-4'>
                        <div className='b_left h-full w-80% flex flex-col justify-center items-start space-y-4'>
                            <div className="contactInfo space-y-1">
                                <div className="phone flex space-x-3 justify-center items-center">
                                    <Phone className=' size-[15px] text-slate-700 ' />
                                    <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.mobile}</h1>
                                </div>
                                <div className="location flex space-x-3 justify-center items-center">
                                    <MapPin className=' size-[15px] text-slate-700' />
                                    <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.location}</h1>

                                </div>
                                <div className="mail flex space-x-3 justify-center items-center">
                                    <Mail className=' size-[15px] text-slate-700' />
                                    <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.email}</h1>
                                </div>
                                <div className="website flex space-x-3 justify-center items-center">
                                    <TbWorldWww className=' size-[15px] text-slate-700' />
                                    <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.website}</h1>


                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='cardLower h-[20%] w-[full]'>
                <hr className='border-2 border-green-300' />
                <div className='footer bg-visit_desk_green  rounded-bl-3xl rounded-br-3xl'>
                    <div className='logos flex justify-evenly items-center py-[6.5px] min-h-[33px]'>
                        {secondaryActionBtns.map((button) => (
                            !button.isVisible && (
                                <div key={button.id} className='flex size-[20px] text-visit_desk_white'>
                                    {React.createElement(button.icon)}          
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card1;

