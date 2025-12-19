import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

const Connections = () => {

const dispatch = useDispatch();
const connections = useSelector((store)=>store.connections.connections)

const fetchConnections = async () => {
   try {
    const res = await axios.get(`${API_BASE_URL}/api/users/connections`,{withCredentials:true});
    console.log(res.data.connections); 
    dispatch(addConnections(res.data.connections));
   } catch (error) {
    console.log(error);
   } 
}

useEffect(()=>{
    fetchConnections()
}
,[])

if(!connections) return;
if(connections.length == 0) return <h1>No Connections Found</h1>

  return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-white text-3xl'>Connections</h1>
        {connections.map((connection) => {
        const {_id,firstname,lastname,photoURL,age,gender,about,} = connection

            return (
                <div key={_id} className='flex m-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto'>
                     <div className=''><img alt="photo" className='w-20 h-20 rounded-full' src={photoURL}/>
                     </div>
                     <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstname+" "+lastname}</h2>
                    <h2>{age+" , "+gender}</h2>
                    <p>{about}</p>
                    </div>
                    
                </div>
            )
        })}
        </div>
  )
}

export default Connections