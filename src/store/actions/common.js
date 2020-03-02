import {
  LOAD_GOODS,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADD_TO_CART,
  LOAD_CART,
  LOAD_ORDERS,
  SET_CART_MESSAGE,
  UPDATE_QTY,
} from "../types";

export const loadCart = () => dispatch => {
  const savedItems = JSON.parse(localStorage.getItem("cart") || "[]");
  let cartTotal = 0;
  let sumTotal = 0;
  savedItems.forEach(item => {
    const qty = item.qty === "" ? 0 : item.qty;
    cartTotal += parseInt(qty);
    sumTotal += item.price * item.qty;
  });

  dispatch({
    type: LOAD_CART,
    payload: { cart: savedItems, cartTotal, sumTotal },
  });
};

export const addToCart = payload => dispatch => {
  const saved = JSON.parse(localStorage.getItem("cart") || "[]");
  let isAdded = false;

  const updatedCartStorage = saved.map(good => {
    if (good.name === payload.name) {
      isAdded = true;
      good.qty = good.qty + 1;
      good.quantity--;
    }

    return good;
  });

  if (isAdded) {
    localStorage.setItem("cart", JSON.stringify(updatedCartStorage));
  } else {
    saved.push({
      ...payload,
      qty: 1,
      quantity: payload.quantity - payload.difference,
    });
    localStorage.setItem("cart", JSON.stringify(saved));
  }

  dispatch({
    type: UPDATE_QTY,
    payload: {
      id: payload.id,
      difference: 1,
    },
  });
  dispatch({ type: ADD_TO_CART, payload });
};

export const removeFromCart = payload => dispatch => {
  const saved = JSON.parse(localStorage.getItem("cart") || "[]");
  const filterCartStorage = saved.filter(good => good.name !== payload.name);
  localStorage.setItem("cart", JSON.stringify(filterCartStorage));

  dispatch({ type: REMOVE_FROM_CART, payload });
  dispatch(loadCart());
};

export const removeAllFromCart = () => dispatch => {
  localStorage.setItem("cart", "[]");
  dispatch({ type: REMOVE_ALL_FROM_CART });
};

export const loadGoods = () => async dispatch => {
  const response = await fetch(
    `https://react-native-todo-app-8274c.firebaseio.com/products.json`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    },
  );
  const data = await response.json();
  const products = Object.keys(data).map(key => ({ ...data[key], hash: key }));
  dispatch({ type: LOAD_GOODS, payload: products });
};

export const addOrder = formData => async dispatch => {
  let userHash = localStorage.getItem("userHash");
  if (!userHash) {
    userHash = `f${(+new Date()).toString(16)}`;
    localStorage.setItem("userHash", userHash);
  }
  const orderItems = JSON.parse(localStorage.getItem("cart") || "[]");

  const preparedQueries = updateProductQty(orderItems);
  await Promise.all(preparedQueries.map(q => q()));

  const newLead = {
    userId: userHash,
    customer_name: formData.customer_name,
    customer_phone: formData.customer_phone,
    order: orderItems,
    sumTotal: formData.sumTotal.toFixed(2),
    date: new Date().toJSON(),
  };
  try {
    await fetch(
      `https://react-native-todo-app-8274c.firebaseio.com/orders.json`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newLead),
      },
    );
  } finally {
    dispatch(removeAllFromCart());
  }
};

/*
 * Поскольку нет логики на беке, то остатки товаров после заказа меняю с фронта
 * */
export const updateProductQty = orderItems =>
  orderItems.map(item => () =>
    fetch(
      `https://react-native-todo-app-8274c.firebaseio.com/products/${item.hash}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: item.quantity,
        }),
      },
    ),
  );

export const loadOrders = () => async dispatch => {
  dispatch(setCartMessage("Корзина пуста"));
  const userHash = localStorage.getItem("userHash");
  const response = await fetch(
    `https://react-native-todo-app-8274c.firebaseio.com/orders.json`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    },
  );

  const data = (await response.json()) || [];
  const orders = Object.keys(data).map(key => ({ ...data[key] }));
  const filteredOrders = orders.filter(order => order.userId === userHash);
  dispatch({ type: LOAD_ORDERS, payload: filteredOrders.reverse() });
};

export const setQtyGoods = payload => dispatch => {
  const savedItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCartStorage = savedItems.map(item => {
    if (item.name === payload.name) {
      item.qty = payload.qty;
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCartStorage));
  dispatch(loadCart());
};

export const setCartMessage = payload => dispatch => {
  dispatch({
    type: SET_CART_MESSAGE,
    payload,
  });
};
