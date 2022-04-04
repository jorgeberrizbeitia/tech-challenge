import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// style components from Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

// Component that will display the phone details.
// The full list comes from App.js and is filtered here.
// We could also call the Server directly from this component with the same route or another only with phone details
function PhoneDetails({ phonesList }) {

  const [phoneDetails, setPhoneDetails] = useState(null); // for holding phone details from phonesList prop
  const [fetchingDetails, setFetchingDetails] = useState(true); // useful for loading spinner feature

  const { phoneId } = useParams(); // params access hook
  const navigate = useNavigate(); // navigation hook

  useEffect(() => {
    getPhoneDetails();
  }, [phoneId]); // this will be called everytime the params change.

  const getPhoneDetails = async () => {
    setFetchingDetails(true); // starts spinner when changing from one phone model to another

    // .find() works much like .filter() but finds only the first match.
    const phoneToRender = phonesList.find(eachPhone => eachPhone.id === Number(phoneId));

    // setTimeout to replicate a small 0.5 sec delay for the spinner
    setTimeout(() => {
      if (!phoneToRender) {
        // in case the phone is not on the list
        navigate("/not-found"); // this will be catch by the "*" NotFound route.
        return;
      }
      setPhoneDetails(phoneToRender);
      setFetchingDetails(false);
    }, 500);
  };

  // if data is still being filtered, show a spinner. 
  // This spinner is just for user flow purposes, as this happends almost instantaneously.
  // Could also apply if data comes from Server as well.
  if (fetchingDetails) {
    return <Spinner animation="border" variant="info" />
  }

  const {
    name,
    manufacturer,
    description,
    color,
    price,
    screen,
    processor,
    ram,
    imageFileName,
  } = phoneDetails;

  return (
    <Card style={{ width: "18rem" }}>

      <Card.Img variant="top" src={`/images/${imageFileName}`} />

      <Card.Body>
        <Card.Title>{name} by {manufacturer}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>Color: {color}</ListGroupItem>
        <ListGroupItem>{screen}</ListGroupItem>
        <ListGroupItem>Proc: {processor}. Ram: {ram}</ListGroupItem>
        <ListGroupItem>Starting from: {price}€</ListGroupItem>
      </ListGroup>

      <Card.Body>
        <Link to="/">Go Back</Link>
      </Card.Body>

      </Card>
  );
}

export default PhoneDetails;
