import React, { useState } from 'react';
import logo from './Card_Template/card1/visitdesk_logo-removebg-preview.png';
// import card from './Card_Template/card1/card.jpeg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from './Project_Components/Navbar';
import { Button } from '../components/button';

const HomePage = () => {

    const [allTemplates, setAllTemplates] = useState([])
    // const [tokenChanged, setTokenChanged] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("http://localhost:3001/template").then((response) => {
    //         setAllTemplates(response.data)
    //     })
    // }, [])


    // useEffect(() => {
    //     const storedToken = localStorage.getItem('jwtToken');

    //     // Include the token in the headers for the request
    //     const headers = {
    //         Authorization: `Bearer ${storedToken}`
    //     };

    //     axios.get("http://localhost:3001/template", { headers })
    //         .then((response) => {
    //             setAllTemplates(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching templates:', error);
    //             // Handle the error as needed
    //         });
    // }, []);
   
    useEffect(() => {
        const checkTokenValidity = async () => {
            const storedToken = localStorage.getItem('jwtToken');

            if (!storedToken) {
                // If token is missing, log out the user
                navigate('/');
                return;
            }

            // Include the token in the headers for the request
            const headers = {
                Authorization: `Bearer ${storedToken}`
            };

            try {
                // Check token validity by making a request to a secure endpoint
                await axios.get("/api/login", { headers });
                // If the request is successful, proceed to fetch templates
                // const response = await axios.get("http://localhost:3001/template");
                const response = await axios.get("/api/template");
                setAllTemplates(response.data);
                localStorage.setItem("card_templates",JSON.stringify(response.data))
                // console.log(allTemplates);
            } catch (error) {
                console.error('Error checking token validity:', error);
                // If there is an error (e.g., token is invalid), log out the user
                navigate('/');
            }
        };

        // Call the token validity check function
        checkTokenValidity();
    }, []);

    // Effect to monitor changes in the JWT token
    // useEffect(() => {
    //     const handleStorageChange = (event) => {
    //         // Check if the change in storage is related to 'jwtToken'
    //         if (event.key === 'jwtToken') {
    //             // If token is removed or changed, set tokenChanged to trigger rechecking validity
    //             setTokenChanged((prev) => !prev);
    //         }
    //     };

    //     // Attach event listener for changes in localStorage
    //     window.addEventListener('storage', handleStorageChange);

    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, []);
    useEffect(() => {
        const handleStorageChange = (event) => {
            // Check if the change in storage is related to 'jwtToken'
            if (event.key === 'jwtToken') {
                // If token is removed or changed, delete the token
                localStorage.removeItem('jwtToken');
                // Additionally, you might want to perform other actions, like logging out the user
                navigate('/');
            }
        };
    
        // Attach event listener for changes in localStorage
        window.addEventListener('storage', handleStorageChange);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const [selectedCard, setSelectedCard] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/cretedCards', {
    //         headers: {
    //         authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    //         }
    //     })
    //     .then(res => {
    //         console.log("protected");
    //         console.log(res.data);
    //     });
        
    // }, [])
 

    const cardsData = [
        {
            card1: ["card1", "role", "business_name", "business_description", "mobile", "location", "email", "website", "facebook", "youtube", "instagram", "github", "snapchat", "twitter", "linkedin", "spotify", true],
            card2: ["card2", "role", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin", true],
            card3: ["card3", "role", "business_name", "mobile", "location", "email", "website", "facebook", "instagram", "twitter", "linkedin", true],
            card4: ["card4", "role", "business_name", "business_description", "mobile", "location", "email", "website", "facebook", "youtube", "instagram", "github", "snapchat", "twitter", "linkedin", "spotify", false],

        }
    ];



    const handleCardSelection = (id) => {

        navigate(`/be/${id}`);

    };
    // console.log("th :"+allTemplates);

    const fillCardVariables = (cardPreview, cardVariables) => {
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
        // If user is already logged in, redirect to /dashboard
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        // <div className='flex flex-col bg-white h-[100vh] max-w-[100vw]'>
        <div className='flex flex-col  h-[100vh] max-w-[100vw]' >

            <Navbar Button={Button} />   
            {/* <div className="content text-white flex-1  "style={{ backgroundImage: `url(${hh})`, backgroundSize: 'cover' }}> */}
            <div className="content text-white flex-1 bg-gray-900  ">
                <div>
                    <h1 className="font-black text-[22px] tracking-[-3%] text-white font-montserrat min-h-[27px] text-left p-3">SELECT YOUR CARD TEMPLATE</h1>
                </div>

                <div className='grid place-items-center my-10'>
                    <div className="cards grid grid-cols-2 grid-rows-2 gap-6 max-w-fit">
                        
                       
                        {allTemplates.map((data, key) => {
                            data.htmlPreview = data.htmlPreview ? fillCardVariables(data.htmlPreview, null) : data.htmlPreview
                            // console.log(data.htmlPreview, 'data html preview')
                            return (
                                <div key={key}  className="card3 transform transition-transform hover:scale-105 ">
                                    <div dangerouslySetInnerHTML={{ __html: data.htmlPreview }} className=' rounded-lg '  onClick={() => handleCardSelection(data.id)} />
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default HomePage;
