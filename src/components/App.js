import React from "react";
import { Container, Row, Col } from "reactstrap";
import ItemInputGroup from "./ItemInputGroup";
import ItemsList from "./ItemsList";
import useItems from "../hooks/useItems";

function App() {
  const [palette1Items, setPalette1Items] = useItems({
    localStorageKey: "PALETTE_1_ITEMS"
  });
  const [palette2Items, setPalette2Items] = useItems({
    localStorageKey: "PALETTE_2_ITEMS"
  });

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center mt-3 mb-3">Color System Utils</h1>
        </Col>
        <Col xs={6}>
          <ItemsList items={palette1Items} setItems={setPalette1Items} />
          <div className="mt-3">
            <ItemInputGroup items={palette1Items} setItems={setPalette1Items} />
          </div>
        </Col>
        <Col xs={6}>
          <ItemsList items={palette2Items} setItems={setPalette2Items} />
          <div className="mt-3">
            <ItemInputGroup items={palette2Items} setItems={setPalette2Items} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
