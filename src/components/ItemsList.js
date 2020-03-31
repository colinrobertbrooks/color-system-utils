import React from "react";
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

const ItemInputGroup = ({ items, setItems }) => {
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
    <>
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
    </>
  );
};

export default ItemInputGroup;
