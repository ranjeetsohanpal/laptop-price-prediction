import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompareLaptops from "./components/CompareLaptops";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<CompareLaptops />} />
      </Routes>
    </Router>
  );
};

export default App;
