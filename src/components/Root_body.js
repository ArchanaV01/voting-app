// import "./App.css";
// import "./components/AdminPage";
import React from "react";
import { Form, Button, Col, Row, Navbar, Alert } from "react-bootstrap";
// import AdminPage from "./components/AdminPage";
// import UserPage from "./components/UserPage";
import * as axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Root_body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  OnSignin(e) {
    const history_store = this.props.history;
    e.preventDefault();
    var self = this;
    axios
      .post("http://localhost:4000/api/signin", {
        email: this.state.email,
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
        const message = error["response"]["data"]["message"];
        document.getElementById("msg").innerHTML =
          '<Alert variant="danger">' + message + "</Alert>";
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div>
          <Navbar className="navbar">Voting app</Navbar>
          <Row style={{ maxWidth: "100%", paddingTop: "5%" }}>
            <Col sm={6} style={{}}>
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    onChange={(event) => {
                      this.state.email = event.target.value;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(event) => {
                      this.state.password = event.target.value;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
                <div id="msg" style={{ color: "red" }}></div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Root_body;
