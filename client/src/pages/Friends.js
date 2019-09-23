import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Friends extends Component {
  state = {
    name: [],
    phoneNumber: "",
  };

  componentDidMount() {
    this.loadFriend ();
  }

  loadFriend = () => {
    API.getFriend()
      .then(res =>
        this.setState({ friends: res.data, name: "", phoneNumber: ""})
      )
      .catch(err => console.log(err));
  };

  deleteFriend = id => {
    API.deleteFriend (id)
      .then(res => this.loadFriend())
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
      API.saveFriend({
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
      })
        .then(res => this.loadFriend())
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
           
            {this.state.friends.length ? (
              <List>
                {this.state.friends.map(book => (
                  <ListItem key={friend._id}>
                    <Link to={"/friend/" + friend._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteFriend(friend._id)} />
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
