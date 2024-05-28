import React, { useEffect, useState } from "react";
import styles from "./ImgConfig.module.css";
import imgConfig from "../../utils/assets/ImgConfig.svg"

const ImgConfig = () => {
    return (
        <>
           <div className={styles["imgConfig"]}>
            <img src={imgConfig}/>
           </div>
        </>
    )
};

export default ImgConfig;