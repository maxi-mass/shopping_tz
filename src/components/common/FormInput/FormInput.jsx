import React from "react";
import styles from "./FormInput.module.scss";

const FormInput = ({
  input,
  meta: { touched, error },
  placeholder,
  ...props
}) => {
  const hasError = error && touched;
  return (
    <div className={styles.text_input_wrap}>
      <div>
        <input
          className={
            hasError
              ? `${styles.text_input} ${styles.error}`
              : styles.text_input
          }
          {...input}
          placeholder={placeholder}
        />
      </div>
      <div className={styles.error_message}>{hasError && error}</div>
    </div>
  );
};

export default FormInput;
