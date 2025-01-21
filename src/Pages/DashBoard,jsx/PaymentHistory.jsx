import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUser from "../../Hooks/useUser";

const PaymentHistory = () => {
  const [users] = useUser();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch payment history for the logged-in user
    axiosSecure
      .get(`/payments?email=${users.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching payment history:", err);
        setLoading(false);
      });
  }, [axiosSecure, users.email]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading payment history...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 via-white to-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Payment History
      </h2>
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Transaction ID</th>
                <th className="px-6 py-3 text-left">Coins</th>
                <th className="px-6 py-3 text-left">Amount ($)</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((payment, index) => (
                  <tr
                    key={payment._id}
                    className={`text-gray-700 text-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-100 transition-all`}
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{payment.transactionId}</td>
                    <td className="px-6 py-3">{payment.coins}</td>
                    <td className="md:px-6 py-3">${payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg font-semibold text-gray-600 mt-8">
          No payment history available.
        </p>
      )}
    </div>
  );
};

export default PaymentHistory;
