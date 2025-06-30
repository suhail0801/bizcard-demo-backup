import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import { toast } from 'react-toastify';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/card";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import visitdeskbg from "./images/visit_desk_bg.png"


const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    reEnterPassword: '', // New field for re-entering password
  });

  useEffect(() => {
    validateToken()
  }, []);

  async function validateToken() {

    const url = `/api/validate`;

    const storedToken = localStorage.getItem('jwtToken');

//     // Include the token in the headers for the request
    const headers = {
        Authorization: `Bearer ${storedToken}`
    };
    let res
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });

    res = await response.json();
    // return res.auth

    if(res.auth) navigate("/build");

    } catch (err) {
      console.log(err)
      // if(!err.auth)
    }
    
    // console.log(data);
}


  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Always validate and use the result immediately
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some((err) => err && err.length > 0);
    if (hasErrors) return;

    axios.post('/api/user/register', {
      fullName: values.username,
      email: values.email,
      password: values.password
    })
      .then((res) => {
        if (res.data && res.data.message && res.data.message.toLowerCase().includes('thanks')) {
          setErrors({});
          toast.success('Account created! Please log in.', { position: 'top-center' });
          setTimeout(() => navigate('/login'), 1200);
        } else if (res.data && res.data.message) {
          toast.error(res.data.message, { position: 'top-center' });
        } else {
          toast.error('Signup failed. Please try again.', { position: 'top-center' });
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.response?.data?.error || 'Signup failed. Please try again.';
        toast.error(msg, { position: 'top-center' });
      });
  };

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] space-y-5 bg-slate-200 w-[100vw] rounded-md' style={{
      backgroundImage: `url(${visitdeskbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',      
    }}>
      <div>
        <img src={"https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png"} alt="logo" className=" h-12 "/>
      </div>
      <Card className="w-[550px] p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl">
        <CardHeader>
          <CardTitle className=" text-center font-montserrat">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* <Label className='font-montserrat' htmlFor="fullName">Full Name</Label> */}
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter Full Name"
                  type="text"
                  onChange={handleInput}
                  className='text-center shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat rounded-lg '
                />
                {errors.username && <span className='text-red-700 text-[10px]'>{errors.username}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label className='font-montserrat' htmlFor="email">Email</Label> */}
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  onChange={handleInput}
                  className='text-center shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat rounded-lg'
                />
                {errors.email && <span className=' font-montserrat text-red-700 text-[10px]'>{errors.email}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label className='font-montserrat' htmlFor="password">Password</Label> */}
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  onChange={handleInput}
                  className='text-center rounded-lg shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat'
                />
                {errors.password && <span className='text-red-700  font-montserrat text-[10px]'>{errors.password}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label className='font-montserrat' htmlFor="reEnterPassword">Re-enter Password</Label> */}
                <Input
                  id="reEnterPassword"
                  name="reEnterPassword"
                  placeholder="Re-enter Password"
                  type="password"
                  onChange={handleInput}
                  className='text-center rounded-lg  shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat'
                />
                {errors.reEnterPassword && <span className='font-montserrat text-red-700 text-[10px]'>{errors.reEnterPassword}</span>}
              </div>
              <div className="flex flex-col space-y-2.5 mt-6">
                <Button className="w-full h-11 bg-visit_desk_green hover:bg-green-500 font-montserrat hover:-translate-y-1 transition-all hover:shadow-xl" type="submit">
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <div className='font-montserrat'>
            Already have an account? <Link to='http://localhost:5173/login' className=' font-montserrat underline font-semibold text-green-500'>Sign in</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
