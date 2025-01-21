import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_publishable_key);

const PaymentSystem = () => {
  const location = useLocation();
  const { price, coins } = location.state || {}; // Extract price and coins from state

  if (!price || !coins) {
    return <p className="text-red-500 text-center">Invalid purchase option. Please go back and select a valid option.</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Pay for {coins} Coins</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <Elements stripe={stripePromise}>
          <CheckOutForm amount={price} coins={coins} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentSystem;
