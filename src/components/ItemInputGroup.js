import React, { useState } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";

const ItemInputGroup = ({ items, setItems }) => {
  const [inputVal, setInputVal] = useState("");
  const inputValIsValidItem = /^#[0-9A-F]{6}$/i.test(inputVal);
  const inputValIsDuplicateItem = Boolean(
    items.find(({ hex }) => hex === inputVal)
  );
  const btnIsDisabled = !inputValIsValidItem || inputValIsDuplicateItem;

  const handleSubmit = () => {
    setItems([...items, inputVal]);
    setInputVal("");
  };

  return (
    <>
      <InputGroup>
        <Input
          placeholder="add hex item..."
          value={inputVal}
          onChange={event => setInputVal(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" && !btnIsDisabled && handleSubmit()
          }
        />
        <InputGroupAddon addonType="append">
          <Button
            color={btnIsDisabled ? "secondary" : "success"}
            outline
            disabled={btnIsDisabled}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {inputValIsDuplicateItem && (
        <p className="small text-danger mt-1">Duplicate hex value.</p>
      )}
    </>
  );
};

export default ItemInputGroup;
