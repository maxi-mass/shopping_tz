import React from "react";
import styles from "./OneItem.module.scss";
import RemoveFromCartIcon from "../../common/RemoveFromCartIcon/RemoveFromCartIcon";

const OneItem = ({ oneItem, removeHandler }) => {
  return (
    <div>
      <li key={oneItem.name} className={styles.cart_item}>
        <div>
          <img src={oneItem.imageUrl} alt="cart-item" />
        </div>
        <div>{oneItem.name}</div>
        <div>{oneItem.price} $</div>
        <div>{oneItem.qty}</div>
        <RemoveFromCartIcon onPress={() => removeHandler(oneItem)} />
      </li>
    </div>
  );
};

export default OneItem;
