import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import "./Login.css";

import FormContainer from "../../Component/FormContainer/FormContainer";
import { useLoginMutation } from "../../Slices/usersApiSlice";
import { setCredentials } from "../../Slices/authSlice";
import { apiSlice } from "../../Slices/apiSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    const expiredMessage = sessionStorage.getItem("sessionExpired");

    if (expiredMessage) {
      message.warning(expiredMessage, 7);

      sessionStorage.removeItem("sessionExpired");
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (values) => {
    try {
      const res = await login(values).unwrap();

      dispatch(apiSlice.util.resetApiState());
      dispatch(setCredentials(res));

      message.success("Login success");
      navigate(redirect);
    } catch (err) {
      message.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <FormContainer>
      <h2 className="heading2 login-title">Login</h2>

      <Form layout="vertical" onFinish={submitHandler}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          className="login-button text-button-small"
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
        >
          Login
        </Button>
      </Form>

      <p className="login-information">
        New Customer?{" "}
        <span
          className="link"
          onClick={() =>
            redirect ? navigate(`/register?redirect=${redirect}`) : "/register"
          }
        >
          Register
        </span>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
