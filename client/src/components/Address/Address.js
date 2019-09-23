import React from "react"
import { Input } from "../Form";

const Address = () => { 
    return (
        <>
            <div className="row"> 
              <div className="col">
                <label><strong>Address</strong></label>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-12 col-xs-12 pt-2"> 
                <Input className="form-control no-gutters" id="address" placeholder="Address (required)" /> 
              </div>
            </div>
    
            <div className="form-row">
              <div className="col">
                <Input className="form-control no-gutters" id="city" placeholder="City (required)" /> 
              </div>
              <div className="col">
                <Input className="form-control no-gutters" id="state" placeholder="State (required)" /> 
              </div>
            </div>
        </>
    )
}

export default Address