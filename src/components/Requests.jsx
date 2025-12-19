import axios from 'axios';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
const requests = useSelector((store) => store.requests.requests);
const dispatch = useDispatch();

const reviewRequest = async (status,_id) => {
    try {
       const res = axios.patch("http://localhost:5000/api/users/review/request/"+status+ "/" +_id,{},{withCredentials:true});
       console.log(res);
       dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);      
    }
}

const fetchRequest = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/users/request/received",{withCredentials:true})
            dispatch(addRequests(res.data.receivedRequests))
            console.log(res.data);
            
        } catch (error) {
            console.log(error);      
        }
    }

useEffect(()=>{
    fetchRequest()
},[])

if(!requests) return;
if(requests.length == 0) return <h1 className='flex justify-center my-10 text-xl'>No Connections Found</h1>

  return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-white text-3xl'>Connection Requests</h1>
        {requests.map((request) => {
        const {_id,firstname,lastname,photoURL,age,gender,about,} = request

            return (
                <div key={_id} className='flex justify-between items-center m-4 p-4 border rounded-lg bg-base-200 w-2/3 mx-auto'>
                     <div className=''><img alt="photo" className='w-20 h-20 rounded-full' src={photoURL}/>
                     </div>
                     <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstname+" "+lastname}</h2>
                    {age && gender && <h2>{age+" , "+gender}</h2>}
                    <p>{about}</p>
                    </div>
                    <div>
                    <button className="btn btn-primary mx-2" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                    <button className="btn btn-secondary mx-2" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                    </div>
                    
                </div>
            )
        })}
        </div>
    
  )
}

export default Requests;