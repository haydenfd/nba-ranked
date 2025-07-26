import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const initialPlayers = [
  "LeBron James",
  "Stephen Curry",
  "Kevin Durant",
  "Giannis Antetokounmpo",
  "Nikola Jokić"
];

function SortableItem({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-[#242424] border-2 border-gray-500 rounded-md cursor-grab text-white"
    >
      {id}
    </div>
  );
}

export default function PlayerList() {
  const [players, setPlayers] = useState(initialPlayers);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = players.indexOf(active.id);
      const newIndex = players.indexOf(over.id);
      setPlayers(arrayMove(players, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 w-full border-2 border-gray-600 rounded-xl bg-transparent">
        <SortableContext items={players} strategy={verticalListSortingStrategy}>
          {players.map((player) => (
            <SortableItem key={player} id={player} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
