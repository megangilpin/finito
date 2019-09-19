import React from "react";
import "./friends.css";

//add friend section

const Friends = () => {
    return (
        <>

            <form>
                <div class="form-group">
                    <label for="">Name</label>
                    <input type="User" class="form-control" id="exampleInputEmail1" aria-describedby="" placeholder="Enter name"/>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1"></label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div class="form-check">  
                    </div>
                <button type="save" class="btn btn-primary">Save</button>
            </form>

        </>
    );
}

export default Friends;
