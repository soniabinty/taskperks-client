import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TimeAgo from "../../Shared/TimeAgo"; 
import { Link } from "react-router-dom";
import { CiStopwatch } from "react-icons/ci";
import { GoPersonAdd } from "react-icons/go";

const NewRelease = () => {
  const axiosPublic = useAxiosPublic();
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    axiosPublic.get("/new").then((res) => {
      const formattedData = res.data.map((item) => ({
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt) : null, 
      }));
      setNewRelease(formattedData);
    });
  }, []);

  return (
    <div className="p-12">
             <h2 className="text-4xl font-semibold text-center mb-8">New Works Release</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mx-12">
        {newRelease
          .filter((newR) => newR.workers > 0)
          .map((newR) => (
            <div
              key={newR._id}
              className="bg-white rounded-lg shadow-lg border flex flex-col border-gray-200 hover:shadow-xl transition duration-300"
            >
              <img className="w-full h-[180px]" src={newR.image} alt="" />

              {/* Content Container */}
              <div className="p-2 flex flex-col grow">
                <h2 className="text-xl font-semibold text-[#014c57] mb-2">
                  {newR.title}
                </h2>

                {/* Time and Icon */}
                <div className="mb-2">
                  <p className="flex items-center gap-1">
                    <CiStopwatch className="text-2xl" />
                    <TimeAgo timestamp={newR.createdAt} />
                  </p>
                </div>

                {/* Content and Button */}
                <div className="flex flex-col grow justify-end">
                  <p className="text-lg font-bold text-[#014c57]">
                    ${newR.amount} Coin
                  </p>
                  <Link to={`/dashboard/tasklist/${newR._id}`}>
                    <button className="bg-[#014c57] btn-sm text-white rounded-md mt-2">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewRelease;
