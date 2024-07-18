import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Card } from "./Card";
import { GameStateContext } from "../Context/GameStateContext";

const grid = 8;
const itemHeight = 100;
const maxItems = 5;
// const containerPadding = 4;
const calculatedHeight = itemHeight * maxItems;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid,
  margin: `0 0 4px 0`,
  background: isDragging ? "#9370DB" : "white",
  border: "2px solid black",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
  height: `${calculatedHeight}px`, // Static height based on calculation
  overflowY: "auto", // Allows scrolling within the container
});

export const Drag = () => {
  const { setItems, gameState, setSelected } = useContext(GameStateContext);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIndex = source.index;
    const destIndex = destination.index;
    const srcDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    if (srcDroppableId === destDroppableId) {
      const list =
        srcDroppableId === "droppable"
          ? [...gameState.items]
          : [...gameState.selected];
      const [removed] = list.splice(srcIndex, 1);
      list.splice(destIndex, 0, removed);

      srcDroppableId === "droppable" ? setItems(list) : setSelected(list);
    } else {
      const sourceList =
        srcDroppableId === "droppable"
          ? [...gameState.items]
          : [...gameState.selected];
      const destList =
        destDroppableId === "droppable"
          ? [...gameState.items]
          : [...gameState.selected];
      const [removed] = sourceList.splice(srcIndex, 1);
      destList.splice(destIndex, 0, removed);

      if (srcDroppableId === "droppable") {
        setItems(sourceList);
        setSelected(destList);
      } else {
        setItems(destList);
        setSelected(sourceList);
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-10 mt-10 bg-green-500">
        <div className="w-2/3 flex flex-row justify-around px-4 py-2">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-1/3 flex-nowrap">
              <div className="text-3xl font-bold text-white w-full text-center underline mb-4">
                PLAYERS
              </div>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {gameState.items.map((item, index) => (
                      <Draggable
                        key={item["PLAYER_ID"]}
                        draggableId={item["PLAYER_ID"]}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${false ? "pointer-events-none bg-gray-400" : "pointer-events-auto"}`}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <Card
                              name={item["PLAYER_NAME"]}
                              id={item["PLAYER_ID"]}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="w-1/3 flex-nowrap">
              <div className="text-3xl font-bold text-white w-full text-center underline mb-4">
                GUESSES
              </div>
              <Droppable droppableId="droppable2">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className="flex-1"
                  >
                    {gameState.selected.map((item, index) => (
                      <Draggable
                        key={item["PLAYER_ID"]}
                        draggableId={item["PLAYER_ID"]}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${false ? "pointer-events-none" : "pointer-events-auto"}`}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                            )}
                          >
                            <Card
                              name={item["PLAYER_NAME"]}
                              id={item["PLAYER_ID"]}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
