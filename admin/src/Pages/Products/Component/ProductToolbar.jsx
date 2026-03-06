import { Button, Select, Upload } from "antd";

const ProductToolbar = ({ products, onFilter, onAdd, onCsvUpload }) => {
  const brandOptions = [
    ...Array.from(new Set(products.map((p) => p.brand))).map((brand) => ({
      label: brand,
      value: brand,
    })),
  ];

  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
      <Select
        placeholder="Filter by Brand"
        allowClear
        style={{ width: 200 }}
        onChange={onFilter}
        options={brandOptions}
      />

      <Upload
        accept=".csv"
        showUploadList={false}
        customRequest={({ file }) => onCsvUpload(file)}
      >
        <Button>📥 Import CSV</Button>
      </Upload>

      <Button type="primary" onClick={onAdd}>
        + Add Product
      </Button>
    </div>
  );
};

export default ProductToolbar;
