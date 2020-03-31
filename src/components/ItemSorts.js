import React from "react";
import { Row, Col, Button } from "reactstrap";
import hexSorter from "hexsorter";

const ItemSorts = ({ items, setItems }) => {
  const handleSort = () =>
    setItems(hexSorter.sortColors(items, "mostBrightColor"));

  const handleReverse = () => setItems([...items].reverse());

  return (
    <Row>
      <Col xs={6}>
        <Button color="secondary" outline block onClick={handleSort}>
          Sort
        </Button>
      </Col>

      <Col xs={6}>
        <Button color="secondary" outline block onClick={handleReverse}>
          Reverse
        </Button>
      </Col>
    </Row>
  );
};

export default ItemSorts;
