import React, { useState } from 'react'
import { toast } from 'react-toastify';


const PrimaryActions = ({ Button, Input, handleButtonClick, primaryActionBtns, primaryActionData, handleInput, htmlData }) => {
  // const card1 = [
  //   "job_title", "business_name", "business_description", "mobile", "location", "email", "website"
    
  // ];

  const [visibilityData, setVisibilityData] = useState({})
  const handleInputChange = (e) => {
    handleInput(e)
    let isVisible = false
    e.target.value && (isVisible = true) 
    setVisibilityData((prev)=> ({...prev, [e.target.name]: isVisible}))
  }

  return (
    <div className="primary-actions flex flex-col w-[100%] my-7 space-y-4">
      <h2 className="text-white font-extrabold text-2xl my-4 font-montserrat">Primary actions</h2>
      <div className=' space-y-6 '>
        {primaryActionBtns.map((button) => (
          ((htmlData.primaryActions && htmlData.primaryActions[button.name]) || (visibilityData[button.name])) && (
            <div className='flex ' key={button.id}>
              <div className='h-12 w-12 bg-green-500 flex justify-center items-center rounded-l'>
                {React.createElement(button.icon, { className: "h-6 w-6 text-white" })}
              </div>
              <Input type="text"  name={button.name} placeholder={`Enter your ${button.name}`} value={htmlData.primaryActions[button.name]} className="font-montserrat w-full bg-black  rounded-l-none" spellCheck="false" onChange={handleInputChange} />
            </div>
          )
        ))}
        {primaryActionBtns.some((button) => !button.isVisible) && (
          <hr className="border-b-1 border-gray-500" />
        )}

      </div>

      <div className="grid grid-cols-2 gap-2 w-[100%]">
        {primaryActionBtns.map((button) => (
          
         ((button.name in htmlData.primaryActions) && (htmlData.primaryActions && !htmlData.primaryActions[button.name]) && !visibilityData[button.name]) && (
            <Button
              key={button.id}
              className="bg-gray-700 w-[100%] hover:bg-gray-600 justify-start h-12 font-montserrat"
              name={button.name}
              onClick={() => setVisibilityData((prev)=> ({...prev, [button.name]: true}))}
            >
              {React.createElement(button.icon, { className: "mr-2 h-5 w-5" })}
              <div className="font-medium text-base font-montserrat">{(button.name)}</div>
            </Button>
         )
        ))}
      </div>
    </div>
  )
}

export default PrimaryActions;