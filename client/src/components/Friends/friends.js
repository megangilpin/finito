import React from "react";
import "./Friends.css";

const Friends = (props) => {
    console.log(props)
    return (
        <>
            <div className="mx-3 pt-4 pb-2 mb-4 text-center header">
                <h4>Save friends</h4>
            </div>
            <div className="form-group mx-3">
                <input className="form-control" id="nickname" placeholder="Nickname"/>
            </div>
            <div className="form-group mx-3">
                <input className="form-control" id="phoneNumber" placeholder="123-555-5555"/>
            </div>
            <div className="form-group mx-3">  
                <button className="btn btn-primary w-100">Save</button>
            </div>
            <div className="py-3 mx-3 go-back" onClick={() => props.reset("Home")}>
                Return To Menu
            </div>
        </>
    );
}

export default Friends;
