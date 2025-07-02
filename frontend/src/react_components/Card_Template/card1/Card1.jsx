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
import { parsePhoneNumberFromString } from 'libphonenumber-js';

function formatPhone(phone) {
  if (!phone) return '';
  const phoneNumber = parsePhoneNumberFromString(phone);
  if (phoneNumber) {
    return phoneNumber.formatInternational();
  }
  return phone;
}

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
                                    <a href={`tel${mobile}`} target='blank' className="h-7 w-7 bg-green-500 flex justify-center items-center rounded-full ml-5">
                                      <Phone className="text-white" />
                                    </a>
                                    <span className="ml-2 text-black font-montserrat text-xs">{formatPhone(mobile)}</span>
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

