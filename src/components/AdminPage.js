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
} from "react-bootstrap";
// const candidates = { a: 2, b: 10, c: 5, d: 12 };
class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      candidates: [],
    };
    this.onLoad = this.onLoad.bind(this);
    this.onLoad();
  }
  onLoad() {
    const history_store = this.props.history;

    // e.preventDefault();
    var self = this;
    console.log("passeddd", this.props.location.state);
    // self.setState({ user: this.props.location.state });
    this.state.user = this.props.location.state;
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
    } else if (this.state.user.type != 1) {
      // history_store.push({ pathname: "/", state: null });
      return <div>Please login with admin credentials</div>;
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
        <h1>Welcome Admin!!</h1>
        <h2>Stats of votes</h2>
        <Container style={{ width: "70%", paddingTop: "5%" }}>
          {console.log("candidatesabcddddddd", this.state.candidates)}
          <Row style={{ fontWeight: "bold" }} className="border">
            <Col>Candidate Name</Col>
            <Col>Number of votes</Col>
          </Row>
          {
            (this.items = this.state.candidates.map((item) => (
              <Row key={item.id} className="border">
                <Col>{item.candidate}</Col>
                <Col>{item.n_of_votes}</Col>
              </Row>
            )))
          }
        </Container>
      </div>
    );
  }
}
export default AdminPage;
