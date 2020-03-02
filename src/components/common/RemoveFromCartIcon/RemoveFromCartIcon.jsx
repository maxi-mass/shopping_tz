import React from "react";
import styles from "./RemoveFromCartIcon.module.scss";

const RemoveFromCartIcon = ({ onPress }) => {
  return <div onClick={onPress} className={styles.cart_icon} />;
};

export default RemoveFromCartIcon;
