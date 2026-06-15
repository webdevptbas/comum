import { Button, Card } from "antd";
import { formatRupiah } from "../../Util/CartUtils";

const Payment = ({ onClick, isLoading, error, buttonText, paymentData }) => {
  const kilogramConvert = paymentData?.totalWeight / 1000;

  return (
    <Card className="checkout-summary-card">
      <h5 className="heading5 checkout-summary-title">Total Bill</h5>

      <div className="text-l-regular checkout-summary-row">
        <p>Total Price</p>
        <p>{formatRupiah(paymentData?.itemsPrice)}</p>
      </div>

      <div className="text-l-regular checkout-summary-row">
        <p>Shipping Cost</p>
        <p>{formatRupiah(paymentData?.shippingPrice)}</p>
      </div>

      <div className="text-l-regular checkout-summary-row">
        <p>{`Shipping Weight(s)`}</p>
        <p>{Math.ceil(kilogramConvert)} kg</p>
      </div>

      <div className="text-l-medium checkout-summary-total">
        <p>Total Bill</p>
        <p>{formatRupiah(paymentData?.totalPrice)}</p>
      </div>

      <Button
        className="text-button-regular button checkout-btn"
        block
        onClick={onClick}
        loading={isLoading}
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

export default Payment;
