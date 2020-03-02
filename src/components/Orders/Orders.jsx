import React from "react";
import styles from "./Orders.module.scss";
import Order from "./Order/Order";

const Orders = ({ orders }) => {
  return (
    <div className={styles.orders}>
      <h2>Мои заказы</h2>
      {orders.length === 0 ? (
        <div>
          <strong>У Вас пока нет заказов</strong>
        </div>
      ) : (
        <table className={styles.orders_table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Дата</th>
              <th>Заказ</th>
              <th>Общая сумма</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, ix) => (
              <Order key={ix} num={ix + 1} order={order} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
