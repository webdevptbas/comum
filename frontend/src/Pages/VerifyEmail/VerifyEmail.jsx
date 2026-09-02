import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button, Spin } from "antd";
import FormContainer from "../../Component/FormContainer/FormContainer";
import { useVerifyEmailMutation } from "../../Slices/usersApiSlice";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [verifyEmail] = useVerifyEmailMutation();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const runVerification = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Verification token is missing.");
        return;
      }

      try {
        await verifyEmail({ token }).unwrap();
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err?.data?.message || "Invalid or expired verification link.",
        );
      }
    };

    runVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <FormContainer className="verify-email-form">
      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Verifying your email...</p>
        </div>
      )}

      {status === "success" && (
        <div style={{ textAlign: "center" }}>
          <h2 className="heading2">Email Verified!</h2>
          <p style={{ marginTop: 16 }}>
            Your account is now active. You can log in now.
          </p>
          <Button
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      )}

      {status === "error" && (
        <div style={{ textAlign: "center" }}>
          <h2 className="heading2">Verification Failed</h2>
          <p style={{ marginTop: 16 }}>{errorMessage}</p>
          <Button
            type="primary"
            block
            style={{ marginTop: 16 }}
            onClick={() => navigate("/register")}
          >
            Back to Register
          </Button>
        </div>
      )}
    </FormContainer>
  );
};

export default VerifyEmailPage;
