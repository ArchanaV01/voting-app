import React from "react";
import * as axios from "axios";
import {
  Col,
  Form,
  ListGroup,
  Row,
  Navbar,
  Nav,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
// const candidates = { a: 2, b: 10, c: 5, d: 12 };
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      password: "",
      candidates: [],
      voted: "",
    };
    // this.onLoad = this.onLoad.bind(this);
    this.onLoad();
  }
  onLoad() {
    const history_store = this.props.history;
    // e.preventDefault();
    var self = this;
    console.log("passeddd", this.props.location.state);
    this.state.user = this.props.location.state;
    // self.setState({ user: this.props.location.state });
    axios
      .get("http://localhost:4000/api/get_candidates", {})
      .then(function (response) {
        self.setState({
          candidates: response.data,
        });

        // self.state.candidates = response.data;
        console.log("candidatessss2", self.state.candidates);
        // self.setState({ candidates:  });
        // this.state.candidates = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const history_store = this.props.history;
    if (!this.state.user) {
      //   <alert>Please login</alert>;
      history_store.push({ pathname: "/", state: null });
      return <div>Please login</div>;
    }
    return (
      <div>
        <Navbar className="navbar">
          <Nav className="mr-auto">
            <Navbar.Brand style={{ color: "white" }}>Voting App</Navbar.Brand>
          </Nav>
          <Nav style={{ float: "right", alignSelf: "right" }}>
            <Button
              onClick={(event) => {
                history_store.push({ pathname: "/", state: null });
              }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar>
        <h1>Welcome {this.state.user.username}!!</h1>
        {this.state.user.vote ? (
          <h1>Voting done</h1>
        ) : (
          <Container style={{ width: "70%" }}>
            {console.log("candidatesabcddddddd", this.state.candidates)}
            <Form
              onSubmit={(e) => {
                console.log("user in voteeeeeeeeeee", this.state.user);
                e.preventDefault();
                axios
                  .post("http://localhost:4000/api/vote", {
                    user: this.state.user,
                    candidate: this.state.voted,
                  })
                  .then(function (response) {
                    // console.log(response.data.user);
                    document.getElementById("message").innerHTML =
                      '<Alert variant="success">Voted!!</Alert>';
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
            >
              <div
                onChange={(event) => {
                  console.log(event.target.value);
                  this.state.voted = event.target.value;
                }}
                style={{ margin: "6%" }}
              >
                {
                  (this.items = this.state.candidates.map((item) => (
                    <div style={{ padding: "2%" }} className="border">
                      <Form.Check
                        type={"radio"}
                        name={"selected"}
                        label={item.candidate}
                        value={item.candidate}
                      />
                      {/* <input
                        type="radio"
                        value={item.candidate}
                        name="selected"
                      />
                      {item.candidate} */}
                    </div>
                  )))
                }
              </div>
              <Button
                style={{ paddingLeft: "3%", paddingRight: "3%" }}
                type="submit"
              >
                Vote
              </Button>
            </Form>
            <div id="message"></div>
          </Container>
        )}
      </div>
    );
  }
}
export default UserPage;
