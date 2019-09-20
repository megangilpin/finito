import React from "react";
import "./Transportation.css"

const Transportation = (props) => {
    return (
        <> 
            <div className="m-3">
                <div className="button mx-3 no-gutters rounded row" id="transportationMethod">
                    <div onClick={() => props.handleTransportationMethod("Foot")} className={props.transportationMethod === "Foot" ? "selected col-4 rounded-left text-center active" : "bg-light col-4 rounded-left text-center"}> 
                        Foot
                    </div>
                    <div onClick={() => props.handleTransportationMethod("Bike")} className={props.transportationMethod === "Bike" ? "selected col-4 text-center active" : "bg-light col-4 text-center"}> 
                        Bike
                    </div>
                    <div onClick={() => props.handleTransportationMethod("Car")} className={props.transportationMethod === "Car" ? "selected col-4 rounded-right text-center active" : "bg-light col-4 rounded-right text-center"}> 
                        Car
                    </div>
                </div>  
            </div>
        </>
    ) 
} 

export default Transportation