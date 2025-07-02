import React from "react";

// Asset imports commented out for isolation
// let logo, qr, profile, Mail, Phone, MapPin, TbWorldWww, FaFacebook, FaInstagram, FaGithub, FaSnapchat, FaTwitter, FaLinkedin;
// let importError = null;
// try {
//   logo = require("./visitdesk_logo-preview.png");
//   qr = require("./qr.png");
//   profile = require("./profile.png");
//   ({ Mail, Phone, MapPin } = require("lucide-react"));
//   ({ TbWorldWww } = require("react-icons/tb"));
//   ({ FaFacebook, FaInstagram, FaGithub, FaSnapchat, FaTwitter, FaLinkedin } = require("react-icons/fa"));
// } catch (e) {
//   importError = e.message;
// }

const Card1 = (props) => {
  // TEST: Confirm Card1 renders at all
  return (
    <div>
      <div style={{color:'green',fontWeight:'bold',fontSize:24}}>TEST</div>
      {/*
      <div className="card flex flex-col w-[395px] min-w-[395px] min-h-[210px] max-w-[395px] max-h-[245px] rounded-t-3xl bg-gray-900">
          <div className="cardUpper flex h-[85%] w-full bg-visit_desk_white rounded-t-3xl ">
            <div className="leftside w-1/3 h-[40%] ">
              <div className="leftupper w-full rounded-tl-3xl flex justify-center h-[80px]">
                <img src={props.selectedProfile || profile} alt="" className="rounded-full size-[50px] m-8" />
              </div>
              <div className="leftlower h-[80%] w-full text-slate-800 flex flex-col justify-center items-center pt-2">
                <h1 className="text-center leading-4 font-montserrat font-bold text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip min-h-[16px]">{props.first_name?.toUpperCase()}</h1>
                <h1 className="text-center leading-4 font-montserrat font-medium text-[14px] tracking-wide min-w-[97%] max-w-[97%] overflow-clip min-h-[16px]">{props.last_name?.toUpperCase()}</h1>
                <h4 className="text-center leading-4 font-inter font-light text-xs tracking-wide min-w-[97%] max-w-[97%] overflow-clip min_h-[16px]">{props.job_title?.toUpperCase()}</h4>
              </div>
            </div>
            <div className="rightside w-2/3 h-full">
              <div className="header h-45% w-full bg-visit_desk_white flex items-center justify-center pr-20 rounded-tr-3xl pt-1">
                <div className="company flex justify-start py-1 ">
                  <div className="logo flex items-center justify-center">
                    <img src={props.selectedLogo || logo} alt="" className="size-[40px]" />
                  </div>
                  <div className="businessDescription w-24">
                    <h1 className="font-semibold text-[18px] flex tracking-widest text-slate-800 font-montserrat min-h-[27px]">{props.business_name}</h1>
                    <h6 className="font-light text-[8px] whitespace-nowrap leading-[1px] text-slate-950 font-montserrat min-w-[194px] max-w-[194px] py-1 overflow-hidden">{props.business_description}</h6>
                  </div>
                </div>
              </div>
              <hr className="border-[1.5px] border-green-300" />
              <div className="body h-55% w-full bg-visit_desk_white flex justify-center items-center p-4">
                <div className="b_left h-full w-80% flex flex-col justify-center items-start space-y-4">
                  <div className="contactInfo space-y-1">
                    <div className="phone flex space-x-3 justify-center items-center">
                      {Phone ? <Phone className="size-[15px] text-slate-700" /> : <span>PhoneIcon</span>}
                      <h1 className="font-roboto_light tracking-wide font-light text-[10px] text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px] border-none focus:ring-0 focus:outline-none caret-transparent whitespace-normal break-words flex items-center">{props.primaryActionData?.mobile}</h1>
                    </div>
                    <div className="email flex space-x-3 justify-center items-center">
                      {Mail ? <Mail className="size-[15px] text-slate-700" /> : <span>MailIcon</span>}
                      <h1 className="font-roboto_light tracking-wide font-light text-[10px] text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px] border-none focus:ring-0 focus:outline-none caret-transparent whitespace-normal break-words flex items-center">{props.primaryActionData?.email}</h1>
                    </div>
                    <div className="website flex space-x-3 justify-center items-center">
                      {TbWorldWww ? <TbWorldWww className="size-[15px] text-slate-700" /> : <span>WebIcon</span>}
                      <h1 className="font-roboto_light tracking-wide font-light text-[10px] text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px] border-none focus:ring-0 focus:outline-none caret-transparent whitespace-normal break-words flex items-center">{props.primaryActionData?.website}</h1>
                    </div>
                    <div className="location flex space-x-3 justify-center items-center">
                      {MapPin ? <MapPin className="size-[15px] text-slate-700" /> : <span>LocIcon</span>}
                      <h1 className="font-roboto_light tracking-wide font-light text-[10px] text-slate-950 min-w-[175px] max-w-[175px] min-h-[18px] border-none focus:ring-0 focus:outline-none caret-transparent whitespace-normal break-words flex items-center">{props.primaryActionData?.location}</h1>
                    </div>
                  </div>
                  <div className="socials flex space-x-2 mt-2">
                    {FaFacebook ? <FaFacebook className="text-blue-600 size-[15px]" /> : <span>FB</span>}
                    {FaInstagram ? <FaInstagram className="text-pink-500 size-[15px]" /> : <span>IG</span>}
                    {FaGithub ? <FaGithub className="text-gray-800 size-[15px]" /> : <span>GH</span>}
                    {FaSnapchat ? <FaSnapchat className="text-yellow-400 size-[15px]" /> : <span>SC</span>}
                    {FaTwitter ? <FaTwitter className="text-blue-400 size-[15px]" /> : <span>TW</span>}
                    {FaLinkedin ? <FaLinkedin className="text-blue-700 size-[15px]" /> : <span>LI</span>}
                  </div>
                </div>
                <div className="b_right h-full w-20% flex flex-col justify-center items-center">
                  <img src={qr} alt="QR" className="size-[60px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      */}
    </div>
  );
};

export default Card1;

