import React from "react";
import { Form, Input, Button, message, Select, DatePicker } from "antd";
import { useNavigate } from "react-router";
import "../../index.css";
import "./Register.css";

import FormContainer from "../../Component/FormContainer/FormContainer";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      console.log(values); // replace with API later
      message.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      message.error("Registration failed");
    }
  };

  return (
    <FormContainer style={{ padding: "100px 0 50px 0" }}>
      <h2 className="heading2 register-title">Register</h2>

      <Form layout="vertical" onFinish={submitHandler}>
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username" }]}
        >
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number" },
          ]}
        >
          <Input />
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
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button
          className="register-button text-button-small"
          type="primary"
          htmlType="submit"
          block
        >
          Register
        </Button>
      </Form>

      <p className="register-information">
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </FormContainer>
  );
};

export default RegisterPage;
