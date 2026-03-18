import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "../../index.css";
import "./Login.css";

import FormContainer from "../../Component/FormContainer/FormContainer";
import { useLoginMutation } from "../../Slices/usersApiSlice";
import { setCredentials } from "../../Slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (values) => {
    try {
      const res = await login(values).unwrap();

      dispatch(setCredentials(res));

      message.success("Login successful!");
      navigate("/");
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
        <span className="link" onClick={() => navigate("/register")}>
          Register
        </span>
      </p>
    </FormContainer>
  );
};

export default LoginPage;
