import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Store/store";
import { reset, increment } from "../Store/Attempts/attemptsSlice";
import {
  computeScore,
  setSelectedStore,
} from "../Store/Snapshot/snapshotSlice";
import { DroppableStateSnapshot, DropResult } from "react-beautiful-dnd";
import { PlayerData } from "../Store/Snapshot/snapshotSlice";
import { Card } from "./Card";

const x = [
  {
    _id: "669567863ef13914a0300ca3",
    PLAYER_NAME: "LeBron James",
    PLAYER_ID: "2544",
    FROM_YEAR: 2003,
    PPG: 27.1,
    GP: 1484,
    EXP: 21,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300a73",
    PLAYER_NAME: "Kyrie Irving",
    PLAYER_ID: "202681",
    FROM_YEAR: 2011,
    PPG: 23.8,
    GP: 781,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d7c",
    PLAYER_NAME: "Jimmy Butler",
    PLAYER_ID: "202710",
    FROM_YEAR: 2011,
    PPG: 18.4,
    GP: 869,
    EXP: 13,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300dcd",
    PLAYER_NAME: "Chris Paul",
    PLAYER_ID: "101108",
    FROM_YEAR: 2005,
    PPG: 17.6,
    GP: 1262,
    EXP: 19,
    TO_YEAR: 2024,
    __v: 0,
  },
  {
    _id: "669567863ef13914a0300d22",
    PLAYER_NAME: "Nassir Little",
    PLAYER_ID: "1629642",
    FROM_YEAR: 2019,
    PPG: 5.6,
    GP: 231,
    EXP: 5,
    TO_YEAR: 2024,
    __v: 0,
  },
];

const grid = 8;
const itemHeight = 85;
const maxItems = 5;
// const containerPadding = 4;
const calculatedHeight = itemHeight * maxItems;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid,
  margin: `0 0 4px 0`,
  background: isDragging ? "#9370DB" : "white",
  border: "2px solid black",
  ...draggableStyle,
});
const getListStyle = (
  snapshot: DroppableStateSnapshot,
): React.CSSProperties => ({
  background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%",
  height: `${calculatedHeight}px`,
  overflowY: "auto",
});

export const Drag = () => {
  // const { setItems, gameState, setSelected } = useContext(GameStateContext);
  const [items, setItems] = useState<PlayerData[]>(x);
  const [selected, setSelected] = useState<PlayerData[]>([]);
  const _selected = useSelector((state: RootState) => state.snapshot.selected);
  const _score = useSelector((state: RootState) => state.snapshot.score);

  const dispatch = useDispatch<AppDispatch>();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIndex = source.index;
    const destIndex = destination.index;
    const srcDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    if (srcDroppableId === destDroppableId) {
      const list = srcDroppableId === "droppable" ? [...items] : [...selected];
      const [removed] = list.splice(srcIndex, 1);
      list.splice(destIndex, 0, removed);

      srcDroppableId === "droppable" ? setItems(list) : setSelected(list);
    } else {
      const sourceList =
        srcDroppableId === "droppable" ? [...items] : [...selected];
      const destList =
        destDroppableId === "droppable" ? [...items] : [...selected];
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

  function handleMakeAttempt(): void {
    dispatch(increment());
    dispatch(setSelectedStore(selected));
    dispatch(computeScore());

    if (_score.every((value) => value === 0)) {
      console.log("winner winner chicken dinner");
    }
  }

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
                    style={getListStyle(snapshot)}
                    {...provided.droppableProps}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.PLAYER_ID}
                        draggableId={item.PLAYER_ID}
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
                            <Card id={item.PLAYER_ID} name={item.PLAYER_NAME} />
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
                    style={getListStyle(snapshot)}
                    {...provided.droppableProps}
                    className="flex-1"
                  >
                    {selected.map((item, index) => (
                      <Draggable
                        key={item.PLAYER_ID}
                        draggableId={item.PLAYER_ID}
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
                            <Card id={item.PLAYER_ID} name={item.PLAYER_NAME} />
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
        <section className="w-full">
          <div className="w-1/3 flex flex-row mx-auto items-center justify-center gap-14">
            <Button
              onClick={() => dispatch(reset())}
              className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black"
            >
              Reset
            </Button>
            <Button
              onClick={handleMakeAttempt}
              isDisabled={!(selected.length === 5)}
              className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black"
            >
              Submit
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
