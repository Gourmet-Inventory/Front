import React, { Children, useEffect, useState } from "react";
import styles from "./modalSaida.module.css";

function ModalSaida({isOpen, children}) {
    

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                    
                
                    {children}
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalSaida;