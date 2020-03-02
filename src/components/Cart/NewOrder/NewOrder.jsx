import React from "react";
import styles from "./NewOrder.module.scss";
import { reduxForm } from "redux-form";
import Form from "./Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, setCartMessage } from "../../../store/actions/common";
import { useHistory } from "react-router-dom";

const ReduxForm = reduxForm({ form: "order" })(Form);

const NewOrder = () => {
  const history = useHistory();
  const sumTotal = useSelector(state => state.good.sumTotal);
  const dispatch = useDispatch();
  const onSubmit = formData => {
    formData.sumTotal = sumTotal;
    dispatch(addOrder(formData));
    dispatch(
      setCartMessage(
        "Спасибо, сейчас вы будете перенаправлены на страницу заказов...",
      ),
    );
    setTimeout(() => history.push("/orders"), 2500);
  };
  return (
    <div className={styles.new_order}>
      <ReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewOrder;
