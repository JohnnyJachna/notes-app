import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { useAtom } from "jotai";
import { containersAtom } from "./DndAtoms";

import DroppableContainer from "./DroppableContainer";
import ItemOverlay from "./ItemOverlay";

const Kanban = () => {
  // const [containers, setContainers] = useState([
  //   {
  //     id: "container-1",
  //     title: "Container 1",
  //     notes: [
  //       { id: "card-1", content: "Card 1" },
  //       { id: "card-2", content: "Card 2" },
  //       { id: "card-3", content: "Card 3" },
  //     ],
  //   },
  //   {
  //     id: "container-2",
  //     title: "Container 2",
  //     notes: [{ id: "card-4", content: "Card 4" }],
  //   },
  //   {
  //     id: "container-3",
  //     title: "Container 3",
  //     notes: [{ id: "card-5", content: "Card 5" }],
  //   },
  // ]);

  const [containers, setContainers] = useAtom(containersAtom);

  // State to track which note is being dragged
  const [activeID, setActiveID] = useState(null);

  // Configure sensors for different input methods
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 25,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find which container a note belongs to
  const findContainerID = (noteID) => {
    if (containers.some((container) => container.id === noteID)) {
      return noteID;
    }
    const found = containers.find((container) =>
      container.notes.some((note) => note.id === noteID)
    );
    return found ? found.id : null;
  };

  const handleDragStart = (event) => {
    setActiveID(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveID(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeID = active.id;
    const overID = over.id;

    const activeContainerID = findContainerID(activeID);
    const overContainerID = findContainerID(overID);

    if (!activeContainerID || !overContainerID) return;
    if (activeContainerID === overContainerID && activeID !== overID) {
      return;
    }
    if (activeContainerID === overContainerID) return;

    setContainers((prev) => {
      const activeContainer = prev.find((c) => c.id === activeContainerID);
      if (!activeContainer) return prev;

      const activeItem = activeContainer.notes.find(
        (note) => note.id === activeID
      );
      if (!activeItem) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerID) {
          return {
            ...container,
            notes: container.notes.filter((note) => note.id !== activeID),
          };
        }

        if (container.id === overContainerID) {
          if (overID === overContainerID) {
            return {
              ...container,
              notes: [...container.notes, activeItem],
            };
          }
          const overItemIndex = container.notes.findIndex(
            (note) => note.id === overID
          );

          if (overItemIndex !== -1) {
            return {
              ...container,
              notes: [
                ...container.notes.slice(0, overItemIndex + 1),
                activeItem,
                ...container.notes.slice(overItemIndex + 1),
              ],
            };
          }
        }
        return container;
      });
      return newContainers;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveID(null);
      return;
    }
    const activeContainerID = findContainerID(active.id);
    const overContainerID = findContainerID(over.id);

    if (!activeContainerID || !overContainerID) {
      setActiveID(null);
      return;
    }

    if (activeContainerID === overContainerID && active.id !== over.id) {
      const containerIndex = containers.findIndex(
        (c) => c.id === activeContainerID
      );
      if (containerIndex === -1) {
        setActiveID(null);
        return;
      }

      const container = containers[containerIndex];
      const activeIndex = container.notes.findIndex(
        (note) => note.id === active.id
      );
      const overIndex = container.notes.findIndex(
        (note) => note.id === over.id
      );

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.notes, activeIndex, overIndex);

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, notes: newItems };
            }
            return c;
          });
        });
      }
    }
    setActiveID(null);
  };

  const getActiveItem = () => {
    for (const container of containers) {
      const note = container.notes.find((note) => note.id === activeID);
      if (note) return note;
    }
    return null;
  };

  return (
    <div className="mx-auto w-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {containers.map((container) => (
            <DroppableContainer
              key={container.id}
              id={container.id}
              setID={container.set_id}
              name={container.name}
              notes={container.notes}
            />
          ))}
        </div>
        <DragOverlay
          dropAnimation={{
            duration: 150,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeID ? (
            <ItemOverlay>{getActiveItem()?.content}</ItemOverlay>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
