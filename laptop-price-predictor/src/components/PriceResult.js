import React from "react";
import { Alert, Container } from "react-bootstrap";

const PriceResult = ({ predictedPrice }) => {
  return (
    <Container className="mt-3">
      {predictedPrice !== null && (
        <Alert variant="success">
          Predicted Laptop Price: <strong>₹{predictedPrice}</strong>
        </Alert>
      )}
    </Container>
  );
};

export default PriceResult;
