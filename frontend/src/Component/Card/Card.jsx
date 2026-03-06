import React from "react";
import "./Card.css";
import "../../index.css";
import Tag from "../Tag/Tag";

const ProductCard = ({
  title,
  brand,
  price,
  src,
  type,
  text,
  finalPrice,
  isDiscount,
}) => {
  return (
    <div className="card-container">
      <div className="image-container">
        {src ? (
          <img src={src} alt={title} />
        ) : (
          <div className="no-image-text heading5">No image available</div>
        )}
      </div>

      {isDiscount ? (
        <div className="detail-container">
          <div className="card-brand text-s-regular">{brand}</div>
          <div className="heading6 card-title">{title}</div>
          <div className="tag-price-container">
            <div className="card-tag">
              <Tag type={type} text={text} />
            </div>
            <div
              className="card-price text-s-regular"
              style={{ color: "#C2C2C2", textDecoration: "line-through" }}
            >
              Rp. {price.toLocaleString("id-ID")}
            </div>
          </div>
          <div className="card-final-price heading5">
            Rp. {finalPrice.toLocaleString("id-ID")}
          </div>
        </div>
      ) : (
        <div className="detail-container">
          <div className="card-brand text-s-regular">{brand}</div>
          <div className="card-title heading6">{title}</div>
          <div className="card-final-price normal-price heading5">
            Rp. {price?.toLocaleString("id-ID")}
          </div>
        </div>
      )}
    </div>
  );
};

export { ProductCard };
