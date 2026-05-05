import { Card, Button } from "antd";
import { useSelector } from "react-redux";
import { formatRupiah } from "../../Util/CartUtils";

const SummaryCard = ({ onClick }) => {
  const { itemsPrice, shippingPrice, totalPrice, totalWeight } = useSelector(
    (state) => state.cart,
  );

  const kilogramConvert = totalWeight / 1000;

  return (
    <Card className="checkout-summary-card">
      <h5 className="heading5 checkout-summary-title">Total Bill</h5>

      <div className="text-l-regular checkout-summary-row">
        <p>Total Price</p>
        <p>{formatRupiah(itemsPrice)}</p>
      </div>

      <div className="text-l-regular checkout-summary-row">
        <p>Shipping Cost</p>
        <p>{formatRupiah(shippingPrice)}</p>
      </div>

      <div className="text-l-regular checkout-summary-row">
        <p>{`Shipping Weight(s)`}</p>
        <p>{Math.ceil(kilogramConvert)} kg</p>
      </div>

      <div className="text-l-regular checkout-summary-total">
        <p>Total Bill</p>
        <p>{formatRupiah(totalPrice)}</p>
      </div>

      <Button
        className="text-button-regular button checkout-btn"
        block
        onClick={onClick}
      >
        Place Your Order
      </Button>
    </Card>
  );
};

export default SummaryCard;
