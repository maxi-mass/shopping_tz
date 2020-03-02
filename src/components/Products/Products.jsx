import React from "react";
import styles from "./Products.module.scss";
import Product from "./Product/Product";

const Products = ({ goods, addToCartHandler }) => {
  return (
    <div>
      <h2>Список товаров</h2>

      <ul className={styles.goods_list}>
        {goods.map(product => (
          <Product
            key={product.id}
            addToCartHandler={addToCartHandler}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
};

export default Products;
