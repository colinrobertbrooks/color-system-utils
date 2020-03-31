import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ItemInputGroup from "./ItemInputGroup";
import ItemsList from "./ItemsList";

const LOCAL_STORAGE_KEY = "COLORS_1";

function App() {
  const [items, setItems] = useState(() => {
    const persistedItems = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedItems) return JSON.parse(persistedItems);
    return [];
  });

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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
