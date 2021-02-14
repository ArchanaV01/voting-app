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
class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      password: "",
      candidates: [],
      voted: "",
    };
    this.onLoad = this.onLoad.bind(this);
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
        <h1>Welcome!!</h1>
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
              >
                {
                  (this.items = this.state.candidates.map((item) => (
                    <Row>
                      <input
                        type="radio"
                        value={item.candidate}
                        name="selected"
                      />
                      {item.candidate}
                    </Row>
                  )))
                }
              </div>
              <Button type="submit">Vote</Button>
            </Form>
            <div id="message"></div>
          </Container>
        )}
      </div>
    );
  }
}
export default AdminPage;

// import React from "react";
// import {
//   Col,
//   Form,
//   ListGroup,
//   Row,
//   Navbar,
//   Button,
//   Card,
//   Nav,
// } from "react-bootstrap";
// const candidates = ["a", "b", "c", "d"];
// function UserPage(props) {

//     onLoad() {
//         const history_store = this.props.history;
//         // e.preventDefault();
//         var self = this;
//         axios
//           .get("http://localhost:4000/api/get_candidates", {})
//           .then(function (response) {
//             self.setState({
//               candidates: response.data,
//             });

//             // self.state.candidates = response.data;
//             console.log("candidatessss2", self.state.candidates);
//             // self.setState({ candidates:  });
//             // this.state.candidates = response.data;
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       }
//   return (
//     <div style={{ alignItems: "center" }}>
//       <Navbar className="navbar">
//         <Nav className="mr-auto">
//           <Navbar.Brand style={{ color: "white" }}>Voting App</Navbar.Brand>
//         </Nav>
//         <Nav style={{ float: "right", alignSelf: "right" }}>
//           <Button>Logout</Button>
//         </Nav>
//       </Navbar>
//       <Card style={{ width: "70%", float: "center" }}>
//         <Card.Header>
//           <h1>Welcome !!</h1>
//         </Card.Header>
//         <Form>
//           <Card.Body>
//             {candidates.map((value, index) => (
//               <ListGroup.Item key={index} as={Row}>
//                 <Col sm={8}>{value}</Col>
//                 <Col sm={4}>
//                   <Form.Control type="radio" />
//                 </Col>
//               </ListGroup.Item>
//             ))}
//           </Card.Body>
//           <Card.Footer>
//             <Button type="submit">Submit Vote</Button>
//           </Card.Footer>
//         </Form>
//       </Card>
//     </div>
//   );
// }
// export default UserPage;
