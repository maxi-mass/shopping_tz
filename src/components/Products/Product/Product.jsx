import React from "react";
import styles from "./Product.module.scss";
import AddToCartIcon from "../../common/AddToCartIcon/AddToCartIcon";

const Product = ({ product, addToCartHandler }) => {
  return (
    <li key={product.name} className={styles.good_item}>
      <div>
        <img src={product.imageUrl} alt="product" />
      </div>
      <div>{product.name}</div>
      <div>{product.price} $</div>
      <div>{product.quantity}</div>
      <div>
        <AddToCartIcon onPress={() => addToCartHandler(product)} />
      </div>
    </li>
  );
};

export default Product;
