import React, { Children, useEffect, useState } from "react";
import styles from "./ModalAlertas.module.css";

function modalAlertas({isOpen, setModalOpen, children}) {
    

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>
                    {children}
                    
                    </div>
                </div>
            </>
        )
    }

    return null;
   
}

export default modalAlertas;