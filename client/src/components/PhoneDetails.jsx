import { useState, useEffect } from "react";

// style components from Bootstrap
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";

// Component that will display the phone details.
function PhoneDetails({ phoneId, setErrorMessage }) {
  const [phoneDetails, setPhoneDetails] = useState(null); // for holding phone details
  const [isLoading, setIsLoading] = useState(true); // for loading spinner

  useEffect(() => {
    getPhoneDetails();
  }, [phoneId]); // this will be called everytime the props change. So everytime the user selects a new phone model

  const getPhoneDetails = async () => {
    setIsLoading(true); // starts spinner when changing from one phone model to another

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/phones/${phoneId}`);
  
      // setTimeout is to replicate a small 0.5 sec delay for the spinner to be seen. You can remove it for faster update.
      setTimeout(() => {
        setPhoneDetails(response.data);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setErrorMessage("There was an error, please try later") // simple error message since there is not routing
    }
  };

  // if data is still being filtered, show a spinner.
  // This spinner is just for user flow purposes, as this happends almost instantaneously.
  // Could also apply if data comes from Server as well.
  if (isLoading) {
    return <div class="spinner">
      <Spinner animation="border" variant="info"/>
    </div>
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
        <Card.Title>
          {name} by {manufacturer}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem>Color: {color}</ListGroupItem>
        <ListGroupItem>{screen}</ListGroupItem>
        <ListGroupItem>
          Proc: {processor}. Ram: {ram}
        </ListGroupItem>
        <ListGroupItem>Starting from: {price}€</ListGroupItem>
      </ListGroup>
    </Card>
  );
}

export default PhoneDetails;
