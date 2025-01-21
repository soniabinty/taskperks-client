import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useUser from "../../Hooks/useUser";

const CheckOutForm = ({ amount, coins }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [users] = useUser();
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch client secret for payment intent
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => {
          if (res.data && res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            console.error("Invalid response from server:", res.data);
          }
        })
        .catch((err) => console.error("Payment Intent Error:", err));
    }
  }, [amount, axiosSecure]);

  // Handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    setProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: users?.displayName,
          email: users?.email,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        setErrorMessage(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          userId: users._id,
          email: users.email,
          coins,
          amount,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data.success) {
          setSuccessMessage("Payment successful! Coins have been added to your account.");
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your coins have been credited to your account.",
          });
        }
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Complete Your Payment</h2>
      <p className="text-center text-gray-600 mb-6">You are paying <span className="font-bold">${amount.toFixed(2)}</span> for <span className="font-bold">{coins}</span> coins.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
          className="p-4 border rounded-lg shadow-sm focus:outline-none"
        />
        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition duration-300"
          }`}
        >
          {processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-4">
        Secure payments powered by <span className="font-bold">Stripe</span>.
      </p>
    </div>
  );
};

export default CheckOutForm;
