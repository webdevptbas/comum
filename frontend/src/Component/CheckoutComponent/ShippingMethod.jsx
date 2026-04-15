import { Card, Collapse, Radio } from "antd";

const ShippingMethod = () => {
  return (
    <Card className="checkout-card">
      <h5 className="heading5 checkout-shipping-title">Shipping Method</h5>

      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Anteraja (Rp7.000 - Rp51.200)" key="1">
          <Radio.Group className="shipping-radio">
            <Radio value="regular">Anteraja Regular - Rp7.000</Radio>
            <Radio value="nextday">Anteraja Next Day - Rp13.000</Radio>
            <Radio value="cargo">Anteraja Cargo - Rp51.200</Radio>
          </Radio.Group>
        </Collapse.Panel>

        <Collapse.Panel header="J&T (Rp8.000 - Rp10.000)" key="2" />
        <Collapse.Panel header="Pos Indonesia (Rp8.000 - Rp15.000)" key="3" />
        <Collapse.Panel header="JNE (Rp10.000 - Rp40.000)" key="4" />
      </Collapse>
    </Card>
  );
};

export default ShippingMethod;
