import React from "react";
import styles from "./OrderItem.module.scss";

const OrderItem = ({ orderItem }) => {
  return (
    <div className={styles.order_item}>
      <div className={styles.item_image}>
        <img src={orderItem.imageUrl} alt="img" />
      </div>
      <div className={styles.item_name}>{orderItem.name}</div>
      <div className={styles.item_qty}>{orderItem.qty}</div>
    </div>
  );
};

export default OrderItem;
