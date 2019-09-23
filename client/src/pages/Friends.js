import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Users extends Component {
  state = {
    name: [],
    phoneNumber: "",
};

  componentDidMount() {
    this.loadUser ();
  }

  loadUser = () => {
    API.getUser()
      .then(res =>
        this.setState({ friends: res.data, name: "", phoneNumber: ""})
      )
      .catch(err => console.log(err));
  };

  deleteUser = id => {
    API.deleteUser (id)
      .then(res => this.loadUser())
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
    if (this.state.name && this.state.phoneNumber) {
      API.saveUser({
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
      })
        .then(res => this.loadUser())
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
                name="Friend"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                name="Phone Number"
                placeholder="Phone Number (required)"
              />
             
              <FormBtn
                disabled={!(this.state.name && this.state.phoneNumber)}
                onClick={this.handleFormSubmit}
              >
                Save 
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
           
            {this.state.Users.length ? (
              <List>
                {this.state.users.map(book => (
                  <ListItem key={this.state.user._id}>
                    <Link to={"/friend/" + user._id}>
                      
                    </Link>
                    <DeleteBtn onClick={() => this.deleteUser(user._id)} />
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

export default Friends;
