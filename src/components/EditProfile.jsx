import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

const EditProfile = () => {
  const user = useSelector((state) => state.user);

  // If user is not loaded yet (first render after refresh), avoid errors
  const [firstname, setFirstName] = useState(user?.firstname || "");
  const [lastname, setLastName] = useState(user?.lastname || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/users/update-profile`,
        { firstname, lastname, photoURL, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      console.log("RAW RESPONSE:", res);
      console.log("DATA:", res.data);
      console.log("USER:", res.data.user);

      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } catch (error) {
      setError(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  // ...keep the JSX exactly as you already wrote...

    
    
    return ( 
       <> <div className="flex justify-center my-10">
    <div className='flex justify-center mx-10'>
    <div className="card w-96 bg-base-300 card-lg shadow-sm">
    <div className="card-body">
      <h2 className="card-title justify-center">Edit Profile</h2>
      <div>
      <fieldset className="fieldset">
      <legend className="fieldset-legend label">First Name:</legend>
      <input type="firstname" value={firstname} className="input" 
      onChange={(e)=> setFirstName(e.target.value)}/>
      </fieldset>
      <fieldset className="fieldset ">
      <legend className="fieldset-legend label">Last Name:</legend>
      <input type="lastname" value={lastname} className="input" 
      onChange={(e)=> setLastName(e.target.value)}  />
      </fieldset>
      <fieldset className="fieldset">
      <legend className="fieldset-legend label">PhotoURL:</legend>
      <input type="PhotoURL" value={photoURL} className="input" 
      onChange={(e)=> setPhotoURL(e.target.value)}  />
      </fieldset>
      <fieldset className="fieldset ">
      <legend className="fieldset-legend label">Age:</legend>
      <input type="age" value={age} className="input" 
      onChange={(e)=> setAge(e.target.value)}  />
      </fieldset>
      <fieldset className="fieldset">
  <legend className="fieldset-legend label">Gender:</legend>

  <select
    className="select select-bordered w-full"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="" disabled>Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</fieldset>

      <fieldset className="fieldset">
     <legend className="fieldset-legend">About:</legend>
     <textarea type="About" className="textarea h-24" value={about} onChange={(e)=> setAbout(e.target.value)}></textarea>
     </fieldset>
      </div>
      <p className="text-red-500">{error}</p>
      <div className="mx-30 m-2 justify-center card-actions">
        <button className="btn btn-primary justify-center" onClick={saveProfile}>Save Profile</button>
      </div>
    </div>
  </div>
  </div>
  <UserCard user={{firstname,lastname,photoURL,age,gender,about}}/>
  </div>
  {message && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>)}
  </>
    )
};

export default EditProfile;