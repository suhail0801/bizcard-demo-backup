// import React from 'react'
// import logo from './visitdesk_logo-removebg-preview.png';
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

// const Card2Back = ({ first_name,
//     last_name,
//     job_title,
//     business_name,
//     business_address,
//     business_description,
//     primaryActionData,
//     secondaryActionBtns,
//     primaryActionBtns,
//     selectedProfile,
//     selectedLogo, }) => {
//     const iconColorMapping = {
//         FaLinkedin: 'text-sky-900',
//         FaTwitter: 'text-sky-300',
//         FaFacebook: 'text-sky-600',
//         FaInstagram: 'text-gradient-to-r from-purple-700 to-pink-500',
//         FaGithub: 'text-stone-600',
//         FaSnapchat: 'text-yellow-500',
//         FaSpotify: 'text-green-500',
//         FaYoutube: 'text-red-700',
//     };
//     return (
//         // <div className=' w-[100vw] h-[100vh]  bg-black flex justify-center items-center'>
//         <div className="card w-[395px] h-[245px]  bg-slate-200 rounded-2xl flex justify-center pt-10">
//             <div className="left flex flex-col items-end w-[42%] ">
//                 <div className="userName min-h-[87px] flex flex-col items-end ">

//                     <h1 className=" font-roboto_medium font-bold text-lg tracking-widest " >{first_name.toUpperCase()}</h1>
//                     <h1 className="font-roboto_medium font-bold text-lg tracking-widest">{last_name.toUpperCase()}</h1>
//                     <h4 className="font-roboto_medium font-light text-base tracking-wider">{job_title.toUpperCase()}</h4>
//                 </div>

//                 {/* <input className=" font-roboto_medium font-extrabold text-xl tracking-widest bg-slate-200 " value={first_name.toUpperCase()}/>
//                     <input className="font-roboto_medium font-extrabold text-xl tracking-widest bg-slate-200" value={last_name.toUpperCase()}/>
//                     <input className="font-roboto_medium font-light text-base tracking-wider bg-slate-200" value={job_title.toUpperCase()}/> */}
//                 <div className="socialMedia grid grid-cols-4 gap-x-4 gap-y-2 mt-8">
//                     {/* <FaLinkedin className=' size-[20px]  text-sky-900' />
//                         <FaTwitter className=' size-[20px] text-sky-300' />
//                         <FaFacebook className=' size-[20px] text-sky-600 ' />
//                         <FaInstagram className=' size-[20px] text-gradient-to-r from-purple-700 to-pink-500' />
//                         <FaGithub className=' size-[20px] text-stone-600' />
//                         <FaSnapchat className=' size-[20px] text-yellow-500' />
//                         <FaSpotify className=' size-[20px] text-green-500' />
//                         <FaYoutube className=' size-[20px] text-red-700' /> */}
                    
//                     {secondaryActionBtns.map((button) => (
//                         !button.isVisible && (
//                             <div key={button.id} className={`size-[20px] ${button.icon_color}`}>
//                                 {React.createElement(button.icon)}
//                             </div>
//                         )
//                     ))}
//                 </div>
//             </div>
//             <div className="divider ">
//                 <hr className=" border-[1.75px] h-[85%] border-slate-900 mx-5 rounded-xl bg-slate-900" />
//             </div>
//             <div className="right flex flex-col w-[54%] space-y-4">
//                 <div className="company flex justify-start ">
//                     <img src={selectedLogo || logo} alt="" className=' h-10' />
//                     <div className="businessDescription">
//                         <h1 className=" font-roboto_medium font-bold text-xl flex tracking-widest  text-slate-950" >{business_name}</h1>
//                         <h6 className="font-roboto_medium font-light text-[8px] whitespace-nowrap  text-slate-950 ">{business_description}</h6>
//                     </div>
//                 </div>
//                 <div className="contactInfo space-y-1">
//                     <div className="phone flex space-x-3 justify-center items-center">
//                         <Phone className=' size-[15px] text-slate-700 ' />
//                         {/* <input type="text" value={primaryActionData.mobile} spellCheck="false" className="font-roboto_light tracking-wide  font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-slate-200" /> */}
//                         <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.mobile}</h1>

