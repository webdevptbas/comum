import React from "react";
import "./Card.css";
import Tag from "../Tag/Tag";

const ProductCard = ({
  title,
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
        <img src={src} alt={title} />
      </div>
      {isDiscount ? (
        <div className="detail-container">
          <div className="card-title">{title}</div>
          <div className="tag-price-container">
            <div className="card-tag">
              <Tag type={type} text={text} />
            </div>
            <div className="card-price" style={{ color: "#C2C2C2" }}>
              Rp. {price.toLocaleString("id-ID")}
            </div>
          </div>
          <div className="card-final-price">
            Rp. {finalPrice.toLocaleString("id-ID")}
          </div>
        </div>
      ) : (
        <div className="detail-container">
          <div className="card-title">{title}</div>
          <div className="card-price" style={{ color: "#344EAD" }}>
            Rp. {price.toLocaleString("id-ID")}
          </div>
          {/* <div className="card-tag">
            <Tag type={type} text={text} />
          </div> */}
        </div>
      )}
    </div>
  );
};

export { ProductCard };
