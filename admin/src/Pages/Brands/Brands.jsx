import React, { useEffect, useState } from "react";
import { Card, Button, List, Modal, Form, Input, message, Switch } from "antd";
import { fetchBrands, fetchBrandTypesByBrand } from "../../Util/apiService";
import AddBrandModal from "./Component/AddBrandModal";
import AddBrandTypeModal from "./Component/AddBrandTypeModal";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brandTypes, setBrandTypes] = useState([]);

  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [brandTypeModalOpen, setBrandTypeModalOpen] = useState(false);

  const loadBrands = async () => {
    const res = await fetchBrands();
    setBrands(res);
  };

  const loadBrandTypes = async (brandId) => {
    const res = await fetchBrandTypesByBrand(brandId);
    setBrandTypes(res);
  };

  const handleCreateBrand = () => {
    console.log("Brand created");
  };

  const handleCreateBrandType = () => {
    console.log("Brand Type created");
  };

  useEffect(() => {
    loadBrands();
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: 24 }}>
        {/* LEFT: BRANDS */}
        <Card
          title="Brands"
          style={{ flex: 1 }}
          extra={
            <Button type="primary" onClick={() => setBrandModalOpen(true)}>
              + Add Brand
            </Button>
          }
        >
          <List
            dataSource={brands}
            renderItem={(brand) => (
              <>
                <List.Item
                  onClick={() => {
                    setSelectedBrand(brand);
                    loadBrandTypes(brand._id);
                  }}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    background:
                      selectedBrand?._id === brand._id
                        ? "#f0f5ff"
                        : "transparent",
                    justifyContent: "space-between",
                  }}
                >
                  {brand.name}
                  <Switch checked={brand.isActive} />
                </List.Item>
              </>
            )}
          />
        </Card>

        {/* RIGHT: BRAND TYPES */}
        <Card
          title={
            selectedBrand
              ? `Brand Types - ${selectedBrand.name}`
              : "Brand Types"
          }
          style={{ flex: 1 }}
          extra={
            selectedBrand && (
              <Button
                type="primary"
                onClick={() => setBrandTypeModalOpen(true)}
              >
                + Add Brand Type
              </Button>
            )
          }
        >
          {selectedBrand ? (
            <List
              dataSource={brandTypes}
              renderItem={(bt) => <List.Item>{bt.name}</List.Item>}
            />
          ) : (
            <p>Select a Brand first</p>
          )}
        </Card>
      </div>

      <AddBrandModal
        open={brandModalOpen}
        onCancel={() => setBrandModalOpen(false)}
        onSubmit={handleCreateBrand}
      />

      <AddBrandTypeModal
        open={brandTypeModalOpen}
        onCancel={() => setBrandTypeModalOpen(false)}
        onSubmit={handleCreateBrandType}
      />
    </>
  );
};

export default Brands;
