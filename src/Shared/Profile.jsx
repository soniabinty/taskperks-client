import { useState } from "react";
import useUser from "../Hooks/useUser";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [users] = useUser();
  const userData = users || {}; 


console.log(users)
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <img
            src={userData.photo}
            alt="Avatar"
            className="w-36 h-36 object-cover rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
