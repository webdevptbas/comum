import React from "react";
import { Button, message } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import FormContainer from "../../Component/FormContainer/FormContainer";
import { useResendVerificationMutation } from "../../Slices/usersApiSlice";

const CheckEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const identifier =
    searchParams.get("identifier") || searchParams.get("email");

  const [resendVerification, { isLoading }] = useResendVerificationMutation();

  const handleResend = async () => {
    try {
      await resendVerification({ identifier }).unwrap();
      message.success("Verification email sent! Please check your inbox.");
    } catch (err) {
      message.error(err?.data?.message || "Failed to resend email");
    }
  };

  return (
    <FormContainer className="check-email-form">
      <h2 className="heading2">Check Your Email</h2>

      <p style={{ marginTop: 16, lineHeight: 1.6 }}>
        We've sent a verification link to your email
        {identifier ? (
          <>
            {" "}
            for <strong>{identifier}</strong>
          </>
        ) : null}
        . Please click the link in that email to activate your account before
        logging in.
      </p>

      <p style={{ marginTop: 16, color: "#767676" }}>
        Didn't receive the email? Check your spam folder, or click below to
        resend it.
      </p>

      <Button
        type="primary"
        block
        loading={isLoading}
        onClick={handleResend}
        style={{ marginTop: 8 }}
      >
        Resend Verification Email
      </Button>

      <p style={{ marginTop: 24 }}>
        <span className="link" onClick={() => navigate("/login")}>
          Back to Login
        </span>
      </p>
    </FormContainer>
  );
};

export default CheckEmailPage;
