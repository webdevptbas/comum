import { Card, Collapse, Radio } from "antd";

const ShippingMethod = () => {
  return (
    <Card className="checkout-card">
      <h5 className="heading5 checkout-shipping-title">Shipping Method</h5>

      <Collapse defaultActiveKey={["0"]}>
        <Collapse.Panel header="JNE" key="0">
          <Radio.Group className="shipping-radio">
            <Radio value="regular">Anteraja Regular</Radio>
            <Radio value="nextday">Anteraja Next Day</Radio>
            <Radio value="cargo">Anteraja Cargo</Radio>
          </Radio.Group>
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};

export default ShippingMethod;
