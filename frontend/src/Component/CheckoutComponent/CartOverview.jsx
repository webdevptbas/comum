import { Card, List } from "antd";

const CartOverview = () => {
  const items = [
    {
      name: "Helmet",
      price: "Rp2.480.000",
    },
    {
      name: "Headband",
      price: "Rp216.000",
    },
  ];

  return (
    <Card className="checkout-card">
      <h5 className="checkout-cart-overview heading5">Cart Overview</h5>

      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item className="cart-item">
            <div className="cart-info">
              <p>{item.name}</p>
              <strong>{item.price}</strong>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default CartOverview;
