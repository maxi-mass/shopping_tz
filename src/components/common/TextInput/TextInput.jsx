import React from "react";
import styles from "./TextInput.module.scss";

const TextInput = ({ value, onChange, onBlur, ...props }) => {
  return (
    <div className={styles.text_input_wrap}>
      <input
        {...props}
        className={styles.text_input}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextInput;
