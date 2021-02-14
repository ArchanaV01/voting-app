// import "./App.css";
// import "./components/AdminPage";
import React from "react";
import { Form, Button, Col, Row, Navbar } from "react-bootstrap";
// import AdminPage from "./components/AdminPage";
// import UserPage from "./components/UserPage";
import * as axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Root_body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    };
  }

  OnSignin(e) {
    const history_store = this.props.history;
    e.preventDefault();
    var self = this;
    axios
      .post("http://localhost:4000/api/signin", {
        username: this.state.user,
        password: this.state.password,
      })
      .then(function (response) {
        console.log(response.data.user.username);
        // console.log(this.)
        // self.props.user = response.data.user.username;
        if (response.data.user.type == 1) {
          history_store.push({ pathname: "/Admin", state: response.data.user });
        } else {
          history_store.push({ pathname: "/Home", state: response.data.user });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // const { username, password } = e.;
    // const { authType } = this.props;

    // this.props.authUser(authType || "login", { username, password });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div>
          <Navbar className="navbar">Voting app</Navbar>
          <Row style={{ float: "center", maxWidth: "100%" }}>
            <Col sm={6}>
              <h2>Ready to vote?</h2>
              <h6>Just login and continue</h6>
            </Col>
            <Col sm={6}>
              <Form
                className="border signinform"
                onSubmit={(event) => {
                  this.OnSignin(event);
                }}
              >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={(event) => {
                      this.state.user = event.target.value;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                      this.state.password = event.target.value;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Root_body;
