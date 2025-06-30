import React, { useState } from 'react'
// import Input from '../components/input';
// import Label from '../components/label';
// import Textarea from '../components/textArea';

const SecondaryActions = ({ Button, Input, handleButtonClick, secondaryActionBtns, handleInput, card, htmlData}) => {
  // const card2= ["job_title", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin"];
  const [visibilityData, setVisibilityData] = useState({})
  const handleInputChange = (e) => {
    handleInput(e)
    let isVisible = false
    e.target.value && (isVisible = true) 
    setVisibilityData((prev)=> ({...prev, [e.target.name]: isVisible}))
  }
  return (
    // <div className="secondary-actions flex flex-col  w-[100%]  my-7 space-y-4">
    //       <h2 className=" text-white font-extrabold text-2xl my-4">Secondary actions</h2>
    //       <div className=' space-y-6 '>
    //         {secondaryActionBtns.map((button) => (
    //           !button.isVisible && (
    //             <div className='flex '>
    //               <div className={`${button.color} h-12 w-12  flex justify-center items-center rounded-l`}>
    //                 {React.createElement(button.icon, { className: "h-6 w-6 text-white" })}
    //               </div>
    //               <Input type="text" name={button.name} placeholder={`Enter your ${button.name}`} className="w-full bg-black  rounded-l-none" spellCheck={false}  />
    //             </div>
    //           )
    //         ))}
    //         {secondaryActionBtns.some((button) => !button.isVisible) && (
    //           <hr className="border-b-1 border-gray-500" />
    //         )}

    //       </div>

    //       <div className="grid grid-cols-2 gap-2 w-[100%]">
    //         {secondaryActionBtns.map((button) => (
    //           button.isVisible && (
    //             <Button
    //               key={button.id}
    //               className={`${button.color} w-[100%] transition duration-300 ease-in-out transform hover:${button.hover}  justify-start`}
    //               name={button.name}
    //               onClick={() => handleButtonClick(button.id, false)}
    //             >
    //               {React.createElement(button.icon, { className: "mr-2 h-5 w-5" })}
    //               <div className="font-medium text-base">{button.name}</div>
    //             </Button>
    //           )
    //         ))}
    //       </div>

    //     </div>


    <div className="secondary-actions flex flex-col  w-[100%]  my-7 space-y-4">
      <h2 className=" text-white font-extrabold text-2xl my-4 font-montserrat">Secondary actions</h2>
      <div className=' space-y-6 '>
        {secondaryActionBtns.map((button) => (
          ((htmlData.contactLinks && htmlData.contactLinks[button.name]) || (visibilityData[button.name])) && (
            <div className='flex ' key={button.id}>
              <div className={`${button.color} h-12 w-12  flex justify-center items-center rounded-l`}>
                {React.createElement(button.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <Input type="text"  name={button.name} value={htmlData.contactLinks[button.name]} placeholder={`Enter your ${button.name.split('_')[0]}`} className="w-full bg-black  rounded-l-none font-montserrat" spellCheck={false} onChange={handleInputChange} /> 
            </div>
          )
        ))}
        {secondaryActionBtns.some((button) => (htmlData && !htmlData.contactLinks[button.name])) && (
          <hr className="border-b-1 border-gray-500" />
        )}

      </div>

      <div className="grid grid-cols-2 gap-2 w-[100%]">
        {secondaryActionBtns.map((button) => (
         
          (( (button.name in htmlData.contactLinks) && (htmlData.contactLinks && !htmlData.contactLinks[button.name])) && !visibilityData[button.name]) && (
            <Button
              key={button.id}
              className={`${button.color} w-[100%] transition duration-300 ease-in-out transform hover:${button.hover}  justify-start h-12`}
              name={button.name}
              onClick={() => setVisibilityData((prev)=> ({...prev, [button.name]: true}))}
            > 
              {React.createElement(button.icon, { className: "mr-2 h-5 w-5" })}
              <div className="font-medium text-base font-montserrat">{button.name.split('_')[0]}</div>
            </Button>
          )
        ))}
      </div>

        </div>
  )
}

export default SecondaryActions;