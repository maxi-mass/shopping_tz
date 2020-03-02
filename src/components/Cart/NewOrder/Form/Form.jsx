import React from "react";
import styles from "./Form.module.scss";
import { Field } from "redux-form";
import Button from "../../../common/Button/Button";
import FormInput from "../../../common/FormInput/FormInput";

const required = value => {
  return value ? undefined : "Данное поле обязательно для заполнения";
};
const Form = ({ handleSubmit }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <Field
          placeholder={"Ваш телефон"}
          name={"customer_phone"}
          component={FormInput}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Ваше ФИО"}
          name={"customer_name"}
          component={FormInput}
          validate={[required]}
        />
      </div>

      <div>
        <Button color={"#000"} onPress={() => {}} text={"Оформить заказ"} />
      </div>
    </form>
  );
};

export default Form;
