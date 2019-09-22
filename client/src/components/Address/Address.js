import React from "react"
import { Input } from "../Form";

class Address extends React.Component { 
  render() {
    return (
        <>
            <div className="row"> 
              <div className="col">
                <label><strong>Address</strong></label>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-12 col-xs-12 pt-2"> 
                <Input className="form-control no-gutters" forwardref="address" placeholder="Address" /> 
              </div>
            </div>
    
            <div className="form-row">
              <div className="col">
                <Input className="form-control no-gutters" forwardref="city" placeholder="City" /> 
              </div>
              <div className="col">
                <Input className="form-control no-gutters" forwardref="state" placeholder="State" /> 
              </div>
            </div>
        </>
    )
}
}

export default Address