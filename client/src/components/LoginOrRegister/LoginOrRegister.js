import React from "react";

const renderTabs = (props) => {
    return  (
     <div className="row">
        <div onClick={() => props.handlePageChange("Login")} className={props.currentPage === "Login" ? "button-color col-6 text-center py-3 boxes" : "col-6 text-center py-3 boxes"}>
            Login
        </div>
        <div onClick={() => props.handlePageChange("Register")} className={props.currentPage === "Register" ? "button-color col-6 text-center py-3 boxes" : "col-6 text-center py-3 boxes"}>
            Register
        </div>
    </div>
    )
};

export default renderTabs;