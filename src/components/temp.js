import "./App.css";
import "./components/AdminPage";
import { Form, Button, Col, Row, Navbar } from "react-bootstrap";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import * as axios from "axios";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const OnSignin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/signin", {
        username: user,
        password: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // const { username, password } = e.;
    // const { authType } = this.props;

    // this.props.authUser(authType || "login", { username, password });
  };
  return (
    <div className="App">
      {/* <AdminPage /> */}
      {/* <UserPage /> */}
      <header className="App-header"></header>
      <div>
        <Navbar className="navbar">Voting app</Navbar>
        <Row style={{ float: "center", maxWidth: "100%" }}>
          <Col sm={6}>
            <h2>Ready to vote?</h2>
            <h6>Just login and continue</h6>
          </Col>
          <Col sm={6}>
            <Form className="border signinform" onSubmit={OnSignin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  onChange={(event) => setUser(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
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

export default App;
