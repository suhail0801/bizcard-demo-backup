// import React from 'react'
// import Navbar from './react_components/Project_Components/Navbar'
// import { Button } from './components/button'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import { useEffect } from 'react'
// function Display  () {


  
//   return (
//     <div>
//       <Navbar
//         Button={Button}
//         /> 
//         <div className='bg-gray-800 h-screen  '> 
//         <div className='text-white ml-5 font-bold'>
//           PREVIOUS GENERATED CARDS
//         </div>
        

    
//                     </div>
//            </div>
      
//   )
// }

// export default Display
// import React, { useState, useEffect } from 'react';
// import Navbar from './react_components/Project_Components/Navbar';
// import axios from 'axios';
// import { Button } from './components/button';

// function Display() {
//   const [userCards, setUserCards] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     // Fetch user cards from the backend
//     const fetchUserCards = async () => {
//       try {
//         // Replace 'YOUR_BACKEND_ENDPOINT' with the actual endpoint for user cards
//         const response = await axios.get('http://localhost:3001/userscards', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJBaG1lZEBnbWFpbC5jb20iLCJpYXQiOjE3MDYxNjg3OTN9.dcszF7Dq07QhwPllp6g8hvo6WeiAbhb-jnd2dxON8CU')}`, // Add the user's authentication token
//           },
//         });

//         setUserCards(response.data.userCards);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user cards:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserCards();
//   }, []); // Run once when the component mounts

//   return (
//     <div>
//       <Navbar Button={Button} />

//       <div className='bg-gray-800 h-screen'>
//         <div className='text-white ml-5 font-bold'>
//           PREVIOUS GENERATED CARDS
//         </div>

//         {/* Display user cards or loading message */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : userCards && userCards.length > 0 ? (
//           userCards.map((card) => (
//             <div key={card.id}>
//               {/* Display individual card data */}
//               <p>{card.name}</p>
//               {/* Add other card properties as needed */}
//             </div>
//           ))
//         ) : (
//           <p>No cards found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Display;





// import React, { useState, useEffect } from 'react';
// import Navbar from './react_components/Project_Components/Navbar';
// import axios from 'axios';
// import { Button } from './components/button';

// function Display() {
//   const [userCards, setUserCards] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   useEffect(() => {
//     // Fetch user cards from the backend
//     const fetchUserCards = async () => {
//       try {
//         const authToken = localStorage.getItem('YOUR_AUTH_TOKEN');
        
//         const response = await axios.get('http://localhost:3001/usercards', {
//           headers: {
//             Authorization: `Bearer ${authToken}`, // Add the user's authentication token
//           },
//         });

//         setUserCards(response.data.userCards);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user cards:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserCards();
//   }, []); // Run once when the component mounts

//   return (
//     <div>
//       <Navbar Button={Button} />

//       <div className='bg-gray-800 h-screen'>
//         <div className='text-white ml-5 font-bold'>
//           PREVIOUS GENERATED CARDS
//         </div>

//         {/* Display user cards or loading message */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : userCards && userCards.length > 0 ? (
//           userCards.map((card) => (
//             <div key={card.id}>
//               {/* Display individual card data */}
//               <p>{card.name}</p>
//               {/* Add other card properties as needed */}
//             </div>
//           ))
//         ) : (
//           <p>No cards found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Display;





import React from 'react'
import Navbar from './react_components/Project_Components/Navbar'
import { Button } from './components/button'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react'



function Display() {
  // const [userCards, setUserCards] = useState([]);
  // const [loading, setLoading] = useState(true);
  
  // useEffect(() => {
  //   // Fetch user cards from the backend
  //   const fetchUserCards = async () => {
  //     try {
  //       const authToken = localStorage.getItem('YOUR_AUTH_TOKEN');
        
  //       const response = await axios.get('http://localhost:3001/usercards', {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`, // Add the user's authentication token
  //         },
  //       });

  //       setUserCards(response.data.userCards);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching user cards:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserCards();
  // }, []); // Run once when the component mounts

  return (
  <div className='bg-slate-900 h-screen'>
    <Navbar></Navbar>
  </div>
  );
}

export default Display;