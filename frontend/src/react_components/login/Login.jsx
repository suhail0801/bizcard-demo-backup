import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import visitdeskbg from "./images/visit_desk_bg.png"

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });

    if (!response.ok) {
        console.log("error")
    } 

    if (response.status == 200) {
      navigate("/dashboard");
    }
    // const res = await response.json();
    // return res.auth

    // if (res.auth) navigate("/build");
    
}

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    if (!errors.email && !errors.password) {
      axios.post("/api/login", values)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("jwtToken", res.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
            navigate("/dashboard");
          } else {
            alert("Authentication failed. No token received.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Login failed. Check the credentials.");
        });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className='flex flex-col justify-center items-center h-[100vh] space-y-5 bg-slate-200 w-[100vw] rounded-md' style={{
      backgroundImage: `url(${visitdeskbg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',      
    }}>
      <div className="w-[550px] p-6 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img className="mx-auto h-10 w-auto" src={"https://onfra.io/wp-content/uploads/2024/05/onfra-logo.png"} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="">
              {/* <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label> */}
              <div className="mt-2 flex flex-col space-y-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  onChange={handleInput}
                  className={`py-3.5 text-sm text-center shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat rounded-lg ${errors.email ? 'ring-red-300' : 'ring-gray-300'} `}
                />
                {errors.email && <span className="text-red-600 text-[10px]">{errors.email}</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                {/* <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label> */}
                <div className="text-sm">
                  <a href="#" className="font-semibold text-green-400 hover:text-green-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex flex-col space-y-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  onChange={handleInput}
                  className={`py-3.5 text-sm text-center shadow-xl bg-white text-black border-green-400 focus:border-green-400 hover:border-green-400 font-montserrat rounded-lg ${errors.password ? 'ring-red-300' : 'ring-gray-300'} `}
                />
                {errors.password && <span className="text-red-600 text-[10px]">{errors.password}</span>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-11 bg-visit_desk_green hover:bg-green-500 font-montserrat hover:-translate-y-1 transition-all hover:shadow-xl rounded-lg mt-5"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-green-400 hover:text-green-500">
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
      
    </div>

  );
};

export default Login;
