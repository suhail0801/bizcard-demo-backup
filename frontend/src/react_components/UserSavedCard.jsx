import React, { useEffect } from "react";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Textarea } from "../components/textArea";
import { TbWorldWww } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "../index.css"

import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaGithub,
  FaSnapchat,
  FaTwitter,
  FaLinkedin,
  FaSpotify,
} from "react-icons/fa";

import UserInput from "./Project_Components/UserInput";
import SecondaryActions from "./Project_Components/SecondaryActions";
import PrimaryActions from "./Project_Components/PrimaryActions";

import { useParams } from "react-router-dom";

import axios from "axios";
import Navbar from "./Project_Components/Navbar";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const fillCardVariables = async (cardPreview, cardVariables, dontFillImages) => {
  cardPreview = cardPreview.toString();
  console.log(cardPreview, "card preview");
  cardVariables = cardVariables || {
    "logo": "/images/visitdesk-favicon.png",
    "role": "Software Engineer",
    "last_name": "Doe",
    "first_name": "John",
    "profile_pic": "/images/avatar-sign.png",
    "contactLinks": {
      "github_link": "",
      "spotify_link": "",
      "twitter_link": "",
      "youtube_link": "",
      "facebook_link": "",
      "linkedin_link": "",
      "snapchat_link": "",
      "instagram_link": ""
    },
    "business_name": "Visitdesk",
    "primaryActions": {
      "email": "john.doe@example.com",
      "mobile": "+1234567890",
      "website": "https://www.visitdesk.io",
      "location": "123 Main St, Anytown, USA",
      // "telegram": "@johndoe"
    },
    "business_description": "Providing innovative solutions in software development."
  };

  const htmlPreviewEle = document.createElement('div')
  htmlPreviewEle.innerHTML = cardPreview
  
  console.log(htmlPreviewEle, 'text content before')
  for (const key in cardVariables) {
    if(key != 'primaryActions' && key != 'contactLinks'){
      const value = cardVariables[key];
      if(dontFillImages && (key == "profile_pic" || key == "logo") && value.startsWith('data:image')){
        continue
      }
      if(value){
        const cardEle = htmlPreviewEle.querySelector(`#${key}`)
  
        console.log(cardEle, 'card ele')
        if(key == "profile_pic" || key == "logo"){
          cardEle.src = value
        } else if(cardEle) {
          cardEle.innerHTML = value
        }
      } 
      // cardPreview = cardPreview.replace(`{{${key}}}`, value);
      // console.log(`{{${key}}}`, "key", value, "value");
    }
  }
  
  if(cardVariables.primaryActions){
    for (const key in cardVariables.primaryActions) {
      const value = cardVariables.primaryActions[key];
      const cardEle = htmlPreviewEle.querySelector(`#${key}`)
      // console.log(cardEle, 'card ele')
      if(cardEle && value) cardEle.innerHTML = value
      if(cardEle && !value){
        const parentEle = htmlPreviewEle.querySelector(`#${key}`).parentElement;
        parentEle.style.display = "none";
      }
      // cardPreview = cardPreview.replace(`{{${key}}}`, value);
      // console.log(`{{${key}}}`, "key", value, "value");
    }
  }
  
  if(cardVariables.contactLinks){
    for (const key in cardVariables.contactLinks) {
      const value = cardVariables.contactLinks[key];
      const cardEle = htmlPreviewEle.querySelector(`#${key}`)
      if(cardEle && value){
        // console.log(cardEle, 'card ele')
        // cardEle.innerHTML = value
        cardEle.href = value
        cardEle.style.display = "block"
        // cardPreview = cardPreview.replace(`{{${key}}}`, value);
      }
      console.log(key, "key", value, "contact value");
    }
  }
  console.log(htmlPreviewEle.innerHTML, 'html preview ele')
  return htmlPreviewEle.innerHTML;
};

