import React from "react"
import { Input } from "../Form";

const Address = () => { 
    return (
        <>
            <div className="row mx-3"> 
              <div className="col">
                <label><strong>Address</strong></label>
              </div>
            </div>

            <div className="form-row mx-4">
              <div className="col-md-12 col-xs-12 pt-2"> 
                <Input className="form-control no-gutters" id="address" placeholder="Address" /> 
              </div>
            </div>
    
            <div className="form-row mx-4">
              <div className="col">
                <Input className="form-control no-gutters" id="city" placeholder="City" /> 
              </div>
              <div className="col">
                <Input className="form-control no-gutters" id="zip" placeholder="Zip" /> 
              </div>
            </div>
        </>
    )
}

export default Address