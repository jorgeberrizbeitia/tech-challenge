import { Link } from "react-router-dom";

// style components from Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// this component is a navbar that displays all the phone models from the Server, they come via props from App.js
function MyNavbar({ phonesList }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to={`/`}>Home</Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {phonesList.map((eachPhone) => {
              // Iterate over every phone in the json and display a link
              return (
                <Link to={`/phone-details/${eachPhone.id}`} key={eachPhone.id}>
                  {eachPhone.name}
                </Link>
              );
            })}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
