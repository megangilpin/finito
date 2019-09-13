import React from "react";
import "./Login.css";

const Login = () => {
    return (
        <>
            <h1 className="py-4">Login</h1>
            <form action="/login" method="post">
                <div className="row">
                    <div className="col-1 py-2">
                        <label>Username:</label>
                    </div>
                    <div className="col-11">
                        <input className="w-100 form-control mb-2" type="text" id="loginUsername" name="username" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 py-2">
                        <label>Password:</label>
                    </div>
                    <div className="col-11">
                        <input className="w-100 form-control" type="password" id="loginPassword" name="password" required/>
                    </div>
                </div>
                <div className="mt-4 mb-5">
                    <input className="btn btn-primary w-100" type="submit" id="login" value="Log In"/>
                </div>
            </form>
        </>
    );
}

export default Login;
