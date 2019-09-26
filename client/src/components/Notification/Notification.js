import React from "react";
import "./Notification.css";

const Notification = (props) => {
    return (
        <>
            <div className="row">
                {/* <div className="col-md-12 col-xs-12 pt-4">
                    <label><strong>Contact</strong></label>
                </div>
                <div className="col-md-12 col-xs-12">
                    <input className="w-100 form-control mb-2" type="text" id="phoneNumber" placeholder="123-555-5555" required/>
                </div> */}
                
                <div className="col-md-12 col-xs-12">
                    <button id="notification" onClick={props.onClick}className="btn btn-primary mt-3 w-100">Start</button> 
                </div>
                <div className="col-md-12 col-xs-12 py-3 text-danger text-center" id="error">
                </div>
            </div>
        </>
    );
}

export default Notification;
