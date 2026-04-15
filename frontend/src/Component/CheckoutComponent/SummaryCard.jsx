import { Card, Button } from "antd";

const SummaryCard = () => {
  return (
    <Card className="summary-card">
      <h5 className="heading5 checkout-summary-title">Total Bill</h5>

      <div className="summary-row">
        <span>Total Price</span>
        <span>Rp4.881.000</span>
      </div>

      <div className="summary-row">
        <span>Shipping Cost</span>
        <span>Rp7.000</span>
      </div>

      <div className="summary-total">
        <span>Total Bill</span>
        <strong>Rp4.888.000</strong>
      </div>

      <Button className="text-button-regular button checkout-btn" block>
        Place Your Order
      </Button>
    </Card>
  );
};

export default SummaryCard;
