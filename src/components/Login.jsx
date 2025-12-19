import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error,setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
  
      console.log("Login Success:", res.data);
      dispatch(addUser(res.data.user));
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };
  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        {
          firstname,
          lastname,
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
  
      console.log(res.data);
      // If backend returns { user: {...}, message: "..." }
      dispatch(addUser(res.data.user));
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };
  
  

  return (
    <div className='flex justify-center my-10'>
    <div className="card w-96 bg-base-300 card-lg shadow-sm">
    <div className="card-body">
      <h2 className="card-title justify-center">{isLoginForm? "Login" : "Sign Up"}</h2>
      <div>
      {!isLoginForm && <><fieldset className="fieldset">
      <legend className="fieldset-legend label">First Name</legend>
      <input type="firstname" value={firstname} className="input" 
      onChange={(e)=> setFirstName(e.target.value)}/>
      </fieldset>
      <fieldset className="fieldset ">
      <legend className="fieldset-legend label">Last Name</legend>
      <input type="lastname" value={lastname} className="input" 
      onChange={(e)=> setLastName(e.target.value)}/>
      </fieldset></>}
      <fieldset className="fieldset">
      <legend className="fieldset-legend label">Email Id</legend>
      <input type="email" value={emailId} className="input" 
      onChange={(e)=> setEmailId(e.target.value)}/>
      </fieldset>
      <fieldset className="fieldset ">
      <legend className="fieldset-legend label">Password</legend>
      <input type="password" value={password} className="input" 
      onChange={(e)=> setPassword(e.target.value)}  />
      </fieldset>
      </div>
      <p className="text-red-500">{error}</p>
      <div className="mx-30 m-2 justify-center card-actions">
      <button className="btn btn-primary justify-center" onClick={isLoginForm? handleLogin: handleSignUp} >{isLoginForm? "Login" : "Sign Up"}</button>
      </div>
      <p className="cursor-pointer m-auto hover:underline transition " onClick={()=>setIsLoginForm((value)=> !value)}>{isLoginForm? "New User? SignUp Here" : "Existing User? Login Here"}</p>
    </div>
  </div>
  </div>
  )
}

export default Login;
