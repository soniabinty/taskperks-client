import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const CheckOutForm = ({ amount , coins }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [users] = useUser()
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => {
          console.log(res.data.clientSecret);
          if (res.data && res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            console.error("Invalid response from server:", res.data);
          }
        })
        .catch((err) => console.error("Payment Intent Error:", err));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: users?.displayName,
        email: users?.email,
      },
    });

    if (error) {
      console.log("[error]", error);
      setProcessing(false);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment Successful", paymentIntent);
      const paymentInfo = {
        userId: users._id,
        email: users.email,
      coins,
        amount,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      const res = await axiosSecure.post('/payments', paymentInfo);

      if (res.data.success) {
        alert('Payment successful! Coins added to your account.');
        navigate('/dashboard');
      }
   
      setProcessing(false);
 
  };

    }
 

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};
export default CheckOutForm;