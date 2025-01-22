import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const PaymentHistory = () => {
const [users] = useUser()
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 
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
    return <p>Loading payment history...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      {payments.length > 0 ? (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Coins</th>
              <th className="border px-4 py-2">Amount ($)</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((payment, index) => (
              <tr key={payment._id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">{payment.coins}</td>
                <td className="border px-4 py-2">${payment.amount.toFixed(2)}</td>
                <td className="border px-4 py-2">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payment history available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
