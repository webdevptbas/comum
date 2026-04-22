import { Card, Radio } from "antd";

const shippingOptions = [
  {
    service: "REG",
    description: "Layanan Reguler",
    etd: "2-3 hari",
    cost: 9000,
  },
  {
    service: "YES",
    description: "Yakin Esok Sampai",
    etd: "1 hari",
    cost: 20000,
  },
  {
    service: "OKE",
    description: "Ongkos Kirim Ekonomis",
    etd: "3-4 hari",
    cost: 8000,
  },
];

const ShippingMethod = ({ value, onChange }) => {
  return (
    <Card className="checkout-card">
      <h5 className="heading5 checkout-shipping-title">
        Shipping Method (JNE)
      </h5>

      <Radio.Group
        className="shipping-radio-group"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {shippingOptions.map((item) => (
          <Radio
            key={item.service}
            value={item}
            className="shipping-radio-item"
          >
            <div className="shipping-content">
              <div className="shipping-left">
                <strong>JNE {item.service}</strong>
                <p className="shipping-desc">{item.description}</p>
              </div>

              <div className="shipping-right">
                <strong>Rp{item.cost.toLocaleString("id-ID")}</strong>
                <p className="shipping-etd">{item.etd}</p>
              </div>
            </div>
          </Radio>
        ))}
      </Radio.Group>
    </Card>
  );
};

export default ShippingMethod;
