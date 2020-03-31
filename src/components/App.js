import React from "react";
import { Container, Row, Col } from "reactstrap";
import ItemInputGroup from "./ItemInputGroup";
import ItemsList from "./ItemsList";
import useItems from "../hooks/useItems";

function App() {
  const [items, setItems] = useItems("COLORS_1");

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center mt-3 mb-3">Color System Utils</h1>
        </Col>
        <Col xs={6}>
          <ItemsList items={items} setItems={setItems} />
          <div className="mt-3">
            <ItemInputGroup items={items} setItems={setItems} />
          </div>
        </Col>
        <Col xs={6} />
      </Row>
    </Container>
  );
}

export default App;
