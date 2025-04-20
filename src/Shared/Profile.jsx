import { useState } from "react";
import useUser from "../Hooks/useUser";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [users] = useUser();
  const userData = users || {}; 


console.log(users)
  return (
    <div className="p-6  bg-gray-100 rounded-lg shadow-md md:w-1/2 mx-auto text-center">
      <div className=" items-center mb-4">
        <div>
          <img
            src={userData.photo}
            alt="Avatar"
            className="w-36 h-36 mx-auto object-cover rounded-full"
          />
        </div>
      </div>

      <div className="">
        <div>
          <p className="font-bold">Name:</p>
          <p>{userData.name || "N/A"}</p>
        </div>
        <div>
          <p className="font-bold">Email:</p>
          <p>{userData.email || "N/A"}</p>
        </div>
     </div>
    </div>
  );
};

export default Profile;
