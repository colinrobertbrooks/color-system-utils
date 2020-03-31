import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { invert } from "polished";

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
  color: invert(hex),
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  userSelect: "none",
  ...draggableStyle
});

const getListStyle = (/* isDraggingOver */) => ({
  border: "1px solid #ced4da",
  borderRadius: 4,
  padding: "15px 10px 5px 10px",
  width: "100%"
});

const ItemInputGroup = ({ items, setItems, showInverses }) => {
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
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          item,
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item}
                        <button
                          className="close text-muted"
                          title="Remove hex item"
                          onClick={() => {
                            setItems(
                              items.filter(filterItem => filterItem !== item)
                            );
                          }}
                        >
                          <span aria-hidden="true">x</span>
                        </button>
                        {showInverses && (
                          <div
                            className="small"
                            title={`Inverse of ${item}`}
                            style={{
                              background: invert(item),
                              borderRadius: 4,
                              color: item,
                              marginTop: 2,
                              padding: 4,
                              textAlign: "center",
                              width: 60
                            }}
                          >
                            {invert(item)}
                          </div>
                        )}
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
