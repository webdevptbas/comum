import React, { useEffect, useState } from "react";
import { Card, Button, List, message, Switch } from "antd";
import {
  createBrand,
  createBrandType,
  fetchBrands,
  fetchBrandTypesByBrand,
  toggleBrandStatus,
} from "../../Util/apiService";
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

  const handleCreateBrand = async (values) => {
    try {
      await createBrand(values);
      message.success("Brand created successfully");
      setBrandModalOpen(false);
      loadBrands();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to create brand");
    }
  };

  const handleCreateBrandType = async (values) => {
    try {
      await createBrandType({ ...values, brand: selectedBrand._id });
      message.success("Brand Type created successfully");
      setBrandTypeModalOpen(false);
      loadBrandTypes(selectedBrand._id);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to create brand type",
      );
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleToggleBrand = async (brandId, checked) => {
    try {
      await toggleBrandStatus(brandId, checked);

      setBrands((prev) =>
        prev.map((b) => (b._id === brandId ? { ...b, isActive: checked } : b)),
      );

      message.success("Brand status updated");
    } catch (err) {
      message.error("Failed to update brand status");
    }
  };

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
                    color: brand.isActive ? "inherit" : "#aaa",
                  }}
                >
                  {brand.name}
                  <Switch
                    checked={brand.isActive}
                    onClick={(checked, event) => {
                      event.stopPropagation();
                    }}
                    onChange={(checked) =>
                      handleToggleBrand(brand._id, checked)
                    }
                  />
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
