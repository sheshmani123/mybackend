import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");
  console.log(success, orderId);

  const navigate = useNavigate();

  const VerifyPayment = async () => {
    console.log("Sending request to verify payment...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/order/verify`,
        { success, orderId }
      );
      console.log("Response from server:", response);

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  useEffect(() => {
    VerifyPayment();
  }, []);

  return (
    <div className="spinner">
      {/* You can add spinner or loading animation here */}
      name
    </div>
  );
};

export default Verify;
