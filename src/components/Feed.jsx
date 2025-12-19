import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './userCard'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

const Feed = () => {
  
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  
const getFeed = async() =>{
  
 //if(feed) return; 

 try {
   const res = await axios.get(`${API_BASE_URL}/api/users/feed`,{withCredentials:true});
     dispatch(addFeed(res?.data?.users))
     console.log(res.data.users);
     
 } catch (error) {
  console.log(error)
 }
}

useEffect(()=>{
  getFeed();
},[])

if(!feed) return;

if (feed.length === 0) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-gray-300 mb-3 animate-fadeIn">
        No New Users Found!
      </h1>
      <p className="text-gray-200 text-lg animate-fadeIn">
        Check back later 👀
      </p>
    </div>
  );
}

  return( 
  feed && (<div className="flex justify-center my-10">< UserCard user={feed[0]}/></div> ))
}

export default Feed;