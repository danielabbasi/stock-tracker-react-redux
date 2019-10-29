import React from "react";

const ErrorMessage = ({ feature }) => {

    return (
        <div>
            <p className="error__message">
                Error: {feature} can not be displayed
            </p>
        </div>
    )
};

export default ErrorMessage;