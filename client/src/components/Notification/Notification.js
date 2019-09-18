import React from "react";
import "./Notification.css";

const Notification = () => {
    return (
        <>
            <div className="row mx-3">
                <div className="col-md-12 col-xs-12 pt-4">
                    <label>Phone number:</label>
                </div>
                <div className="col-md-12 col-xs-12">
                    <input className="w-100 form-control mb-2" type="text" id="phoneNumber" name="phoneNumber" required/>
                </div>
                <div className="col-md-12 col-xs-12">
                    <button id="notification" className="btn btn-primary mt-3 w-100">Start</button> 
                </div>
            </div>
            
        </>
    );
}

export default Notification;
