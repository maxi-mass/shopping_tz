import React from "react";
import styles from "./AddToCartIcon.module.scss";

const AddToCartIcon = ({ onPress }) => {
  return <div onClick={onPress} className={styles.cart_icon} />;
};

export default AddToCartIcon;
