import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Button, Select, InputNumber, Breadcrumb } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "./ProductDetail.css";
import Tag from "../../Component/Tag/Tag";
import { useGetProductDetailsQuery } from "../../Slices/productsApiSlice";

const ProductDetailPage = () => {
  const { brand, id } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSizeObj, setSelectedSizeObj] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setSelectedImage(product.imageUrl[0]);
    }
  }, [product]);

  if (!product) return <div>Loading...</div>;

  const sizeOptions = product.variations.map((v) => ({
    label: v.size || "No Size",
    value: v.size,
  }));

  const handleSizeChange = (size) => {
    const found = product.variations.find((v) => v.size === size);
    if (found) {
      setSelectedSizeObj(found);
      setSelectedItem(found);
    }
  };

  const finalItem = selectedItem || null;

  const finalIsDiscount = finalItem
    ? finalItem.isDiscount
    : product.displayIsDiscount;

  const finalDiscount = finalItem
    ? finalItem.discount
    : product.displayDiscount;

  const finalOriginalPrice = finalItem ? finalItem.price : product.displayPrice;

  const finalPrice = finalItem
    ? finalItem.isDiscount
      ? finalItem.discountPrice
      : finalItem.price
    : product.displayDiscountPrice;

  return (
    <div className="product-detail">
      <div className="mobile-back-button">
        <Link to={`/shop`}>
          <LeftOutlined />
          Back to Shop
        </Link>
      </div>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div className="product-detail-information">
            <div className="image-section">
              {product.imageUrl && product.imageUrl.length > 0 ? (
                <>
                  <div className="thumbnail-list">
                    {product.imageUrl.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        onClick={() => setSelectedImage(url)}
                        className={
                          selectedImage === url ? "active" : "inactive"
                        }
                        alt={`thumb-${index}`}
                      />
                    ))}
                  </div>
                  <div className="main-image">
                    <img
                      src={selectedImage || product.imageUrl[0]}
                      alt={product.productName}
                    />
                  </div>
                </>
              ) : (
                <div className="no-image-text heading5">No image available</div>
              )}
            </div>

            <div className="info-section">
              <Breadcrumb
                className="product-detail-breadcrumb"
                style={{ marginBottom: "1rem" }}
              >
                <Breadcrumb.Item>
                  <Link to="/shop">Shop</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/shop/${product?.brand?.name.toLowerCase()}`}>
                    {product?.brand?.name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product.productName}</Breadcrumb.Item>
              </Breadcrumb>

              <h2>{product.productName}</h2>

              {finalIsDiscount && (
                <div className="tag-price-container" style={{ height: "0" }}>
                  <div className="card-tag">
                    <Tag type="discount" text={`${finalDiscount}%`} />
                  </div>
                  <div
                    className="card-price text-s-regular"
                    style={{ color: "#C2C2C2", textDecoration: "line-through" }}
                  >
                    Rp. {finalOriginalPrice.toLocaleString("id-ID")}
                  </div>
                </div>
              )}

              <div className="final-price">
                Rp {finalPrice.toLocaleString("id-ID")}
              </div>

              <div className="section">
                <p>Choose Size</p>
                <Select
                  style={{ width: "100%" }}
                  onChange={handleSizeChange}
                  value={selectedSizeObj?.size || null}
                  options={sizeOptions}
                />
              </div>

              <div className="section">
                <p>Quantity</p>
                <InputNumber
                  min={1}
                  max={selectedSizeObj?.totalStock}
                  value={quantity}
                  onChange={(val) => setQuantity(val)}
                />
              </div>

              <Button type="primary" block>
                Add To Cart
              </Button>
            </div>
          </div>

          {product.details ? (
            <div className="detail-section">
              <h2>Product Details</h2>
              <p className="text-m-regular" style={{ whiteSpace: "pre-line" }}>
                {product.specification}
              </p>
              <p
                className="text-m-regular"
                style={{ textAlign: "justify", whiteSpace: "pre-line" }}
              >
                {product.details}
              </p>
              {/* <a href="#more" className="read-more">
            Read More
          </a> */}
            </div>
          ) : (
            <div className="detail-section"></div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
