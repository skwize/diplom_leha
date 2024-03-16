import React from "react";
import "../assets/ActionButton.css"

const ActionButton = ({title, isDisabled, handle}) => {
    return (
        <button
            type="button"
            className="ActionButton"
            disabled={isDisabled}
            onClick={handle}
        >{title}</button>
    )
}

export default ActionButton;