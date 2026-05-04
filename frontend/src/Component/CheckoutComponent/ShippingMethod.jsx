import { Card, Radio } from "antd";
import { formatRupiah } from "../../Util/CartUtils";
import { useSelector } from "react-redux";

const ShippingMethod = ({ options = [], value, onChange }) => {
  const { shippingAddress, ShippingMethod } = useSelector(
    (state) => state.cart,
  );
  const hasAddress = Boolean(shippingAddress?.district);

  return (
    <Card className="checkout-card shipping-checkout-card">
      <div className="shipping-inner">
        <h5 className="heading5 checkout-shipping-title">Shipping Method</h5>

        <div className="shipping-scroll-container">
          {hasAddress ? (
            <Radio.Group
              className="shipping-radio-group"
              value={value}
              onChange={(e) => onChange(e?.target?.value)}
            >
              {options?.map((item) => (
                <Radio
                  key={item?.service}
                  value={item}
                  className="shipping-radio-item"
                >
                  <div className="shipping-content">
                    <div className="shipping-left">
                      <p className="text-l-medium">
                        {item?.code?.toUpperCase()} {item?.service}
                      </p>
                      <p className="text-l-regular">
                        {formatRupiah(item?.cost)}
                      </p>
                    </div>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          ) : (
            <p className="text-l-regular">Choose your shipment address first</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ShippingMethod;