const UserSavedCard = () => {
  const { cardId, templateId } = useParams();
  console.log(useParams(), cardId, "params");
  const [headers, setHeaders] = useState({});
  const initialHtmlData = {
    first_name: "",
    last_name: "",
    // gender_pronouns: "",
    role: "",
    business_name: "",
    business_description: "",
    profile_pic: "",
    logo: "",
    primaryActions: {
      mobile: "",
      email: "",
      location: "",
      website: "",
      telegram: "",
    },
    contactLinks: {
      facebook_link: "",
      youtube_link: "",
      instagram_link: "",
      github_link: "",
      snapchat_link: "",
      twitter_link: "",
      linkedin_link: "",
      spotify_link: "",
    },
  };
  const [templateData, setTemplateData] = useState({});
  const [templateHtmlData, setTemplateHtmlData] = useState(initialHtmlData);
  const [primaryActionBtns, setPrimaryActionBtns] = useState([
    { id: 1, isVisible: true, name: "mobile", icon: Phone },
    { id: 2, isVisible: true, name: "email", icon: Mail },
    { id: 3, isVisible: true, name: "location", icon: MapPin },
    { id: 4, isVisible: true, name: "website", icon: TbWorldWww },
  ]);

  const [secondaryActionBtns, setSecondaryActionBtns] = useState([
    { id: 1, isVisible: true, name: "facebook_link", icon: FaFacebook, icon_color: "text-sky-600", color: "bg-sky-600", hover: "bg-sky-800", },
    { id: 2, isVisible: true, name: "youtube_link", icon: FaYoutube, icon_color: "text-red-700", color: "bg-red-700", hover: "bg-red-600", },
    { id: 3, isVisible: true, name: "instagram_link", icon: FaInstagram, icon_color: "text-purple-700", color: "bg-gradient-to-r from-purple-700 to-pink-500", hover: "to-pink-400 justify-start bg-gradient-to-r from-purple-700 to-pink-500", },
    { id: 4, isVisible: true, name: "github_link", icon: FaGithub, icon_color: "text-stone-600", color: "bg-stone-600", hover: "bg-stone-500", },
    { id: 5, isVisible: true, name: "snapchat_link", icon: FaSnapchat, icon_color: "text-yellow-500", color: "bg-yellow-500", hover: "bg-yellow-400", },
    { id: 6, isVisible: true, name: "twitter_link", icon: FaTwitter, icon_color: "text-sky-300", color: "bg-sky-300", hover: "bg-sky-200", },
    { id: 7, isVisible: true, name: "linkedin_link", icon: FaLinkedin, icon_color: "text-sky-900", color: "bg-sky-900", hover: "bg-blue-400", },
    { id: 8, isVisible: true, name: "spotify_link", icon: FaSpotify, icon_color: "text-green-500", color: "bg-green-500", hover: "bg-green-400", },
  ]);


  const contactFields = [
    { label: "First name", name: "first_name", placeholder: "First name", type: "text", },
    { label: "Last name", name: "last_name", placeholder: "Last name", type: "text", },
    { label: "Gender pronouns", name: "gender_pronouns", placeholder: "Gender pronouns", type: "text", },
    { label: "Role", name: "role", placeholder: "Role", type: "text" },
    { label: "Business name", name: "business_name", placeholder: "Business name", type: "text", },
    { label: "Business address", name: "business_address", placeholder: "Type your Business address.", type: "textarea", },
    { label: "Business description", name: "business_description", placeholder: "Type your Business description.", type: "textarea", },
  ];

  useEffect(() => {
    const templateCard = localStorage.getItem(`usercard_${cardId}`);
    // console.log(templateCard, 'template card')
    const storedToken = localStorage.getItem("jwtToken");
    console.log(storedToken, "stored token");
    if (!storedToken) {
      // If token is missing, log out the user
      navigate("/");
      return;
    }

    const checkTokenValidity = async () => {
      // Include the token in the headers for the request
      const authHeaders = {
        Authorization: `Bearer ${storedToken}`,
      };
      setHeaders(authHeaders);
      try {
        // Check token validity by making a request to a secure endpoint
        await axios.get("/api/login", { headers: authHeaders });
        cardId ? getMyData() : getTemplateData();
      } catch (error) {
        console.error("Error checking token validity:", error);
        // If there is an error (e.g., token is invalid), log out the user
        navigate("/");
      }
    };

    // Call the token validity check function
    checkTokenValidity();
  }, []);

  console.log("ttt :" + templateData);
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

  const getMyData = async () => {
    const storedToken = localStorage.getItem("jwtToken");
    console.log(storedToken, "stored token");
    if (!storedToken) {
      // If token is missing, log out the user
      navigate("/");
      return;
    }
    const authHeaders = {
      Authorization: `Bearer ${storedToken}`,
    };
    const res = await axios.get("/api/usercard/" + cardId, {
      headers: authHeaders,
    });
    console.log("got data");
    // res.data.oldHtmlPreview = res.data.htmlPreviewTemplate;
    // res.data.htmlPreview = await fillCardVariables(
    //   res.data.htmlPreview,
    //   res.data.htmlData
    // );
    // console.log(templateHtmlData, "template html data first fetch");
    // const tempData = res.data.htmlData;
    // setTimeout(() => {
    //   let cardPreview = res.data.htmlPreview.toString();
    //   if (tempData.primaryActions) {
    //     for (const key in tempData.primaryActions) {
    //       const value = tempData.primaryActions[key];
    //       cardPreview = cardPreview.replace(`{{${key}}}`, value);
    //       // const cardField = document.getElementById(key);
    //       // if(cardField) cardField.innerHTML = value;
    //       // console.log(key, "key", value, "value in primary");
    //     }
    //   }
    //   if (tempData.contactLinks) {
    //     for (const key in tempData.contactLinks) {
    //       const value = tempData.contactLinks[key];
    //       // const cardField = document.getElementById(key);
    //       // if(cardField) {
    //         console.log(key, "key", value, "value in contact");
    //         // cardField.innerHTML = value;
    //         const icon = document.getElementById(key);
    //         icon.style.display = value ? "block" : "none";
    //         const newHrefValue = value;
    //         icon.setAttribute("href", newHrefValue);
    //       // } 
    //     }
    //   }
    //   setTemplateData((prev) => ({...prev, htmlPreview: cardPreview}))
    // }, 200);
    setTemplateData(res.data);
    setTemplateHtmlData(res.data.htmlData);
    console.log("res.data -->"+res.data);
    localStorage.setItem(`usercard_${cardId}`, JSON.stringify(res.data));
  };
  console.log("templateHtmlData -->"+JSON.stringify(templateHtmlData));

  const getTemplateData = async () => {
    const res = await axios.get("/api/template/"+templateId)
    console.log('got data')
    res.data.oldHtmlPreview = res.data.htmlPreview
    res.data.htmlPreview = await fillCardVariables(res.data.htmlPreview, res.data.htmlData)
    console.log(res.data, 'res data')
    setTemplateData(res.data)
    localStorage.setItem(`template_${templateId}`, JSON.stringify(res.data))
  }


  const downloadTemplate = async ( htmlPreview ) => {
    const printEle = document.createElement('div')
    printEle.setAttribute('id', 'card-print-preview')
    printEle.innerHTML = htmlPreview
    document.body.appendChild(printEle)
    setTimeout(() => {
      window.print();
      printEle.remove()
    }, 500);
    // let pdfBlobOutput = await htmlStringToPdf(htmlPreview);

    // const divEle = document.createElement('div')
    // divEle.innerHTML = htmlPreview
    // // Capture the entire page
    // html2canvas(divEle).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png"); // Get data URL of the captured image

    //   const pdf = new jsPDF();

    //   // Add the captured image to the PDF
    //   pdf.addImage(imgData, "PNG", 10, 10, 180, 120);

    //   // Add icons and data to the PDF
    //   // pdf.text(
    //   //   `Name: ${contactData.first_name} ${contactData.last_name}`,
    //   //   20,
    //   //   20
    //   // );
    //   // Add more data as needed

    //   // Save the PDF
    //   pdf.save("template.pdf");
    // });



    // // Create a div element and set its inner HTML to your preview content
    // const divEle = document.createElement('div');
    // divEle.innerHTML = htmlPreview;
    // // divEle.style.opacity = 0.3
    // document.getElementsByTagName('body')[0].appendChild(divEle)
    // console.log(divEle, 'html preview')

    // // Measure the dimensions of the div element
    // const { width, height } = divEle.getBoundingClientRect();


    // // Capture the entire page using html2canvas
    // html2canvas(divEle, {
    //   scale: Math.min(width / divEle.offsetWidth, 200 / divEle.offsetHeight),
    //   width: width,
    //   height: 200
    // }).then((canvas) => {
    //     // Convert canvas to PNG image data URL
    //     const imgData = canvas.toDataURL("image/png");

    //     // // Initialize jsPDF with dynamic dimensions
    //     // const pdf = new jsPDF({
    //     //   unit: 'mm', // Use pixels for dimensions
    //     //   format: [width, height] // Set PDF size dynamically based on element dimensions
    //     // });

    //     // // Calculate dimensions to fit the PDF
    //     // const imgWidth = pdf.internal.pageSize.getWidth();
    //     // const imgHeight = canvas.height * imgWidth / canvas.width;

    //     // // Add image to PDF
    //     // pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    //     // // Save or display the PDF
    //     // pdf.save("business_card.pdf"); // Save PDF
    //     // divEle.remove()
    //     // // Alternatively, display the PDF in a new tab
    //     // // pdf.output('dataurlnewwindow');

    //     // Create an image element to hold the captured content
    //     const img = new Image();
    //     img.src = imgData;

    //     // Wait for the image to load
    //     img.onload = () => {
    //         // Create a new window to display the image
    //         const win = window.open();
    //         win.document.write('<html><head><title>Print Preview</title></head><body style="height:300px;"></body></html>');
    //         win.document.body.appendChild(img);

    //         // Print the window
    //         win.print();
    //     };
    //     divEle.remove()


    //   }).catch((err) => {
    //     console.log(err, 'err')
    //     divEle.remove()
    // });
  };

  const htmlStringToPdf = async (htmlString) => {
   
    // let iframe = document.createElement("iframe");
    // // iframe.style.visibility = "hidden";
    // document.body.appendChild(iframe);
    // iframe.setAttribute('id', 'business-card-print-ele')
    // let iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    // iframedoc.body.innerHTML = htmlString;

    // const { width, height } = iframe.getBoundingClientRect();
    
    // let canvas = await html2canvas(iframedoc.body, {});
    
    // // Convert the iframe into a PNG image using canvas.
    // let imgData = canvas.toDataURL("image/png");
  
    // // Create a PDF document and add the image as a page.
    // const doc = new jsPDF({
    //   format: "a4",
    //   unit: "mm",
    // });
    // doc.addImage(imgData, "PNG", 0, 0, 160,85);
    // doc.save("template.pdf");
  
    // // Get the file as blob output.
    // let blob = doc.output("blob");
  
    // // Remove the iframe from the document when the file is generated.
    // document.body.removeChild(iframe);
  };
  

  const pushData = async () => {
    // console.log(templateHtmlData, "templateHtmlData");
    const fd = new FormData();
    for (const fileObj in fileData) {
      console.log(fileObj, fileData[fileObj], "file Obj");
      if (fileData[fileObj]) {
        fd.append(fileObj, fileData[fileObj]);
      }
    }

    const dataToSend = templateData;
    dataToSend.htmlData = templateHtmlData;
    
    
    let apiMethod = "PUT"
    if(templateId){
      dataToSend.htmlPreviewTemplate = templateData.oldHtmlPreview; 
      apiMethod = "POST"
    } 
    dataToSend.htmlPreview = await fillCardVariables(
      dataToSend.htmlPreviewTemplate,
      dataToSend.htmlData,
      true
    );
    delete dataToSend.oldHtmlPreview
    console.log(dataToSend.htmlPreview, 'html preview')
    console.log(dataToSend.htmlPreviewTemplate, 'old html preview')
    console.log(dataToSend.htmlData, "dataToSend htmlData");
    fd.append("userTemplateData", JSON.stringify(dataToSend));
    // dataToSend
    // throw new Error()
    // .put("/api/usercards", fd, {
    //   headers: { ...headers, "Content-Type": "multipart/form-data" },
    // })
    axios({
      method: apiMethod,
      url: "/api/usercards",
      data: fd,
      headers: {...headers, "Content-Type": "multipart/form-data"}
    })
      .then((response) => {
        // Check if the response contains data
        if (response.data) {
          console.log("Data added successfully");
          console.log(response.data);
          if(templateId){
            getTemplateData()
          } else {
            getMyData();
          }
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

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(
    //   templateHtmlData,
    //   'templateHtmlData["primaryActions"]',
    //   name in templateHtmlData.contactLinks
    // );
    console.log("name :"+name);
    console.log("value :"+value);
    const cardField = document.getElementById(name);
    console.log("cardField :"+cardField);

    if (name in templateHtmlData) {
      // setTemplateHtmlData((prev) => ({...prev, [name]: value}))
      templateHtmlData[name] = value;
      cardField.innerHTML = value;
    } else if (name in templateHtmlData.primaryActions) {
      templateHtmlData.primaryActions[name] = value;
      cardField.innerHTML = value;
      const parentEle = document.getElementById(name).parentElement;
      parentEle.style.display = value ? "flex" : "none";
      // setTemplateHtmlData(templateHtmlData)
    } else if (name in templateHtmlData.contactLinks) {
      templateHtmlData.contactLinks[name] = value;
      const icon = document.getElementById(name);
      icon.style.display = value ? "block" : "none";
      const newHrefValue = value;
      icon.setAttribute("href", newHrefValue);
    }
    setTemplateHtmlData((prev) => ({ ...prev, ...templateHtmlData }));
  };

  const handleButtonClick = (buttonKey, isPrimary) => {
    console.log(buttonKey, 'button key')
    if (isPrimary) {
      const updatedPrimaryButtons = primaryActionBtns.map((button) => {
        templateHtmlData[buttonKey] = "Enter You Value"
        setTemplateHtmlData(templateHtmlData)
        return button.name === buttonKey ? { ...button, isVisible: false } : button
      }
        
      );
      setPrimaryActionBtns(updatedPrimaryButtons);
    } else {
      const updatedSecondaryButtons = secondaryActionBtns.map((button) =>
        button.name === buttonKey ? { ...button, isVisible: false } : button
      );
      setSecondaryActionBtns(updatedSecondaryButtons);
    }
  };


  const [fileData, setFileData] = useState({});

  const handleUploadChange = (event) => {
    // Handle the file selection and update the state
    console.log("Upload File Name: " + event.target.name);
    const file = event.target.files[0];
    setFileData((prev) => ({ ...prev, [event.target.name]: file }));
    console.log(fileData, "fileData");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const dataURL = reader.result;
      const updloadEle = document.getElementById(event.target.name);

      setTemplateHtmlData((prev) => ({
        ...prev,
        [event.target.name]: dataURL,
      }));

      updloadEle.src = dataURL;
      console.log("dataurl :" + dataURL);
    };
  };


  const handleRemoveImage = () => {
    // Remove the selected image
    setSelectedImage(null);
    // Clear the file input value to allow selecting the same file again
    const fileInput = document.getElementById("picture");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete the JWT token from local storage
    localStorage.removeItem("jwtToken");

    navigate("/");

    // You may also want to redirect the user to the login page or perform other logout-related actions
    console.log("Logout button clicked");
  };

  function formatPhone(phone) {
    if (!phone) return '';
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (phoneNumber) {
      return phoneNumber.formatInternational();
    }
    return phone;
  }

  return (
    <div className=" bg-slate-900">
      <Navbar Button={Button} />
      <div className="app flex w-[100%] px-20 space-x-16 h-full ">
        <div className="left w-[40%] flex flex-col  items-center">
          <UserInput
            Label={Label}
            Input={Input}
            Textarea={Textarea}
            handleInput={handleInput}
            contactFields={contactFields}
            handleUploadChange={handleUploadChange}
            card={templateData}
            htmlData={templateHtmlData}
          />

          <PrimaryActions
            Button={Button}
            Input={Input}
            handleButtonClick={handleButtonClick}
            handleInput={handleInput}
            primaryActionBtns={primaryActionBtns}
            htmlData={templateHtmlData}
          />

          <SecondaryActions
            Button={Button}
            Input={Input}
            handleButtonClick={handleButtonClick}
            handleInput={handleInput}
            secondaryActionBtns={secondaryActionBtns}
            card={templateData}
            htmlData={templateHtmlData}
          />
        </div>

        <div className="right  bg-gray-900 w-[55%]  h-fit flex justify-center my-8 rounded-3xl fixed right-4">
          <div className=" space-y-10">
            {templateData && (
              <div
                dangerouslySetInnerHTML={{ __html: templateData.htmlPreview }}
              />
            )}

            <div className="flex justify-center">
              <Button
                className="h-10 w-40 bg-emerald-800 hover:bg-emerald-600 font-montserrat mr-3"
                onClick={() => pushData()}
              >
                Save
              </Button>
              <Button
                className="h-10 w-40 bg-emerald-800 hover:bg-emerald-600 font-montserrat"
                onClick={() => downloadTemplate(templateData.htmlPreview)}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSavedCard;
