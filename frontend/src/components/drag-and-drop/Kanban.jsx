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

import DroppableContainer from "./DroppableContainer";
import ItemOverlay from "./ItemOverlay";

const Kanban = () => {
  const [containers, setContainers] = useState([
    {
      id: "container-1",
      title: "Container 1",
      items: [
        { id: "card-1", content: "Card 1" },
        { id: "card-2", content: "Card 2" },
        { id: "card-3", content: "Card 3" },
      ],
    },
    {
      id: "container-2",
      title: "Container 2",
      items: [{ id: "card-4", content: "Card 4" }],
    },
    {
      id: "container-3",
      title: "Container 3",
      items: [{ id: "card-5", content: "Card 5" }],
    },
  ]);

  // State to track which item is being dragged
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

  // Find which container an item belongs to
  const findContainerID = (itemID) => {
    if (containers.some((container) => container.id === itemID)) {
      return itemID;
    }
    const found = containers.find((container) =>
      container.items.some((item) => item.id === itemID)
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

      const activeItem = activeContainer.items.find(
        (item) => item.id === activeID
      );
      if (!activeItem) return prev;

      const newContainers = prev.map((container) => {
        if (container.id === activeContainerID) {
          return {
            ...container,
            items: container.items.filter((item) => item.id !== activeID),
          };
        }

        if (container.id === overContainerID) {
          if (overID === overContainerID) {
            return {
              ...container,
              items: [...container.items, activeItem],
            };
          }
          const overItemIndex = container.items.findIndex(
            (item) => item.id === overID
          );

          if (overItemIndex !== -1) {
            return {
              ...container,
              items: [
                ...container.items.slice(0, overItemIndex + 1),
                activeItem,
                ...container.items.slice(overItemIndex + 1),
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
      const activeIndex = container.items.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = container.items.findIndex(
        (item) => item.id === over.id
      );

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(container.items, activeIndex, overIndex);

        setContainers((containers) => {
          return containers.map((c, i) => {
            if (i === containerIndex) {
              return { ...c, items: newItems };
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
      const item = container.items.find((item) => item.id === activeID);
      if (item) return item;
    }
    return null;
  };

  return (
    <div className="mx-auto w-full">
      <h2 className="mb-4 text-xl font-bold dark:text-white">Kanban Board</h2>
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
              title={container.title}
              items={container.items}
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
