import { Card, Button } from "antd";
import { useSelector } from "react-redux";
import { formatRupiah } from "../../Util/CartUtils";

const SummaryCard = ({ onClick, isLoading, error, buttonText }) => {
  const { cartItems, itemsPrice, shippingPrice, totalPrice, totalWeight } =
    useSelector((state) => state.cart);

  const kilogramConvert = totalWeight / 1000;
  const isDisabled = cartItems.length === 0 ? true : false;

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

      <div className="text-l-medium checkout-summary-total">
        <p>Total Bill</p>
        <p>{formatRupiah(totalPrice)}</p>
      </div>

      <Button
        className="text-button-regular button checkout-btn"
        block
        onClick={onClick}
        loading={isLoading}
        disabled={isDisabled}
      >
        {buttonText}
      </Button>
      {error && (
        <div className="text-l-medium checkout-error">
          <p>
            {error?.data?.message || error?.error || "Something went wrong"}
          </p>
        </div>
      )}
    </Card>
  );
};

export default SummaryCard;
