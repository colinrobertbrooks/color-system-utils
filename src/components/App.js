import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Checkbox from "./Checkbox";
import ItemInputGroup from "./ItemInputGroup";
import ItemsList from "./ItemsList";
import ItemSorts from "./ItemSorts";
import useItems from "../hooks/useItems";

function App() {
  const [palette1Items, setPalette1Items] = useItems({
    localStorageKey: "PALETTE_1_ITEMS"
  });
  const [palette2Items, setPalette2Items] = useItems({
    localStorageKey: "PALETTE_2_ITEMS"
  });
  const [showInverses, setShowInverses] = useState(false);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center">Color System Utils</h1>
          <div className="text-center"></div>
        </Col>
        <Col xs={3} />
        <Col xs={3} className="text-center mb-3">
          <Checkbox
            label="Show inverses"
            checked={showInverses}
            onChange={event => setShowInverses(event.target.checked)}
          />
        </Col>
        <Col xs={3} className="text-center mb-3">
          <p>TODO</p>
        </Col>
        <Col xs={3} />
        <Col xs={6}>
          <h2>Palette 1</h2>
          <ItemsList
            items={palette1Items}
            setItems={setPalette1Items}
            showInverses={showInverses}
          />
          <div className="mt-3">
            <ItemSorts items={palette1Items} setItems={setPalette1Items} />
          </div>
          <div className="mt-3">
            <ItemInputGroup items={palette1Items} setItems={setPalette1Items} />
          </div>
        </Col>
        <Col xs={6}>
          <h2>Palette 2</h2>
          <ItemsList
            items={palette2Items}
            setItems={setPalette2Items}
            showInverses={showInverses}
          />
          <div className="mt-3">
            <ItemSorts items={palette2Items} setItems={setPalette2Items} />
          </div>
          <div className="mt-3">
            <ItemInputGroup items={palette2Items} setItems={setPalette2Items} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
