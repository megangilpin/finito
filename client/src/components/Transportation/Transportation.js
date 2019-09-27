import React from "react";
import "./Transportation.css"

class Transportation extends React.Component {

state = {
    transportationMethod: "Car",
  }

handleTransportationMethod = method => {
    this.setState({ transportationMethod: method });
    this.props.transportationType(method)
};

render() {
    return (
        <> 
            <div className="py-3">
                <div className="button no-gutters rounded row" id="transportationMethod">
                    <div onClick={() => this.handleTransportationMethod("walking")} className={this.state.transportationMethod === "walking" ? "selected col-4 rounded-left text-center active" : "bg-light col-4 rounded-left text-center"}> 
                        Foot
                    </div>
                    <div onClick={() => this.handleTransportationMethod("Transit")} className={this.state.transportationMethod === "Transit" ? "selected col-4 text-center active" : "bg-light col-4 text-center"}> 
                        Transit
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