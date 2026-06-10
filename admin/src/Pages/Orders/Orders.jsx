import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchAllOrders } from "../../Util/apiService.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await fetchAllOrders();
      setOrders(response);
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  console.log({ orders });

  return (
    <>
      <div>This is the Orders page</div>
    </>
  );
};

export default Orders;
