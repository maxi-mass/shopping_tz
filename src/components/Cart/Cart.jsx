import React from "react";
import styles from "./Cart.module.scss";
import Button from "../common/Button/Button";
import OneItem from "./OneItem/OneItem";
import NewOrder from "./NewOrder/NewOrder";
import { useSelector } from "react-redux";

const Cart = ({
  cart,
  sumTotal,
  qtyChangeHandler,
  onBlurHandler,
  removeHandler,
  removeAllFromCartHandler,
}) => {
  const cartMessage = useSelector(state => state.good.cartMessage);
  return (
    <div>
      <h2>Корзина</h2>
      <ul className={styles.cart_list}>
        {cart.map(cartItem => {
          return (
            <OneItem
              key={cartItem.id}
              oneItem={cartItem}
              onBlurHandler={onBlurHandler}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          );
        })}
        {cart.length > 0 && (
          <>
            <li className={styles.cart_sum}>
              <div>
                Итого: <span>{Number(sumTotal.toFixed(2))} $</span>
              </div>
            </li>
            <li className={styles.clear_cart}>
              <Button
                onPress={removeAllFromCartHandler}
                color={"#b71c1c"}
                text={"Очистить корзину"}
              />
            </li>
            <li>
              <NewOrder />
            </li>
          </>
        )}
        {cart.length === 0 && <strong>{cartMessage}</strong>}
      </ul>
    </div>
  );
};

export default Cart;
