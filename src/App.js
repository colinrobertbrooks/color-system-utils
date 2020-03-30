import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupAddon,
  Button
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (hex, isDragging, draggableStyle) => ({
  background: hex,
  border: "1px solid #ced4da",
  boxShadow: isDragging ? "0 8px 6px -6px #ddd" : undefined,
  borderRadius: "4px",
  marginBottom: "8px",
  padding: 16,
  userSelect: "none",
  ...draggableStyle
});

const getListStyle = (/* isDraggingOver */) => ({
  border: "1px solid #ced4da",
  borderRadius: "4px",
  padding: "15px 10px 5px 10px",
  width: "100%"
});

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

  const [inputVal, setInputVal] = useState("");
  const inputValIsValidItem = /^#[0-9A-F]{6}$/i.test(inputVal);
  const inputValIsDuplicateItem = Boolean(
    items.find(({ hex }) => hex === inputVal)
  );
  const btnIsDisabled = !inputValIsValidItem || inputValIsDuplicateItem;

  const onDragEnd = result => {
    if (!result.destination) return;
    const nextItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(nextItems);
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="text-center mt-3 mb-3">Color System Utils</h1>
        </Col>
        <Col xs={6}>
          {items.length ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided /* , snapshot */) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(/* snapshot.isDraggingOver */)}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.hex}
                        draggableId={item.hex}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              item.hex,
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item.hex}
                            <button
                              className="close text-muted"
                              title="Remove hex item"
                              onClick={() => {
                                setItems(
                                  items.filter(({ hex }) => hex !== item.hex)
                                );
                              }}
                            >
                              <span aria-hidden="true">x</span>
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p className="text-muted text-center">No hex items...</p>
          )}
          <InputGroup className="mt-3">
            <Input
              placeholder="add hex item..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button
                color={btnIsDisabled ? "secondary" : "success"}
                outline
                disabled={btnIsDisabled}
                onClick={() => {
                  setItems([
                    ...items,
                    {
                      id: inputVal,
                      hex: inputVal
                    }
                  ]);
                  setInputVal("");
                }}
              >
                Add
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {inputValIsDuplicateItem && (
            <p className="small text-danger mt-1">Duplicate hex value.</p>
          )}
        </Col>
        <Col xs={6} />
      </Row>
    </Container>
  );
}

export default App;
