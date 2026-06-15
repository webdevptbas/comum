import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, message, Select, Space, Table, Tag } from "antd";
import { fetchAllOrders } from "../../Util/apiService.js";
import { CiSearch } from "react-icons/ci";
import columns from "./ordersColumn.js";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setOrders(response);
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const keyword = searchKeyword.toLowerCase();

    const matchesSearch =
      order.orderId.toLowerCase().includes(keyword) ||
      order.user?.name?.toLowerCase().includes(keyword) ||
      order.user?.email?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "all" ? true : order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Input
        placeholder="Search Order ID, Customer..."
        prefix={<CiSearch />}
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        style={{
          maxWidth: 350,
        }}
      />

      <Select
        value={statusFilter}
        onChange={setStatusFilter}
        style={{
          width: 180,
          marginBottom: "20px",
        }}
        options={[
          {
            label: "All Status",
            value: "all",
          },
          {
            label: "Pending",
            value: "pending",
          },
          {
            label: "Paid",
            value: "paid",
          },
          {
            label: "Processing",
            value: "processing",
          },
          {
            label: "Shipped",
            value: "shipped",
          },
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "Cancelled",
            value: "cancelled",
          },
        ]}
      />

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredOrders}
        pagination={{
          pageSize: 10,
        }}
      />
    </>
  );
};

export default Orders;
