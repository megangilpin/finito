import React from "react";
import "./Transportation.css"

class Transportation extends React.Component {

state = {
    transportationMethod: "Car",
  }

handleTransportationMethod = method => {
    this.setState({ transportationMethod: method });
};

render() {
    return (
        <> 
            <div className="m-3">
                <div className="button mx-3 no-gutters rounded row" id="transportationMethod">
                    <div onClick={() => this.handleTransportationMethod("Foot")} className={this.state.transportationMethod === "Foot" ? "selected col-4 rounded-left text-center active" : "bg-light col-4 rounded-left text-center"}> 
                        Foot
                    </div>
                    <div onClick={() => this.handleTransportationMethod("Bike")} className={this.state.transportationMethod === "Bike" ? "selected col-4 text-center active" : "bg-light col-4 text-center"}> 
                        Bike
                    </div>
                    <div onClick={() => this.handleTransportationMethod("Car")} className={this.state.transportationMethod === "Car" ? "selected col-4 rounded-right text-center active" : "bg-light col-4 rounded-right text-center"}> 
                        Car
                    </div>
                </div>  
            </div>
        </>
    ) 
} 
}
export default Transportation