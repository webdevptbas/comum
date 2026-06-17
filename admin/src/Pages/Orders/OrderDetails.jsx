import { useNavigate, useParams } from "react-router";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Select,
  Skeleton,
  Tag,
  message,
} from "antd";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

import { useGetOrderByIdAdminQuery } from "../../Slices/ordersApiSlice";

import "./OrderDetails.css";
import { fetchOrderById } from "../../Util/apiService";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  console.log(order);

  const navigate = useNavigate();

  const loadOrderById = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetchOrderById(id);
      setOrder(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      message.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  //   if (error) {
  //     return <div>Failed to load order.</div>;
  //   }

  return (
    <div className="admin-order-details-container">
      <div className="admin-order-header">
        <Button
          icon={<FaArrowLeftLong />}
          type="text"
          onClick={() => navigate("/admin/orders")}
        >
          Back to Orders
        </Button>

        <h2>Order #{order.orderId}</h2>
      </div>

      <Card className="admin-status-card">
        <div className="status-header">
          <div>
            <Tag color="green">{order.orderStatus.toUpperCase()}</Tag>
          </div>

          <div className="status-actions">
            <Select
              value={status || order.orderStatus}
              onChange={setStatus}
              style={{
                width: 180,
              }}
              options={[
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

            <Button type="primary">Update Status</Button>
          </div>
        </div>
      </Card>

      <div className="details-grid">
        <Card title="Order Information">
          <Descriptions column={1}>
            <Descriptions.Item label="Order ID">
              {order.orderId}
            </Descriptions.Item>

            <Descriptions.Item label="Created">
              {new Date(order.createdAt).toLocaleString("id-ID")}
            </Descriptions.Item>

            <Descriptions.Item label="Paid">
              {order.isPaid ? "Yes" : "No"}
            </Descriptions.Item>

            <Descriptions.Item label="Delivered">
              {order.isDelivered ? "Yes" : "No"}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Customer">
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              {order.user?.name}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {order.user?.email}
            </Descriptions.Item>

            <Descriptions.Item label="Username">
              {order.user?.username}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      <Card title={`Products (${order.orderItems.length})`}>
        {order.orderItems.map((item) => (
          <div key={item._id} className="admin-product-row">
            <img src={item.imageUrl} alt={item.productName} />

            <div className="product-content">
              <h4>{item.productName}</h4>

              <p>Size: {item.size}</p>

              <p>Quantity: {item.quantity}</p>
            </div>

            <strong>
              Rp
              {item.price.toLocaleString("id-ID")}
            </strong>
          </div>
        ))}
      </Card>

      <Divider />

      <div className="details-grid">
        <Card title="Shipping Address">
          <p>{order.shippingAddress.address}</p>

          <p>
            {order.shippingAddress.subdistrict.label},{" "}
            {order.shippingAddress.district.label}
          </p>

          <p>
            {order.shippingAddress.city.label},{" "}
            {order.shippingAddress.province.label}
          </p>
        </Card>

        <Card title="Shipping Method">
          <p>{order.shippingMethod.name}</p>

          <p>{order.shippingMethod.service}</p>

          <p>ETA: {order.shippingMethod.etd}</p>
        </Card>
      </div>

      <Divider />

      <div className="details-grid">
        <Card title="Payment Information">
          <Descriptions column={1}>
            <Descriptions.Item label="Payment Type">
              {order.paymentResult?.paymentType}
            </Descriptions.Item>

            <Descriptions.Item label="Transaction ID">
              {order.paymentResult?.id}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              {order.paymentResult?.status}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="Order Summary">
          <Descriptions column={1}>
            <Descriptions.Item label="Items">
              Rp
              {order.itemsPrice.toLocaleString("id-ID")}
            </Descriptions.Item>

            <Descriptions.Item label="Shipping">
              Rp
              {order.shippingPrice.toLocaleString("id-ID")}
            </Descriptions.Item>

            <Descriptions.Item label="Total">
              <strong>
                Rp
                {order.totalPrice.toLocaleString("id-ID")}
              </strong>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
