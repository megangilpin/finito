import React from "react";
import "./Transportation.css"

const Transportation = (props) => {
    return (
        <> 
            <div className="m-3">
                <div className="border button mx-3 no-gutters rounded row">
                    <div className={props.transportationMethod === "Foot" ? "bg-dark border-right col-4 text-center" : "border-right col-4 text-center"}> 
                        <a href="#" onClick={() => props.handleTransportationMethod("Foot")}>Foot</a>
                    </div>
                    <div className={props.transportationMethod === "Bike" ? "bg-dark col-4 text-center" : "col-4 text-center"}> 
                            <a href="#" onClick={() => props.handleTransportationMethod("Bike")}>Bike</a>
                    </div>
                    <div className={props.transportationMethod === "Car" ? "bg-dark border-left col-4 text-center" : ""}> 
                        <a href="#" onClick={() => props.handleTransportationMethod("Car")}>Car</a>
                    </div>
                </div>  
            </div>
        </>
    ) 
} 

export default Transportation