import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import CartIcon from "../common/CartIcon/CartIcon";

const NavBar = () => {
  const cartTotal = useSelector(state => state.good.cartTotal);
  const sumTotal = useSelector(state => state.good.sumTotal);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__left}>
        <div>
          <NavLink
            exact
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
            to="/">
            Список товаров
          </NavLink>
        </div>
        <div>
          <NavLink
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
            to="/orders">
            Мои заказы
          </NavLink>
        </div>
        <div>
          <NavLink
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
            to="/cart">
            Корзина
          </NavLink>
        </div>
      </div>
      <div className={styles.navbar__right}>
        <div>{sumTotal > 0 && Number(sumTotal.toFixed(2)) + " $"}</div>
        <div>
          <CartIcon qty={cartTotal} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
