import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Button, Select, InputNumber, Breadcrumb, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import "./ProductDetail.css";
import Tag from "../../Component/Tag/Tag";
import { useGetProductDetailsQuery } from "../../Slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Slices/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSizeObj, setSelectedSizeObj] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setSelectedImage(product?.imageUrl[0]);
    }
    if (selectedSizeObj) {
      setQuantity(1);
    }
  }, [product, selectedSizeObj]);

  const sizeOptions = product?.variations?.map((v) => ({
    label: v.size || "No Size",
    value: v.size,
    disabled: v.stock === 0,
  }));

  const handleSizeChange = (size) => {
    const found = product?.variations?.find((v) => v.size === size);
    if (found) {
      setSelectedSizeObj(found);
      setSelectedItem(found);
    }
  };

  const finalItem = selectedItem || null;

  const finalIsDiscount = finalItem
    ? finalItem?.isDiscount
    : product?.displayIsDiscount;

  const finalDiscount = finalItem
    ? finalItem?.discount
    : product?.displayDiscount;

  const finalOriginalPrice = finalItem
    ? finalItem?.price
    : product?.displayPrice;

  const finalPrice = finalItem
    ? finalItem?.isDiscount
      ? finalItem?.discountPrice
      : finalItem?.price
    : product?.displayDiscountPrice;

  const addToCartHandler = () => {
    if (!selectedItem) return;

    dispatch(
      addToCart({
        _id: selectedItem._id,
        productId: product._id,
        itemCode: selectedItem.itemCode,
        productName: product.productName,
        imageUrl: product.imageUrl[0],
        size: selectedItem.size,
        weight: selectedItem.weight,
        price: finalPrice,
        stock: selectedItem.stock,
        quantity: quantity,
        discount: selectedItem.discount,
        discountPrice: selectedItem.discountPrice,
        isDiscount: selectedItem.isDiscount,
        originalPrice: selectedItem.price,
      }),
    );
  };

  return (
    <div className="product-detail">
      <div className="mobile-back-button">
        <Link to={`/shop`}>
          <LeftOutlined />
          Back to Shop
        </Link>
      </div>

      {isLoading ? (
        <div className="product-detail-information">
          {/* IMAGE SECTION */}
          <div className="image-section">
            <div className="skeleton-thumbnail-list thumbnail-list">
              {[...Array(4)].map((_, i) => (
                <Skeleton.Image key={i} style={{ padding: "1rem" }} />
              ))}
            </div>

            <div className="main-image skeleton-main-image">
              <Skeleton.Image
                className="skeleton-main-image"
                style={{ height: 400, padding: "1rem" }}
              />
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="info-section">
            <Skeleton
              active
              paragraph={{ rows: 1 }}
              title={false}
              style={{ width: "100%", padding: "1rem" }}
            />{" "}
            {/* breadcrumb */}
            <Skeleton.Input active style={{ padding: "1rem" }} /> {/* title */}
            {/* SIZE */}
            <div className="section">
              <Skeleton.Input active style={{ padding: "1rem" }} />
            </div>
            {/* BUTTON */}
            <Skeleton.Button active style={{ padding: "1rem" }} />
          </div>
        </div>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <div className="product-detail-information">
            <Breadcrumb
              className="product-detail-breadcrumb-mobile"
              style={{ marginBottom: "1rem" }}
            >
              <Breadcrumb.Item>
                <Link to="/shop">Shop</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/shop/${product?.brand?.name?.toLowerCase()}`}>
                  {product?.brand?.name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.productName}</Breadcrumb.Item>
            </Breadcrumb>
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
                        alt={`${product.productName}-${index}`}
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
                  <Link to={`/shop/${product?.brand?.name?.toLowerCase()}`}>
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
                  max={selectedSizeObj?.stock}
                  value={quantity}
                  disabled={!selectedSizeObj}
                  onChange={(val) => {
                    setQuantity(val);
                  }}
                  changeOnWheel={false}
                />
              </div>

              <Button
                className="add-to-cart-button"
                onClick={() => addToCartHandler()}
                disabled={!selectedItem}
              >
                Add To Cart
              </Button>
            </div>
          </div>

          {product.details ? (
            <div className="detail-section">
              <h2>Product Details</h2>
              <p
                className="text-m-regular"
                style={{ textAlign: "justify", whiteSpace: "pre-line" }}
              >
                {product.details}
              </p>
              <p className="text-m-regular" style={{ whiteSpace: "pre-line" }}>
                {product.specification}
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
