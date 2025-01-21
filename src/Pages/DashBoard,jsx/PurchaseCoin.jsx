import React from "react";
import { useNavigate } from "react-router-dom";

const coinOptions = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const navigate = useNavigate();

  const handlePurchase = (option) => {
    navigate("/dashboard/paymentsystem", { state: option }); // Redirect to payment page with the selected option
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-600 drop-shadow-md">
        Purchase Coins
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 lg:px-20">
        {coinOptions.map((option, index) => (
          <div
            key={index}
            className="relative group border-2 border-gray-200 shadow-md p-6 rounded-lg text-center transition transform hover:scale-105 hover:shadow-xl bg-white"
            onClick={() => handlePurchase(option)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold mb-4 text-gray-800">
                {option.coins} Coins
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Only <span className="font-bold text-green-600">${option.price}</span>
              </p>
              <button className="btn btn-success px-6 py-2 text-white font-semibold rounded-full shadow-md hover:bg-green-700">
                Purchase Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
