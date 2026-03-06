import { Table, Button, Popconfirm, Space } from "antd";

const ProductTable = ({ products, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Kode Barang",
      render: (_, record) => {
        const codes = record.variations?.map((v) => v.itemCode) || [];

        if (codes.length === 0) return "-";

        const visibleCodes = codes.slice(0, 3).join(", ");

        return codes.length > 3 ? `${visibleCodes}, ...` : visibleCodes;
      },
    },
    { title: "Nama Barang", dataIndex: "productName" },
    { title: "Brand", dataIndex: ["brand", "name"] },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete product?"
            onConfirm={() => onDelete(record._id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      rowKey="_id"
      bordered
      scroll={{ x: "max-content" }}
      pagination={{ pageSize: 25 }}
    />
  );
};

export default ProductTable;
