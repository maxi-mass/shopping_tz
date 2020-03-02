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

const initialState = {
  cart: [],
  cartMessage: "Корзина пуста",
  goods: [],
  orders: [],
  cartTotal: 0,
  sumTotal: 0,
};

export const good = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let isAdded = false;
      const updatedCart = [...state.cart].map(good => {
        if (good.name === action.payload.name) {
          isAdded = true;
          good.qty++;
        }
        return good;
      });

      return isAdded
        ? {
            ...state,
            cart: updatedCart,
            cartTotal: state.cartTotal + 1,
            sumTotal:
              Number(state.sumTotal.toFixed(2)) +
              Number(action.payload.price.toFixed(2)),
          }
        : {
            ...state,
            cart: [{ ...action.payload, qty: 1 }, ...state.cart],
            cartTotal: state.cartTotal + 1,
            sumTotal:
              Number(state.sumTotal.toFixed(2)) +
              Number(action.payload.price.toFixed(2)),
          };
    }

    case LOAD_CART: {
      return {
        ...state,
        cart: [...action.payload.cart],
        cartTotal: action.payload.cartTotal,
        sumTotal: action.payload.sumTotal,
      };
    }

    case REMOVE_FROM_CART: {
      console.log(state.sumTotal, action.payload);
      return {
        ...state,
        cart: state.cart.map(good => {
          if (good.name === action.payload.name && good.qty > 0) {
            good.qty = good.qty - 1;
          }
          return good;
        }),
        cartTotal: state.cartTotal - 1,
        sumTotal:
          Number(state.sumTotal.toFixed(2)) -
          Number(action.payload.price.toFixed(2)),
      };
    }

    case REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        sumTotal: 0,
      };
    }

    case LOAD_GOODS: {
      return {
        ...state,
        goods: action.payload,
      };
    }

    case LOAD_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }

    case SET_CART_MESSAGE: {
      return {
        ...state,
        cartMessage: action.payload,
      };
    }

    case UPDATE_QTY: {
      return {
        ...state,
        goods: [...state.goods].map(product => {
          if (product.id === action.payload.id) {
            product.quantity = product.quantity - action.payload.difference;
          }
          return product;
        }),
      };
    }

    default:
      return state;
  }
};
