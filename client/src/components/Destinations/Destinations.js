import React from "react";
import { Input } from "../Form";

const Destinations = (props) => {
  
  return (
    <>
      <div className="mx-3 pt-4 pb-2 mb-4 text-center header">
          <h4>Save Destinations</h4>
      </div>
      <div className="form-row mx-3">
        <div className="col-md-12 col-xs-12 pt-2">
          <Input placeholder="Address" />
        </div>
      </div>
      <div className="form-row mx-3">
        <div className="col">
          <Input placeholder="City" />
        </div>
        <div className="col">
          <Input placeholder="State" />
        </div>
      </div>
      <div className="form-group mx-3">  
        <button className="btn btn-primary w-100">Save</button>
      </div>
      <div className="py-3 mx-3 go-back" onClick={() => props.reset("Home")}>
        Return To Menu
      </div>
    </>
  );
}

export default Destinations;
