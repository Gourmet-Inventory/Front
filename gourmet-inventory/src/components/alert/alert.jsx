import React, { useEffect, useState } from "react";
import styles from "./alert.module.css";

const Alert = ({ imgAlerta, ingrediente, onClick }) => {
  return (
    <>
      <div className={styles["card"]} onClick={onClick}>
        <div className={styles["img"]}>
          <img src={imgAlerta} />
        </div>
        <div className={styles["texto-card"]}>
          <div>{ingrediente}</div>
        </div>
      </div>
    </>
  );
};

export default Alert;
