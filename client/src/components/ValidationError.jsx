import React from "react";
import "../assets/ValidationError.css"

const ValidationError = ({title, description, isVisible}) => {
    return(
        <div className="ValidationError-container" style={{display: isVisible ? "flex" : "none"}}>
            <span className="ValidationError-title">{title}</span>
            <span className="ValidationError-description">{description}</span>
        </div>
    )
}

export default ValidationError;