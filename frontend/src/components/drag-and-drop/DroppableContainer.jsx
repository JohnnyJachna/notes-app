import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSetAtom } from "jotai";
import { deleteContainerAtom } from "./DndAtoms";

import SortableItem from "./SortableItem";
import ButtonDelete from "../buttons/ButtonDelete";

const DroppableContainer = ({ id, setID, name, notes }) => {
  const { setNodeRef } = useDroppable({ id });
  const deleteContainer = useSetAtom(deleteContainerAtom);

  const handleContainerDelete = async () => {
    await deleteContainer({ setID: setID, containerID: id });
  };

  return (
    <div
      ref={setNodeRef}
      className="flex h-full min-h-40 flex-col rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
    >
      <div className="flex items-center justify-between">
        <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
          {name}
        </h3>
        <ButtonDelete onClick={handleContainerDelete} />
      </div>
      <div className="flex-1">
        <SortableContext
          items={notes.map((note) => note.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2">
            {notes.map((note) => (
              <SortableItem key={note.id} id={note.id} header={note.header} />
            ))}
          </ul>
        </SortableContext>
        {notes.length === 0 && (
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drop items here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroppableContainer;
