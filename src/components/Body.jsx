import { Outlet, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // assuming user slice is state.user, not state.users
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      // axios puts status on error.response.status
      if (error?.response?.status === 401) {
        navigate("/login", { replace: true });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If not logged in and fetch failed, just show nothing until redirect
  if (!userData) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
