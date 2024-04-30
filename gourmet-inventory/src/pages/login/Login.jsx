import React from "react";
import styles from "./Login.module.css";
import imgBack from "../../"

const Login = () => {
    return (
        <>
            <img src={imgBack}  alt="" />
            <div className={styles ["form"]} >
                <span>Lorem ipsum dolor sit amet consectetur adipisicing eli
                    t. Sunt odit, ut vitae suscipit incidunt dolorum ullam recusandae tempora cumque corporis quidem repellendus quibusdam! Repellendus vitae accusantium aliquam. Similique, error voluptatum!</span>
            </div>
        </>
    )
};

export default Login;

