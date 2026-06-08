import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetMyOrderDetailsQuery } from "../../Slices/ordersApiSlice";
import { Card } from "antd";
import PaymentSummary from "../Checkout/PaymentSummary";
import "./Payment.css";

const PaymentPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetMyOrderDetailsQuery(orderId);
  const snapToken = order?.snapToken;

  useEffect(() => {
    // load Midtrans Snap script
    const script = document.createElement("script");
    script.src = process.env.REACT_APP_MIDTRANS_URL;
    script.setAttribute(
      "data-client-key",
      process.env.REACT_APP_MIDTRANS_CLIENT_KEY,
    );
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!snapToken) return;

    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("SUCCESS:", result);
      },
      onPending: function (result) {
        console.log("PENDING:", result);
      },
      onError: function (result) {
        console.log("ERROR:", result);
      },
      onClose: function () {
        console.log("User closed popup");
      },
    });
  };

  return (
    <>
      <div className="payment-container">
        <div className="payment-left">
          <Card className="payment-info-card">
            <h5 className="heading5 payment-title">Secure Payment</h5>
            <p className="text-l-regular payment-subtitle">
              All payments are securely processed by Midtrans. You will be able
              to choose your preferred payment method in the next step.
            </p>
          </Card>
        </div>

        <div className="payment-right">
          <PaymentSummary
            onClick={handlePayment}
            error={error}
            buttonText={"Pay Now"}
            isLoading={isLoading}
            paymentData={order}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
