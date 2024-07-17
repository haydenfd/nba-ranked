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
  useEffect(() => {
    const x = localStorage.getItem("players", []);

    if (x) {
      setItems(JSON.parse(x));
    }
  }, []);

  // const [originalSnapshot, setOriginalSnapshot] = useState([]);
  // const [correctOrder, setCorrectOrder] = useState([]);
  // const [attempts, setAttempts] = useState(0);
  // const [result, setResult] = useState([]);
  // const [solutionModalIsOpen, setSolutionModalIsOpen] = useState(false);

  // const openSolutionModal = () => setSolutionModalIsOpen(true);
  // const closeSolutionModal = () => setSolutionModalIsOpen(false);

  // useEffect(() => {
  //     fetchData();
  // }, []);

  // useEffect(() => {

  //     if (attempts === 0) {
  //         return;
  //     }

  //     let correctGuesses = countCorrectGuesses(selected, correctOrder, false)
  //     let evaluated = compareOrder(Array.from(correctOrder), selected);
  //     console.log(evaluated)
  //     setResult(evaluated)

  //     if (correctGuesses === 5) {

  //         openSolutionModal() // show that user has finished game
  //         return;
  //     }

  //     if (attempts === 1) {
  //         SendCorrectGuessNotification(correctGuesses)
  //         return;
  //     }

  //     if (attempts === 2) {
  //         openSolutionModal() // signal end of game

  //     }
  //   }, [attempts]); // This effect depends on `attempts`

  //   const handleSubmitClick = () => {
  //     if (selected.length !== 5) {
  //       SendInvalidSubmissionNotification();
  //       return;
  //     }

  //     setAttempts(attempts => attempts + 1);
  //   };

  // const handleResetClick = () => {
  //     setSelected([]);
  //     setItems(originalSnapshot);
  // };

  // const fetchData = async () => {
  //     let response = await axios(server_url);
  //     let correct_data = response.data.correct_order
  //     response = response.data.data;
  //     let result = response.map(player => ({
  //         id: player.PLAYER_ID.toString(),
  //         name: player.PLAYER_NAME,
  //     }));

  //     setItems(result);
  //     setOriginalSnapshot(result);

  //     let correct = correct_data.map(player => ({
  //         id: player.PLAYER_ID.toString(),
  //         name: player.PLAYER_NAME,
  //         ppg: player.PPG
  //     }))

  //     setCorrectOrder(correct);

  // };

  // const ResetGameState = async () => {

  //     setAttempts(0)
  //     setCorrectOrder([])
  //     setSelected([])
  //     setItems(null)
  //     await fetchData()
  // }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Exit if dropped outside any droppable area
    if (!destination) return;

    // Destructuring for clarity
    const srcIndex = source.index;
    const destIndex = destination.index;
    const srcDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    // Moving within the same list
    if (srcDroppableId === destDroppableId) {
      const list =
        srcDroppableId === "droppable"
          ? [...gameState.items]
          : [...gameState.selected];
      const [removed] = list.splice(srcIndex, 1);
      list.splice(destIndex, 0, removed);

      srcDroppableId === "droppable" ? setItems(list) : setSelected(list);
    } else {
      // Moving between lists
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

  // if (items === null) {
  //     return <Spinner size='lg' label='Loading...' color='primary' className='mt-[20vh]'
  //     classNames={{
  //         base: 'scale-[200%]',
  //         label: 'text-white',
  //     }}/>;
  // }

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
