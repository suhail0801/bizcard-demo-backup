
import React, { useState } from 'react';
import logo from './Card_Template/card1/visitdesk_logo-removebg-preview.png';
// import card from './Card_Template/card1/card.jpeg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react'
import Navbar from './Project_Components/Navbar';
import { Button } from '../components/button';

const UserSavedCardList = () => {

    const navigate = useNavigate();
    const [userCardList, setUserCardList] = useState([])

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
                const response = await axios.get("/api/usercards", { headers });

                setUserCardList(response.data);
                // localStorage.setItem("card_templates",JSON.stringify(response.data))
                // console.log(templateData);
            } catch (error) {
                console.error('Error checking token validity:', error);
                // If there is an error (e.g., token is invalid), log out the user
                navigate('/');
            }
        };

        // Call the token validity check function
        checkTokenValidity();
    }, []);


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

    const handleCardSelection = (id) => {
        navigate(`/mycard/${id}`);
    };

    return (
        // <div className='flex flex-col bg-white h-[100vh] max-w-[100vw]'>
        <div className='flex flex-col  h-[100vh] max-w-[100vw]' >

            <Navbar Button={Button} />   

            <div className="content text-white flex-1 bg-gray-900  ">
                <div>
                    <h1 className="font-black text-[22px] tracking-[-3%] text-white font-montserrat min-h-[27px] text-left p-3">SELECT YOUR CARD TEMPLATE</h1>
                </div>

                <div className='grid place-items-center my-10'>
                    <div className="cards grid grid-cols-2 grid-rows-2 gap-6 max-w-fit"> 
                        {userCardList.map((data, key) => {
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

export default UserSavedCardList;
