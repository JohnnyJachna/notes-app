import { useDraggable } from "@dnd-kit/core";
import { Card } from "flowbite-react";
import { MdDragIndicator } from "react-icons/md";

const CARD_WIDTH = 200;

const DraggableCard = ({ id, x, y, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    position: "absolute",
    left: x,
    top: y,
    width: CARD_WIDTH,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    userSelect: "none",
    zIndex: isDragging ? 60 : 10,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="group shadow-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800
                 [&>div]:p-0 overflow-hidden"
    >
      {/* Header */}
      <div
        className="select-none text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700
                   flex items-center justify-between font-medium"
      >
        <span className="truncate">Drag</span>

        {/* Drag Icon */}
        <button
          type="button"
          className="p-0 m-0 cursor-grab active:cursor-grabbing text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Drag card"
          {...listeners}
          {...attributes}
        >
          <MdDragIndicator size={20} />
        </button>
      </div>

      {/* Content area */}
      <div className="p-3 text-sm">{children}</div>
    </Card>
  );
};

export default DraggableCard;
