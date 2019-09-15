import React from "react";
import "./Register.css";

const Register = () => {
    return (
        <>
            <h1 className="py-4">Register</h1>
            <div className="row">
                <div className="col-1 py-2">
                    <label>Username</label>
                </div>
                <div className="col-11">
                    <input className="w-100 form-control mb-2" type="text" id="registerUsername" name="username" required/>
                </div>
            </div>
            <div className="row">
                <div className="col-1 py-2">
                    <label>Password</label>
                </div>
                <div className="col-11">
                    <input className="w-100 form-control" type="password" id="registerPassword" name="password" required/>
                </div>
            </div>
            <div className="mt-4 pb-5">
                <input className="btn btn-primary w-100" type="submit" id="register" value="Register" />
            </div>
        </>
    );
}

export default Register;
