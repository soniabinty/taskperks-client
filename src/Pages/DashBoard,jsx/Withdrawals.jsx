import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";

const Withdrawals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [accountNumber, setAccountNumber] = useState("");
  const [users] = useUser();
  const totalCoins = users.coins;

 
  const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleWithdrawCoinsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setWithdrawCoins(value);
      setWithdrawAmount(value / 20);
      setValue('withdrawCoins', value); 
      setValue('withdrawAmount', value / 20); 
    } else {
      setWithdrawCoins(0);
      setWithdrawAmount(0);
      setValue('withdrawCoins', 0);
      setValue('withdrawAmount', 0);
    }
  };

  
  const onSubmit = (data) => {
    if (data.withdrawCoins > totalCoins) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "You cannot withdraw more coins than you currently have.",
      });
      return;
    }

    const withdrawalData = {
      worker_email: users.email,
      worker_name: users.name,
      withdrawal_coin: parseFloat(data.withdrawCoins),
      withdrawal_amount: parseFloat(data.withdrawAmount),
      payment_system: data.paymentSystem,
      withdraw_date: new Date(),
      status: "pending",
      account_number: data.accountNumber,
    };

    
    axiosSecure
      .post("/withdrawals", withdrawalData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Withdrawal Request Sent",
            text: "Your withdrawal request has been submitted and is pending approval.",
          });
reset()
          // Reset form
          setWithdrawCoins(0);
          setWithdrawAmount(0);
          setAccountNumber("");
        }
      })
      .catch((err) => {
        console.error("Error submitting withdrawal request:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error processing your withdrawal request. Please try again.",
        });
      });
  };

  return (
    <div className="md:p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Withdraw Earnings
      </h2>
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">
          Total Coins:{" "}
          <span className="text-blue-600">{totalCoins} Coins</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Withdrawal Amount:{" "}
          <span className="text-green-600">
            ${(totalCoins / 20).toFixed(2)} USD
          </span>
        </p>
      </div>
      {totalCoins < 200 ? (
        <p className="text-center text-lg font-semibold text-red-600">
          Insufficient coins to withdraw. Minimum required: 200 coins.
        </p>
      ) : (
        <form
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              htmlFor="withdrawCoins"
              className="block text-gray-700 font-medium mb-2"
            >
              Coins to Withdraw
            </label>
            <input
              type="number"
              id="withdrawCoins"
              className="input input-bordered w-full"
              {...register("withdrawCoins", { required: true, min: 0, max: totalCoins })}
              value={withdrawCoins}
              onChange={handleWithdrawCoinsChange}
              placeholder="Enter the number of coins"
            />
            {errors.withdrawCoins && (
              <p className="text-red-600">Please enter a valid amount of coins</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="withdrawAmount"
              className="block text-gray-700 font-medium mb-2"
            >
              Withdrawal Amount ($)
            </label>
            <input
              type="number"
              id="withdrawAmount"
              className="input input-bordered w-full bg-gray-200"
              value={withdrawAmount.toFixed(2)}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentSystem"
              className="block text-gray-700 font-medium mb-2"
            >
              Select Payment System
            </label>
            <select
              id="paymentSystem"
              className="select select-bordered w-full"
              {...register("paymentSystem", { required: true })}
            >
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="accountNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              className="input input-bordered w-full"
              {...register("accountNumber", { required: true })}
              placeholder="Enter your account number"
            />
            {errors.accountNumber && (
              <p className="text-red-600">Account number is required</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={withdrawCoins > totalCoins || withdrawCoins < 200}
          >
            Withdraw
          </button>
        </form>
      )}
    </div>
  );
};

export default Withdrawals;
