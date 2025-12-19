import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const dispatch = useDispatch();
   if (!user) return null;
    const {_id,firstname,lastname,photoURL,age,gender,about} = user;
    
    
    const handleSendRequest = async (status,userId)=>{
     try {
      const res = await axios.patch("http://localhost:5000/api/users/request/sent/"+ status+ "/" + userId,{},{ withCredentials: true });
      console.log(res);
      dispatch(removeUserFromFeed(userId))
     } catch (error) {
      console.log(error);
     }
    }
    
  return (
  <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoURL}
      alt="user image"
      />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstname+" "+lastname}</h2>
    {age && gender && <p>{age+", "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=> handleSendRequest("rejected",_id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard