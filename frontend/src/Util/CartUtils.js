export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  //calculate shipping price (if order over 100000 then free, else 10000 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100000 ? 0 : 10000);

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
};

export const formatRupiah = (num) => {
  return `Rp ${Number(num).toLocaleString("id-ID")}`;
}