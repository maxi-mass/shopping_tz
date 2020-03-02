import React from "react";
import styles from "./Order.module.scss";
import OrderItem from "./OrderItem/OrderItem";

const Order = ({ order, num }) => {
  return (
    <tr className={styles.order}>
      <td>{num}</td>
      <td>{new Date(order.date).toLocaleString()}</td>
      <td>
        {order.order.map((orderItem, ix) => (
          <OrderItem orderItem={orderItem} key={ix} />
        ))}
      </td>
      <td>{order.sumTotal} $</td>
    </tr>
  );
};

export default Order;
