import React from "react";
import "./Notification.css";

const Notification = (props) => {
    return (
        <>
            <div className="row">             
                <div className="col-md-12 col-xs-12">
                    <button id="notification" onClick={props.onClick} disabled={props.isDisabled} className="btn btn-primary mt-3 w-100">{props.buttonText}</button> 
                </div>
                <div className="col-md-12 col-xs-12 py-3 text-danger text-center" id="error">
                </div>
            </div>
        </>
    );
}

export default Notification;
