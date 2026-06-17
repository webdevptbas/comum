import React, { useEffect } from "react";
import { Form, Input, Button, message, Select, DatePicker } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import "./Register.css";

import FormContainer from "../../Component/FormContainer/FormContainer";

import { useRegisterMutation } from "../../Slices/usersApiSlice";
import { setCredentials } from "../../Slices/authSlice";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    const { confirmPassword, ...user } = values;

    try {
      const res = await register(user).unwrap();

      dispatch(setCredentials(res));

      message.success("Successfully registered");
      navigate(redirect);
    } catch (err) {
      message.error(err?.data?.message || "Register failed");
    }
  };

  return (
    <FormContainer className="register-form">
      <h2 className="heading2 register-title">Register</h2>

      <Form layout="vertical" onFinish={submitHandler}>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number" },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please choose your gender" }]}
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please input your date of birth" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password" },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Button
          className="register-button text-button-small"
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
        >
          Register
        </Button>
      </Form>

      <p className="register-information">
        Already have an account?{" "}
        <span
          className="link"
          onClick={() =>
            redirect ? navigate(`/login?redirect=${redirect}`) : "/login"
          }
        >
          Login
        </span>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
