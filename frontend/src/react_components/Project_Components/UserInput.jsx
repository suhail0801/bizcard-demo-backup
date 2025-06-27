import React from 'react'
import { HiPlus } from "react-icons/hi";

const UserInput = ({ Input, Label, Textarea, handleInput, handleUploadChange, contactFields, card, htmlData }) => {
  // const card1 = [
  //   "job_title", "business_name", "business_description", "mobile", "location", "email", "website", true
  // ];
  // const card2 = ["job_title", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin", false];
  return (
    <div className="contact-info flex flex-col  w-[100%]">
      <div className="primary-actions flex flex-col  w-[100%]  my-5 space-y-4">
        <h2 className=" text-white font-extrabold text-2xl my-4 font-montserrat">Header actions</h2>
      </div>

      {/* {true && (
      <div className="flex justify-start w-[100%]  max-w-full my-4">
        <label htmlFor="profilePicture" className=" bg-gray-700 hover:bg-gray-600 cursor-pointer text-white py-2 px-3 rounded-md font-montserrat">
          Choose profile
          <input
            id="profilePicture"
            name='profilePicture'
            type="file"
            className="hidden"
            onChange={(event) => handleProfileChange(event, 'profile')}
            accept="image/*"  // Optional: Restrict to image files
          />
        </label>
      </div>
      )} */}

      {("profile_pic" in htmlData) && (
        <div className="flex justify-start w-[100%]  max-w-full my-4">
          <label htmlFor="profilePicture" className=" bg-gray-700 hover:bg-gray-600 cursor-pointer text-white py-2 px-3 rounded-md font-montserrat " >
            <HiPlus className="text-white text-9xl font-extrabold size-[30px]" />
            <input id="profilePicture" name='profile_pic' type="file" className="hidden" onChange={(event) => handleUploadChange(event)} accept="image/*" />
          </label>
          <div className="meta pl-4">
            <h1 className=' text-white font-montserrat'>Add profile photo</h1>
            <h6 className=' text-white font-montserrat opacity-60 text-xs'>suggested format: jpeg or png </h6>
          </div>
        </div>
      )}

      {("logo" in htmlData) && (
        <div className="flex justify-start w-[100%]  max-w-full my-4">
          <label htmlFor="logoPicture" className=" bg-gray-700 hover:bg-gray-600 cursor-pointer text-white py-2 px-3 rounded-md font-montserrat " >
            <HiPlus className="text-white text-9xl font-extrabold size-[30px]" />
            <input id="logoPicture" name='logo' type="file" className="hidden" onChange={(event) => handleUploadChange(event)} accept="image/*" />
          </label>
          <div className="meta pl-4">
            <h1 className=' text-white font-montserrat'>Add logo</h1>
            <h6 className=' text-white font-montserrat opacity-60 text-xs'>suggested format: jpeg or png </h6>
          </div>
        </div>
      )}

      {/* <div className="flex  w-full space-x-5">
        <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
          <Label htmlFor="text" className=" text-white font-montserrat">First name</Label>
          <Input type="text" name='first_name' placeholder="First name" className="font-montserrat text-sm font-medium" spellCheck="false" value={card.htmlData?.first_name} onChange={handleInput} />
        </div>
        <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
          <Label htmlFor="text" className=" text-white font-montserrat">Last name</Label>
          <Input type="text"  name='last_name' placeholder="Last name" className="w-full bg-black font-montserrat" spellCheck="false" value={card.htmlData?.last_name} onChange={handleInput} />
        </div>
      </div> */}
      {/* <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
        <Label htmlFor="text" className=" text-white font-montserrat">Gender pronouns</Label>
        <Input type="text" name='gender_pronouns' placeholder="Gender pronouns" className="w-full bg-black font-montserrat" spellCheck="false" onChange={handleInput} />
      </div>
      <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
        <Label htmlFor="text" className=" text-white font-montserrat">Job title</Label>
        <Input type="text" name='job_title' placeholder="Job title" className="w-full bg-black font-montserrat" spellCheck="false" onChange={handleInput} />
      </div>
      <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
        <Label htmlFor="text" className=" text-white font-montserrat">Business name</Label>
        <Input type="text" name='business_name' placeholder="Business name  " className="w-full bg-black font-montserrat" spellCheck="false" onChange={handleInput} />
      </div>
      <div className="grid w-full gap-1.5 my-4 ">
        <Label htmlFor="message" className=" text-white font-montserrat">Business address</Label>
        <Textarea placeholder="Type your Business address." name="business_address" id="message" className="resize-none h-28 bg-black block mt-2 px-4 py-3 w-full rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600 font-montserrat" spellCheck="false" onChange={handleInput} />
      </div>
      <div className="grid w-full gap-1.5 my-4 ">
        <Label htmlFor="message" className=" text-white font-montserrat">Business description</Label>
        <Textarea placeholder="Type your Business description." name="business_description" id="message" className="resize-none h-28 bg-black font-montserrat" spellCheck="false" onChange={handleInput} />
      </div> */}
      {/* {contactFields.map((element)=>{(
        card1.includes(element.name)?
        if(element.type=="textarea"){
          <div className="grid w-full gap-1.5 my-4 ">
            <Label htmlFor="message" className=" text-white">{element.label}</Label>
            <Textarea placeholder={element.placeholder} name={element.name} id="message" className="resize-none h-28 bg-black block mt-2 px-4 py-3 w-full rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600" spellCheck="false" onChange={handleInput} />
        </div>
        }
        else{
          <div className="grid  w-[100%] items-center gap-1.5 max-w-full my-4 ">
            <Label htmlFor="text" className=" text-white">{element.label}</Label>
            <Input type="text" name={element.name} placeholder={element.placeholder} className="w-full bg-black" spellCheck="false" onChange={handleInput} />
          </div>
        }
      )
      })} */}
      <div className="grid grid-cols-2 gap-2">
        {contactFields.map((element) => {
          // {console.log(card, 'card.htmlData[element.name]', element.name, card.htmlData)}
          // console.log(htmlData, 'html data', element)
          if (element.name in htmlData) {
            if (element.type === "textarea") {
              return (
                <div className="grid w-full gap-1.5 my-4 col-span-2 " key={element.name}>
                  <Label htmlFor="message" className="font-montserrat text-white">{element.label}</Label>
                  <Textarea placeholder={element.placeholder} name={element.name} id="message" className="font-montserrat resize-none h-28 bg-black block mt-2 px-4 py-3 w-full rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600" spellCheck="false" value={htmlData[element.name]} onChange={handleInput} />
                </div>
              );
            } else {
              return (
                <div className="my-4 font-montserrat" key={element.name}>
                  <Label htmlFor="text" className="font-montserrat text-white">{element.label}</Label>
                  <Input type="text" name={element.name} placeholder={element.placeholder} className="font-montserrat w-full bg-black" spellCheck="false" value={htmlData[element.name]} onChange={handleInput} />
                </div>
              );
            }
          }
          return null;
        })}

      </div>

      {/* {contactFields.map((element) => (
        cardsData[0].card1.includes(element.name) ? (
          element.type === "textarea" ? (
            <div className="grid w-full gap-1.5 my-4 " key={element.name}>
              <Label htmlFor="message" className="text-white">{element.label}</Label>
              <Textarea placeholder={element.placeholder} name={element.name} id="message" className="resize-none h-28 bg-black block mt-2 px-4 py-3 w-full rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600" spellCheck="false" onChange={handleInput} />
            </div>
          ) : (
            <div className="grid w-[100%] items-center gap-1.5 max-w-full my-4 " key={element.name}>
              <Label htmlFor="text" className="text-white">{element.label}</Label>
              <Input type="text" name={element.name} placeholder={element.placeholder} className="w-full bg-black" spellCheck="false" onChange={handleInput} />
            </div>
          )
        ) : null
      ))} */}
    </div>)
}

export default UserInput;





