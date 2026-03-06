import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "../../Util/AuthContext";
import api from "../../Util/apiHandler";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", values);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      login(data.user); // Instead of re-reading from localStorage // Update context
      message.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Admin Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLogin;
