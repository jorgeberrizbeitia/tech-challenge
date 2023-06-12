import ListGroup from "react-bootstrap/ListGroup";

function PhoneList({ phones, phoneId, setPhoneId }) {

  return (
    <ListGroup>
      {phones.map(({ id, name }) => {
        return (
          <ListGroup.Item
            key={id}
            onClick={() => setPhoneId(id)}
            variant={phoneId === id ? "success" : "light"}
          >
            {name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default PhoneList;
