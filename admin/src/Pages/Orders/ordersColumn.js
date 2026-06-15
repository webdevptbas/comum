import { Button, Tag } from "antd";
import { Link, useNavigate } from "react-router";

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    width: 260,
  },

  {
    title: "Customer",
    render: (_, record) => (
      <>
        <div>{record.user?.name}</div>
        <small>{record.user?.email}</small>
      </>
    ),
  },

  {
    title: "Products",
    render: (_, record) => {
      const firstProduct = record.orderItems[0];

      const remaining = record.orderItems.length - 1;

      return (
        <>
          <div>{firstProduct?.productName}</div>

          {remaining > 0 && (
            <small>
              +{remaining} more product
              {remaining > 1 ? "s" : ""}
            </small>
          )}
        </>
      );
    },
  },

  {
    title: "Total",
    render: (_, record) => `Rp ${record.totalPrice.toLocaleString("id-ID")}`,
  },

  {
    title: "Payment",
    render: (_, record) => {
      const status = record.paymentResult?.status;

      return (
        <Tag color={status === "settlement" ? "green" : "orange"}>{status}</Tag>
      );
    },
  },

  {
    title: "Order Status",
    render: (_, record) => <Tag color="blue">{record.orderStatus}</Tag>,
  },

  {
    title: "Created",
    render: (_, record) =>
      new Date(record.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },

  {
    title: "Action",
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() => Link(`/admin/orders/${record._id}`)}
      >
        View
      </Button>
    ),
  },
];

export default columns;
