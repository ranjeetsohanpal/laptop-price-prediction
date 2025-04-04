import React, { useState } from "react";
import LaptopForm from "../components/LaptopForm";
import PriceResult from "../components/PriceResult";
import { Container } from "react-bootstrap";

const Home = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);

  return (
    <Container>
      <h1 className="text-center mt-4">Laptop Price Predictor</h1>
      <LaptopForm setPredictedPrice={setPredictedPrice} />
      <PriceResult predictedPrice={predictedPrice} />
    </Container>
  );
};

export default Home;
