// import React from 'react';
// import { Button } from '../../components/button';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Display from '../../Display';
// import { Card } from '../../components/card';
// import { NavigationMenuLink } from '../../components/navigation';
// import { NavigationMenuItem } from '../../components/navigation';

// function Navbar({Button}) {
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     // Delete the JWT token from local storage
//     localStorage.removeItem('jwtToken');

//   navigate('/');

//     // You may also want to redirect the user to the login page or perform other logout-related actions
//     console.log('Logout button clicked');
//   };
//   const handleprevious = () => {
//   navigate('/Display');
//     console.log('previous');
//   };

//   const handlehomepage = () => {
//     navigate('/hp');
//       console.log('homepage');
//     };
  

//   return (
//     <div>
//       <nav>
//         <Card className='w-full bg-white flex justify-end'>
        
//         <div onClick={handlehomepage} className=' m-3 font-extrabold text-xl text-black absolute left-0 ' style={{ fontFamily: 'Roboto, sans-serif' }}>BUSINESS CARD</div>
//         <Button variant="ghost" onClick={handlehomepage} className=' m-3 font-bold text-black'>Homepage</Button>
//         <Button variant="ghost" onClick={handleprevious} className=' m-3 font-bold text-black'>Projects</Button>
//         <Button variant="destructive" onClick={handleLogout} className=' m-3 mr-4 font-bold text-black'>Logout</Button>
        
        
//         </Card>

//       </nav>
//     </div>
//   );
// }

// export default Navbar;


import React from 'react';
import { Button } from '../../components/button';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Display from '../../Display';
import { Card } from '../../components/card';
import { NavigationMenuLink } from '../../components/navigation';
import { NavigationMenuItem } from '../../components/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup
} from '../../components/Dropdownmenu';

function Navbar({Button}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Delete the JWT token from local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('card_templates');


  navigate('/');

    // You may also want to redirect the user to the login page or perform other logout-related actions
    console.log('Logout button clicked');
  };
  const handleprevious = (route) => {
  navigate('/Display');
    console.log('previous');
  };

  const handleNavigate = (event) => {
    console.log(event, 'event')
    const route = event.target.id
    console.log('route', route);
    navigate(`/${route}`);
  };
  const [position, setPosition] = useState("top");
  

  return (
    <div>
      <div className='bg-slate-900'>

        <DropdownMenu className=''>
            <DropdownMenuTrigger asChild>
              <Avatar className=''>
                <AvatarImage src="https://github.com/shadcn.png" className=' absolute right-3 rounded-full' style={{top:'20px',height:'40px',}}/>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900 text-white"style={{position:'absolute',left:'1160px',top:'50px'}}>
              <DropdownMenuLabel  className='font-montserrat'>My profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top" id='hp' onClick={handleNavigate}  className='font-montserrat'>Homepage</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="middle" id='mycards' onClick={handleNavigate}  className='font-montserrat'>My Saved Cards</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom" onClick={handleLogout}  className='font-montserrat'>Logout</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
  
      </div>
    </div>
  );
}

export default Navbar;