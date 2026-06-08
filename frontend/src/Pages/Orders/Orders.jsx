import { Empty, Input, Select, Spin } from "antd";
import { useGetMyOrdersQuery } from "../../Slices/ordersApiSlice";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const OrdersPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <div className="orders-page-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="orders-page">Failed to load orders.</div>;
  }

  const getOrderStatus = (status) => {
    switch (status) {
      case "completed":
        return {
          label: "Successful",
          color: "#DFF5E6",
          textColor: "#2E8B57",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          color: "#FFE5E5",
          textColor: "#D9534F",
        };

      default:
        return {
          label: "Ongoing",
          color: "#FFE7C2",
          textColor: "#D17B00",
        };
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <Input
          placeholder="Find your transactions here."
          prefix={<CiSearch />}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <div className="orders-filter">
          <span>Transaction Status</span>

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              {
                value: "all",
                label: "All Status",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "paid",
                label: "Paid",
              },
              {
                value: "processing",
                label: "Processing",
              },
              {
                value: "shipped",
                label: "Shipped",
              },
              {
                value: "completed",
                label: "Completed",
              },
              {
                value: "cancelled",
                label: "Cancelled",
              },
            ]}
          />
        </div>
      </div>
      {/* Orders */}

      {orders?.length === 0 ? (
        <Empty description="No Orders Found" />
      ) : (
        <div className="orders-list">
          {orders?.map((order) => {
            const firstProduct = order.orderItems[0];

            const otherProducts = order.orderItems.length - 1;

            const status = getOrderStatus(order.orderStatus);

            return (
              <div className="order-card" key={order._id}>
                {/* Header */}

                <div className="order-card-header">
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: status.color,
                      color: status.textColor,
                    }}
                  >
                    {status.label}
                  </span>

                  <span>{order.orderId}</span>
                </div>

                {/* Body */}

                <div className="order-card-body">
                  <div className="order-product">
                    <img
                      src={firstProduct.imageUrl}
                      alt={firstProduct.productName}
                    />

                    <div>
                      <h3>{firstProduct.productName}</h3>

                      {otherProducts > 0 && (
                        <p>+{otherProducts} Other Product</p>
                      )}
                    </div>
                  </div>

                  <div className="order-summary">
                    <p>Total Spending</p>

                    <h2>
                      Rp
                      {order.totalPrice.toLocaleString("id-ID")}
                    </h2>

                    <button>Track Order</button>
                  </div>
                </div>

                <div className="order-card-footer">+ Show More</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
