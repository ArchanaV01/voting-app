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
    self.setState({ user: this.props.location.state });
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
    return (
      <div>
        <Navbar className="navbar">
          <Nav className="mr-auto">
            <Navbar.Brand style={{ color: "white" }}>Voting App</Navbar.Brand>
          </Nav>
          <Nav style={{ float: "right", alignSelf: "right" }}>
            <Button>Logout</Button>
          </Nav>
        </Navbar>
        <h1>Welcome Admin!!</h1>

        <Container style={{ width: "70%" }}>
          {console.log("candidatesabcddddddd", this.state.candidates)}
          {
            (this.items = this.state.candidates.map((item) => (
              <Row>
                <Col key={item.id}>{item.candidate}</Col>{" "}
                <Col key={item.id}>{item.n_of_votes}</Col>
              </Row>
            )))
          }
        </Container>
      </div>
    );
  }
}
export default AdminPage;
