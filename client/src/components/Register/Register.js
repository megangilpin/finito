import React from "react";
import "./Register.css";

const Register = () => {
    return (
        <div className="px-5 py-5 row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <label>Email:</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="w-100 form-control mb-2" type="text" id="registerUsername" name="username" required/>
                        </div> 
                </div>
                <div className="row">
                    <div className="col">
                        <label>Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="w-100 form-control" type="password" id="registerPassword" name="password" required/>
                    </div>
                </div>
                <div className="mt-4">
                    <input className="btn btn-primary w-100" type="submit" id="register" value="Register" />
                </div>
                <div id="error" className="py-2 text-danger text-center"></div> 
            </div>
        </div>
    );
}

export default Register;
