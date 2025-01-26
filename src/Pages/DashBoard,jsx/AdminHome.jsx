import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // Fetch all users and calculate total coins
    axiosSecure.get("/allusers").then((res) => {
      setUsers(res.data);
      const coins = res.data.reduce((sum, user) => sum + parseInt(user.coins || 0), 0);
      setTotalCoins(coins);
    });

    // Fetch all payments and calculate total amount
    axiosSecure.get("/allpayments").then((res) => {
      const allPayments = res.data.reduce(
        (sum, payment) => sum + parseInt(payment.amount || 0),
        0
      );
      setTotalPayment(allPayments);
    });

    // Fetch pending withdrawal requests
    axiosSecure.get("/withdrawals?status=pending").then((res) => {
      setWithdrawRequests(res.data);
    });
  }, [axiosSecure]);

  const workers = users.filter((user) => user.role === "Worker");
  const buyers = users.filter((user) => user.role === "Buyer");

  const handlePaymentSuccess = (request) => {
    Swal.fire({
      title: "Approve Payment",
      text: "Are you sure you want to approve this withdrawal request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/withdrawals/${ request._id}`, {
            status: "approved",
            withdrawal_coin: request.withdrawal_coin,
            withdrawal_amount: request.withdrawal_amount,
            worker_email: request.worker_email
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Payment Approved",
              text: "Withdrawal request has been approved and user coins have been updated.",
            });
            setWithdrawRequests((prev) =>
              prev.filter((req) => req._id !== request._id)
            );
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an error approving the withdrawal request. Please try again.",
            });
          });
      }
    });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-8">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Workers */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Workers</h3>
          <p className="text-4xl font-bold text-blue-600">{workers.length}</p>
        </div>
        {/* Total Buyers */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Buyers</h3>
          <p className="text-4xl font-bold text-blue-600">{buyers.length}</p>
        </div>
        {/* Total Coins */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Coins</h3>
          <p className="text-4xl font-bold text-green-600">{totalCoins}</p>
        </div>
        {/* Total Payments */}
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Payments</h3>
          <p className="text-4xl font-bold text-yellow-600">${totalPayment}</p>
        </div>
      </div>

      {/* Withdrawal Requests */}
      <h3 className="text-3xl font-bold text-blue-600 mb-6">
        Pending Withdrawal Requests
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Worker Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Coins
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Amount (USD)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Payment System
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {withdrawRequests.map((request) => (
              <tr key={request._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.worker_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.withdrawal_coin}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${(request.withdrawal_coin / 20).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {request.payment_system}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() =>
                      handlePaymentSuccess(
                       request
                      )
                    }
                  >
                    Mark as Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
