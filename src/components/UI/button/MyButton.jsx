import React from "react";
import classes from "./MyButton.module.sass"

const MyButton = ({children, ...props}) => {
    return (
        <button className={classes.myBtn} {...props}>
            {children}
        </button>
    )
}

export default MyButton