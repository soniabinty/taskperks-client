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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {coinOptions.map((option, index) => (
        <div
          key={index}
          className="border shadow-lg p-6 rounded-lg text-center cursor-pointer hover:shadow-xl"
          onClick={() => handlePurchase(option)}
        >
          <h3 className="text-2xl font-bold mb-4">{option.coins} Coins</h3>
          <p className="text-lg">= ${option.price}</p>
          <button className="mt-4 btn btn-success">Purchase</button>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;
