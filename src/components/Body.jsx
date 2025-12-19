import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector((store) =>store.users)

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile",
        {withCredentials: true,})
      dispatch(addUser(res.data))
    } catch (error) {
      if(error.status ==401){
        Navigate("/login")
      }
      
      console.log(error);
      
    }
  }

  useEffect(()=>{
      fetchUser();
  },[])

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body