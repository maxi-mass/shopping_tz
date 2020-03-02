import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, loadCart, loadGoods } from "../store/actions/common";
import GoodsList from "../components/Products/Products";

const Products = () => {
  const dispatch = useDispatch();
  const goods = useSelector(state => state.good.goods);
  useEffect(() => {
    if (goods.length === 0) {
      dispatch(loadGoods());
    }

    dispatch(loadCart());
  }, [dispatch, goods.length]);

  const onAdd = good => {
    good.difference = 1;
    dispatch(addToCart(good));
  };

  return <GoodsList addToCartHandler={onAdd} goods={goods} />;
};

export default Products;
