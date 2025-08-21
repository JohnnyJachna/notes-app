import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, header }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded border bg-white p-3 active:cursor-grabbing dark:border-gray-700 dark:bg-gray-700 ${
        isDragging ? "z-10 opacity-50 shadow-md" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400">⋮</span>
        <span className="dark:text-gray-200">{header}</span>
      </div>
    </li>
  );
};

export default SortableItem;
