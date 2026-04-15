import React, { memo } from "react";
import { InputNumber } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { formatRupiah } from "../../../Util/CartUtils";
import { updateCartQuantity } from "../../../Slices/cartSlice";

const CartItem = ({ item, onDelete }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-popup-item">
      {/* IMAGE */}
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="cart-popup-image"
      />

      {/* INFO */}
      <div className="cart-popup-info">
        <div className="cart-popup-title heading6">
          {item.productName} - {item.size}
        </div>

        {/* QUANTITY */}
        <div className="cart-popup-quantity">
          <button
            disabled={item.quantity === 1}
            onClick={() =>
              dispatch(
                updateCartQuantity({
                  id: item._id,
                  quantity: item.quantity - 1,
                }),
              )
            }
          >
            -
          </button>

          <InputNumber
            min={1}
            max={item.stock}
            value={item.quantity}
            controls={false}
            onChange={(val) =>
              dispatch(
                updateCartQuantity({
                  id: item._id,
                  quantity: val,
                }),
              )
            }
          />

          <button
            disabled={item.quantity === item.stock}
            onClick={() =>
              dispatch(
                updateCartQuantity({
                  id: item._id,
                  quantity: item.quantity + 1,
                }),
              )
            }
          >
            +
          </button>
        </div>

        {/* PRICE */}
        <div className="cart-popup-price">
          <span className="cart-popup-final-price heading6">
            {formatRupiah(item.isDiscount ? item.discountPrice : item.price)}
          </span>

          {item.isDiscount && (
            <>
              <span className="cart-discount text-m-medium">
                {item.discount}%
              </span>
              <span className="original-price text-m-regular">
                {formatRupiah(item.originalPrice)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* DELETE */}
      <FiTrash2 className="cart-popup-delete" onClick={() => onDelete(item)} />
    </div>
  );
};

export default memo(CartItem);
