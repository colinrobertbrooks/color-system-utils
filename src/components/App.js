import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Checkbox from "./Checkbox";
import ItemInputGroup from "./ItemInputGroup";
import ItemsList from "./ItemsList";
import ItemSorts from "./ItemSorts";
import useItems from "../hooks/useItems";
import calcDeltaE from "../utils/calcDeltaE";
import DeltaETable from "./DeltaETable";

function App() {
  const [palette1Items, setPalette1Items] = useItems({
    localStorageKey: "PALETTE_1_ITEMS"
  });
  const [palette2Items, setPalette2Items] = useItems({
    localStorageKey: "PALETTE_2_ITEMS"
  });
  const [showInverses, setShowInverses] = useState(false);
  const [showDeltaE, setShowDeltaE] = useState(false);

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
            label="Show Inverses"
            checked={showInverses}
            onChange={event => setShowInverses(event.target.checked)}
          />
        </Col>
        <Col xs={3} className="text-center mb-3">
          <Checkbox
            label="Show Delta E"
            checked={showDeltaE}
            onChange={event => setShowDeltaE(event.target.checked)}
          />
        </Col>
        <Col xs={3} />
        <Col xs={5}>
          <h2>Palette 1</h2>
        </Col>
        <Col xs={2} />
        <Col xs={5}>
          <h2>Palette 2</h2>
        </Col>
        <Col xs={5}>
          {palette1Items.length > 0 ? (
            <>
              <ItemsList
                items={palette1Items}
                setItems={setPalette1Items}
                showInverses={showInverses}
              />
              <div className="mt-3">
                <ItemSorts items={palette1Items} setItems={setPalette1Items} />
              </div>
            </>
          ) : (
            <p className="text-muted">No hex items.</p>
          )}
          <div className="mt-3">
            <ItemInputGroup items={palette1Items} setItems={setPalette1Items} />
          </div>
          {showDeltaE && palette1Items.length > 1 && (
            <div className="mt-3">
              <DeltaETable items={palette1Items} />
            </div>
          )}
        </Col>
        <Col xs={2}>
          {showDeltaE && (
            <div
              style={{
                border: "1px solid transparent",
                display: "flex",
                flexDirection: "column",
                padding: 16
              }}
            >
              {palette1Items.map((_, idx) => {
                const hex1 = palette1Items[idx];
                const hex2 = palette2Items[idx];

                if (hex1 && hex2) {
                  return (
                    <div
                      key={idx}
                      title={`Delta E of ${hex1} and ${hex2}`}
                      style={{
                        border: "1px solid transparent",
                        fontStyle: "italic",
                        marginTop: showInverses ? 27 : 0,
                        marginBottom: 8,
                        padding: "16px 0",
                        textAlign: "center"
                      }}
                    >
                      {parseFloat(calcDeltaE(hex1, hex2)).toFixed(1)}%
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </Col>
        <Col xs={5}>
          {palette2Items.length > 0 ? (
            <>
              <ItemsList
                items={palette2Items}
                setItems={setPalette2Items}
                showInverses={showInverses}
              />
              <div className="mt-3">
                <ItemSorts items={palette2Items} setItems={setPalette2Items} />
              </div>
            </>
          ) : (
            <p className="text-muted">No hex items.</p>
          )}
          <div className="mt-3">
            <ItemInputGroup items={palette2Items} setItems={setPalette2Items} />
          </div>
          {showDeltaE && palette2Items.length > 1 && (
            <div className="mt-4">
              <DeltaETable items={palette2Items} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
