import React from "react";
import "./Notification.css";

const Notification = () => {
    return (
        <>
            <h1 className="py-4">Send Text</h1>
            <div className="row">
                    <div className="col-1 py-2">
                        <label>Phone#:</label>
                    </div>
                    <div className="col-11">
                        <input className="w-100 form-control mb-2" type="text" id="phoneNumber" name="phoneNumber" required/>
                    </div>
                </div>
            <button id="notification" className="btn btn-primary mt-4 w-100">Start</button> 
        </>
    );
}

export default Notification;
