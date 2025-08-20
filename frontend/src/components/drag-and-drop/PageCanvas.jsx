import { useState, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import DraggableCard from "./DraggableCard";
import { nanoid } from "nanoid";

const GRID_SIZE = 32;

const PageCanvas = () => {
  const [cards, setCards] = useState([]);
  const canvasRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const modifiers = [createSnapModifier(GRID_SIZE), restrictToParentElement];

  const addCard = () => {
    const START_X = 50;
    const START_Y = 50;

    setCards((p) => [
      ...p,
      { id: nanoid(), x: START_X, y: START_Y, content: `Card ${p.length + 1}` },
    ]);
  };

  const handleDragEnd = ({ active, delta }) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              x: c.x + delta.x,
              y: c.y + delta.y,
            }
          : c
      )
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <button
          onClick={addCard}
          className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-500"
        >
          Add Card
        </button>
        <span className="text-xs text-gray-500">Cards: {cards.length}</span>
      </div>

      <div
        ref={canvasRef}
        className="relative rounded-lg border border-dashed border-gray-400 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-900"
        style={{
          minHeight: "600px",
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        }}
      >
        <DndContext
          sensors={sensors}
          modifiers={modifiers}
          onDragEnd={handleDragEnd}
        >
          {cards.map((c) => (
            <DraggableCard key={c.id} id={c.id} x={c.x} y={c.y}>
              {c.content}
            </DraggableCard>
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default PageCanvas;
