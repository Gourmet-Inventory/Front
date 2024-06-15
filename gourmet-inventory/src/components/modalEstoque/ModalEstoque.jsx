import React, { Children, useEffect, useState } from "react";
import styles from "./ModalEstoque.module.css";

function ModalEstoque({isOpen, setModalOpen, children}) {
    

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

export default ModalEstoque;