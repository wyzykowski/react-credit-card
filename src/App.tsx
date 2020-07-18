import React from "react";
import "./App.css";
import PaymentInputs from "./PaymentInputs";
import { Container, Row } from "reactstrap";

function App() {
  return (
    <div className="App">
      <section className="jumbotron">
        <Container>
          <Row>
            <PaymentInputs />
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default App;