//                     </div>
//                     <div className="location flex space-x-3 justify-center items-center">
//                         <MapPin className=' size-[15px] text-slate-700' />
//                         {/* <textarea type="text" spellCheck="false" value={primaryActionData.location} className="  font-roboto_light tracking-wide font-light text-[12px]  text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent  resize-none overflow-clip  bg-slate-200" /> */}
//                         {/* <h5 className=' max-w-[180px] whitespace-normal break-words bg-red-600'>dsaddfdsfsdffdsfdvfdvfdvfdvfdvfdvfdv123313213878797987</h5> */}
//                         <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.location}</h1>

//                     </div>
//                     <div className="mail flex space-x-3 justify-center items-center">
//                         <Mail className=' size-[15px] text-slate-700' />
//                         {/* <input type="text" value={primaryActionData.email} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-slate-200" /> */}
//                         <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words leading-[15px] flex  items-center"   >{primaryActionData.email}</h1>

//                     </div>
//                     <div className="website flex space-x-3 justify-center items-center">
//                         <TbWorldWww className=' size-[15px] text-slate-700' />
//                         {/* <input type="text" value={primaryActionData.website} spellCheck="false" className="font-roboto_light font-light text-[12px] tracking-wide text-slate-950 w-full max-w-md border-none focus:ring-0 focus:outline-none caret-transparent bg-slate-200" /> */}
//                         <h1 className="font-roboto_light tracking-wide  font-light text-[10px]  text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px]  border-none focus:ring-0 focus:outline-none caret-transparent  whitespace-normal break-words flex  items-center"   >{primaryActionData.website}</h1>


//                     </div>

//                 </div>
//             </div>
//         </div>
//         // </div>
//     )
// }

// export default Card2Back


import React from 'react'
import logo from './visitdesk_logo-removebg-preview.png';
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

const Card2Back = ({ first_name,
    last_name,
    job_title,
    business_name,
    business_address,
    business_description,
    primaryActionData,
    secondaryActionBtns,
    primaryActionBtns,
    selectedProfile,
    selectedLogo, }) => {
    const iconColorMapping = {
        FaLinkedin: 'text-sky-900',
        FaTwitter: 'text-sky-300',
        FaFacebook: 'text-sky-600',
        FaInstagram: 'text-gradient-to-r from-purple-700 to-pink-500',
        FaGithub: 'text-stone-600',
        FaSnapchat: 'text-yellow-500',
        FaSpotify: 'text-green-500',
        FaYoutube: 'text-red-700',
    };
    return (
        <div className="card w-[395px] h-[245px]  bg-slate-200 rounded-2xl flex justify-center pt-10">
            <div className="left flex flex-col items-end w-[42%] ">
                <div className="userName min-h-[87px] flex flex-col items-end ">

                    <h1 className=" font-roboto_medium font-bold text-lg tracking-widest " >{first_name.toUpperCase()}</h1>
                    <h1 className="font-roboto_medium font-bold text-lg tracking-widest">{last_name.toUpperCase()}</h1>
                    <h4 className="font-roboto_medium font-light text-base tracking-wider">{job_title.toUpperCase()}</h4>
                </div>

                <div className="socialMedia grid grid-cols-4 gap-x-4 gap-y-2 mt-8">
                    
                    {secondaryActionBtns.map((button) => (
                        !button.isVisible && (
                            <div key={button.id} className={`size-[20px] ${button.icon_color}`}>
                                {React.createElement(button.icon)}
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className="divider ">
                <hr className=" border-[1.75px] h-[85%] border-slate-900 mx-5 rounded-xl bg-slate-900" />
            </div>
            <div className="right flex flex-col w-[54%] space-y-4">
                <div className="company flex justify-start ">
                    <img src={selectedLogo || logo} alt="" className=' h-10' />
                    <div className="businessDescription">
                        <h1 className=" font-roboto_medium font-bold text-xl flex tracking-widest  text-slate-950" >{business_name}</h1>
                        <h6 className="font-roboto_medium font-light text-[8px] whitespace-nowrap  text-slate-950 ">{business_description}</h6>
                    </div>
                </div>
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
        
    )
}

export default Card2Back
