import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../store/actions/common";
import OrdersList from "../components/Orders/Orders";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.good.orders);
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  return <OrdersList orders={orders} />;
};

export default Orders;
