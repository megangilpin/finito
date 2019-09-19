import React from "react";
import "./friends.css";

//add friend section

const Friends = () => {
    return (
        <>

            <form>
                <div class="form-group">
                    <label for="">Name</label>
                    <input type="User" class="form-control" id="" aria-describedby="" placeholder="Enter name"/>
                    <small id="" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="">Phone Number</label>
                    <input type="phoneNumber" class="form-control" id="" placeholder="Enter Phone Number Here"/>
                </div>
                <div class="form-check">  
                    </div>
                <button type="save" class="btn btn-primary">Save</button>
            </form>

        </>
    );
}

export default Friends;
