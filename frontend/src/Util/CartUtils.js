import { Modal } from "antd";

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  //calculate shipping price
  state.shippingPrice = addDecimals(state.shippingPrice || 0);

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
};

export const formatRupiah = (num) => {
  return `Rp ${Number(num).toLocaleString("id-ID")}`;
};

export const DeleteItemConfirmation = ({
  open,
  onOk,
  onClose,
  description,
}) => {
  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        okText="Remove"
        cancelText="Cancel"
      >
        <h3>Remove Item?</h3>
        <p>{description}</p>
      </Modal>
    </>
  );
};
