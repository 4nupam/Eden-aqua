import React, { useState } from "react";
import toast from "react-hot-toast";

// Helper function to dynamically load Razorpay checkout script
const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script"); // create script element
    script.src = src; // set script source
    script.onload = () => resolve(true); // resolve promise if loaded successfully
    script.onerror = () => resolve(false); // resolve false if failed to load
    document.body.appendChild(script); // append script to body
  });

export default function RazorpayButton({ amountUSD, product }) {
  const [loading, setLoading] = useState(false); // loading state to disable button while processing

  // Function to initiate payment on button click
  const handlePayment = async () => {
    setLoading(true); // start loading

    // Load Razorpay's checkout.js script dynamically
    const sdkLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load");
      setLoading(false); // stop loading if SDK fails
      return;
    }

    // Access environment variables (must be prefixed with VITE_ in Vite projects)
    const key = import.meta.env.VITE_RAZORPAY_KEY; // Razorpay public key
    const apiBase = import.meta.env.VITE_API_URL; // Your backend API base URL

    // Basic validation: check if key and API URL are set
    if (!key || !apiBase) {
      toast.error("Missing Razorpay key or API URL");
      setLoading(false); // stop loading
      return;
    }

    try {
      // Call backend API to create a Razorpay order
      // Backend returns order details such as order id and amount
      const orderRes = await fetch(
        `https://edenaqua-production.up.railway.app/payment/create-order`,
        {
          //${apiBase}/payment/create-order
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            amount: Math.round(amountUSD), // convert amount to cents (smallest currency unit)
            // currency: "USD",
            // currency code
            // product,
            // pass product info (optional, useful for backend notes)
          }),
        }
      );

      // Parse JSON response containing order details
      const orderData = await orderRes.json();

      // Razorpay checkout options
      const options = {
        key, // Razorpay key id
        amount: orderData.amount, // amount in smallest currency unit
        currency: "INR",
        name: "EDEN AQUA", // Company/store name displayed on checkout
        description: product.Name || "Order Payment", // Description of the purchase
        image: product.ProductImage, // Optional product image/logo shown on checkout
        order_id: orderData.id, // Order ID from backend, required for Razorpay payment validation

        // Callback function invoked after payment is completed
        handler: async function (response) {
          // Verify payment by sending response back to backend
          const verifyRes = await fetch(
            `https://edenaqua-production.up.railway.app/payment/verify`,
            {
              //${apiBase}/payment/verify
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: JSON.stringify({ response, product: product.items }), // pass Razorpay response + product info
            }
          );

          const verifyData = await verifyRes.json();
          console.log(verifyData);
          if (verifyData.success === true) {
            toast.success("Payment successful!"); // Show success message
          } else {
            toast.error("Payment verification failed"); // Show error message
          }
        },

        // Prefill customer info in the payment form (optional)
        prefill: {
          name: "Anupam Upadhyay",
          email: "4.anupamupadhyay@gmail.com",
          contact: "7889276476",
        },

        // Theme color of the checkout form
        theme: {
          color: "#1a73e8", // EDEN AQUA brand color
        },
      };

      // Create a new Razorpay payment object with above options
      const rzp = new window.Razorpay(options);

      // Open the Razorpay checkout modal
      rzp.open();
    } catch (err) {
      // Handle any errors during payment initiation
      toast.error("Payment initiation failed");
    } finally {
      // Reset loading state so user can interact again
      setLoading(false);
    }
  };

  return (
    // Payment button UI
    <button
      onClick={handlePayment} // trigger payment on click
      disabled={loading} // disable button during processing
      className={`bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition-all ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Processing..." : `Pay $${amountUSD}`} {/* Button text */}
    </button>
  );
}
 