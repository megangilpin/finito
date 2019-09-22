import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Destinations extends Component {
  state = {
    name: [],
    searchAddress: "",
    searchCity: "",
    st: "",
    nickName: ""
};

  componentDidMount() {
    // this.loadDestination ();
  }

  // loadDestination = () => {
  //   API.getDestination()
  //     .then(res =>
  //       this.setState({ destinations: res.data, name: "", address: "", city: "", st: ""})
  //     )
  //     .catch(err => console.log(err));
  // };

  // deleteDestination = id => {
  //   API.deleteDestination (id)
  //     .then(res => this.loadDestination())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // gets the Lat and Long from the google API
  getGeocode = () => {
    let address = {
      address: this.state.searchAddress.trim(),
      city: this.state.searchCity.trim(),
      state: this.state.st.trim(),
      nickName: this.state.nickName.trim()
    }
    console.log(address)
    API.getGeocode({
      address
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState(() => ({
          googleAddress: res.data[0].formatted_address,
          geocodeLocation: [{ lat: (res.data[0].geometry.location.lat), lng: (res.data[0].geometry.location.lng) }]
        }));
        console.log("Address from google: " + this.state.googleAddress)
        console.log("New address: " + this.state.geocodeLocation)
      })
      .catch(err => console.log(err));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.nickName && this.state.searchAddress && this.state.searchCity && this.state.st) {
      let address = {
        address: this.state.searchAddress.trim(),
        city: this.state.searchCity.trim(),
        state: this.state.st.trim(),
        nickName: this.state.nickName.trim()
      }

      API.saveDestination({ address })
        .then(res => this.loadDestination())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 xs-12">
            
            <form>
              <div className="row mx-3">
                <div className="col">
                  <label><strong>Add Address</strong></label>
                </div>
              </div>

              <div className="form-row mx-4">
                <div className="col-md-12 col-xs-12 pt-2">
                  <Input
                    value={this.state.searchAddress || ''}
                    onChange={this.handleInputChange}
                    name="searchAddress"
                    placeholder="Address (required)"
                    type="text"
                  />
                </div>
              </div>

              <div className="form-row mx-4">
                <div className="col">
                  <Input
                    value={this.state.searchCity || ''}
                    onChange={this.handleInputChange}
                    name="searchCity"
                    placeholder="City (required)"
                    type="text"
                  />
                </div>
                <div className="col">
                  <Input
                    value={this.state.st}
                    onChange={this.handleInputChange || ''}
                    name="st"
                    placeholder="State (required)"
                    type="text"
                  />
                </div>
                <div className="col">
                  <Input
                    value={this.state.nickName || ''}
                    onChange={this.handleInputChange}
                    name="nickName"
                    placeholder="Nick Name (required)"
                    type="text"
                  />
                </div>
              </div>
            </form>
             
              {/* <FormBtn
                disabled={!(this.state.name && this.state.address && this.state.city && this.state.st)}
                onClick={this.handleFormSubmit}
              >
                Save 
              </FormBtn> */}

          </Col>
          <Col size="md-6 sm-12">
           
            {/* {this.state.destination.length ? (
              <List>
                {this.state.destinations.map(book => (
                  <ListItem key={destination._id}>
                    <Link to={"/destination/" + friend._id}>
                      <strong>
                        {} by {}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteDestination(destination._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

<<<<<<< HEAD
export default Destination;
=======
export default Destinations;
>>>>>>> 61e02c1862616cc425dbc6f615d6e6a5c28fceb5
