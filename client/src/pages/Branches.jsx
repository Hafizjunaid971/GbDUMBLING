// Branches.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Branches as branchAssets } from "../assets/assets"; // <-- yahan assets import

const BranchCard = ({ branch }) => {
  const { navigate } = useAppContext();

  return (
    <div
    //   onClick={() => navigate(`/branch/${branch.path}`)}
      className="border border-gray-500/20 rounded-md px-3 py-2 bg-black 
                 w-full sm:w-44 md:w-52 lg:w-60 cursor-pointer"
      style={{ backgroundColor: branch.bgColor, color: branch.textColor }}
    >
      <div className="group flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-28 md:max-w-36"
          src={branch.image}
          alt={branch.text}
        />
      </div>
      <p className="font-medium text-lg text-center mt-2">
        {branch.text}
      </p>
    </div>
  );
};

const Branches = () => {
  return (
    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {branchAssets.map((branch, index) => (
        <BranchCard key={index} branch={branch} />
      ))}
    </div>
  );
};

export default Branches;
