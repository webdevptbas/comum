import { Button, Select, Upload } from "antd";
import { sortByName } from "../../../Util/sortByName";

const ProductToolbar = ({ brands, onFilter, onAdd, onCsvUpload }) => {
  const brandOptions = brands.map((brand) => ({
    _id: brand._id,
    value: brand._id,
    name: brand.name,
    label: brand.name,
    disabled: !brand.isActive,
  }));

  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
      <Select
        placeholder="Filter by Brand"
        allowClear
        style={{ width: 200 }}
        onChange={onFilter}
        options={sortByName(brandOptions)}
      />

      {/* <Upload
        accept=".csv"
        showUploadList={false}
        customRequest={({ file }) => onCsvUpload(file)}
      >
        <Button>📥 Import CSV</Button>
      </Upload> */}

      <Button type="primary" onClick={onAdd}>
        + Add Product
      </Button>
    </div>
  );
};

export default ProductToolbar;
