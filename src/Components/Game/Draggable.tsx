import React, {useState} from 'react'
import { getListStyle, getItemStyle, initialPlayers} from './DraggableUtils'
import { Button } from '@nextui-org/react'
import { computeScore, PlayerDataInterface } from '../../Store/Snapshot/snapshotSlice'
import { DropResult, DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import { Card } from './Card'
import { useDispatch } from 'react-redux'
import { incrementAttempts } from '../../Store/Attempts/attemptsSlice'
import { mutateGuesses } from '../../Store/Snapshot/snapshotSlice'

export const Drag = () => {


  const dispatch = useDispatch();
  const [players, setPlayers] = useState<PlayerDataInterface[]>(initialPlayers);
  const [guesses, setGuesses] = useState<PlayerDataInterface[]>([]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIndex = source.index;
    const destIndex = destination.index;
    const srcDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    if (srcDroppableId === destDroppableId) {
      
      const list = srcDroppableId === "droppable" ? [...players] : [...guesses];
      const [removed] = list.splice(srcIndex, 1);
      list.splice(destIndex, 0, removed);
      srcDroppableId === "droppable" ? setPlayers(list) : setGuesses(list);

    } else {
      const sourceList =
        srcDroppableId === "droppable" ? [...players] : [...guesses];
      const destList =
        destDroppableId === "droppable" ? [...players] : [...guesses];
      const [removed] = sourceList.splice(srcIndex, 1);
      destList.splice(destIndex, 0, removed);

      if (srcDroppableId === "droppable") {
        setPlayers(sourceList);
        setGuesses(destList);

      } else {
        setPlayers(destList);
        setGuesses(sourceList);
      }
    }
  };

  const handleSubmitAttempt = () => {
    dispatch(incrementAttempts());
    dispatch(mutateGuesses(guesses));
    dispatch(computeScore());

  }

  return (
    <>
      <div className="w-full flex flex-col items-center space-y-10 mt-10 bg-green-500">
      
        <div className="w-2/3 flex flex-row justify-around px-4 py-2">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-[40%] flex-nowrap">
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
                    {players.map((player, index) => (
                      <Draggable
                        key={player.PLAYER_ID}
                        draggableId={player.PLAYER_ID}
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
                            <Card id={player.PLAYER_ID} name={player.PLAYER_NAME} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="w-[40%] flex-nowrap">
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
                    {guesses.map((guess, index) => (
                      <Draggable
                        key={guess.PLAYER_ID}
                        draggableId={guess.PLAYER_ID}
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
                            <Card id={guess.PLAYER_ID} name={guess.PLAYER_NAME} />
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
               onClick={() => alert('Non functional!')}
               className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black">
               Reset
             </Button>
             <Button
               onClick={handleSubmitAttempt}
               isDisabled={!(guesses.length === 5)}
               className="p-6 bg-slate-300 border-[6px] border-slate-700 text-slate-700 text-lg rounded-none font-bold hover:bg-slate-850  hover:border-black">               
               Submit
             </Button>
           </div>
        </section>

      </div>
    </>
  )
}

