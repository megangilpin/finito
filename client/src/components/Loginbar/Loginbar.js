import React from "react";

const renderTabs = (props) => {
    return  (
     <div className="row">
        <div className={props.currentPage === "Login" ? "col-6 text-center py-3 boxes bg-light" : "col-6 text-center py-3 boxes"}>
            <a href="#login" onClick={() => props.handlePageChange("Login")}>Login</a>
        </div>
        <div className={props.currentPage === "Register" ? "col-6 text-center py-3 boxes bg-light" : "col-6 text-center py-3 boxes"}>
        <a href="#register" onClick={() => props.handlePageChange("Register")}
                className={props.currentPage === "Register" ? "reg" : ""}>Register</a>
        </div>
    </div>
    )
};

export default renderTabs;