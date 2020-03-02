import React from "react";
import { Link } from "react-router-dom";
import styles from "./CartIcon.module.scss";

const CartIcon = ({ qty }) => {
  return (
    <Link to="/cart">
      <div className={styles.cart_icon}>
        {qty > 0 && <div className={styles.cart_qty}>{qty}</div>}
      </div>
    </Link>
  );
};

export default CartIcon;
