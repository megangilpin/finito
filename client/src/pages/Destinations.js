import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Destinations extends Component {
  state = {
    name: [],
    address: "",
    city: "",
    st: "",
};

  componentDidMount() {
    this.loadDestination ();
  }

  loadDestination = () => {
    API.getDestination()
      .then(res =>
        this.setState({ destinations: res.data, name: "", address: "", city: "", st: ""})
      )
      .catch(err => console.log(err));
  };

  deleteDestination = id => {
    API.deleteDestination (id)
      .then(res => this.loadDestination())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.address && this.state.city && this.state.st) {
      API.saveDestination({
        name: this.state.name,
        address: this.state.address,
      })
        .then(res => this.loadDestination())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="Destination"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="Address"
                placeholder="Address (required)"
              />
               <Input
                value={this.state.city}
                onChange={this.handleInputChange}
                name="City"
                placeholder="City (required)"
              />
              <Input
                value={this.state.st}
                onChange={this.handleInputChange}
                name="State"
                placeholder="State (required)"
              />
             
              <FormBtn
                disabled={!(this.state.name && this.state.address && this.state.city && this.state.st)}
                onClick={this.handleFormSubmit}
              >
                Save 
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
           
            {this.state.destination.length ? (
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
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Destination;