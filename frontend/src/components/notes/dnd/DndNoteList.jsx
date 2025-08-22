import { useEffect, useState } from "react";

import { useAtomValue, useSetAtom } from "jotai";
import {
  isDndActiveAtom,
  sortedDndNotesAtom,
  saveDndNotesPositionsAtom,
} from "./DndAtoms";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import DndNote from "./DndNote";

import { Button } from "flowbite-react";
import { sortTypeAtom } from "../list/NotesListAtoms";

const DndNotesList = () => {
  const sortedNotes = useAtomValue(sortedDndNotesAtom);
  const setIsDndActive = useSetAtom(isDndActiveAtom);
  const setSortType = useSetAtom(sortTypeAtom);
  const setSaveDndNotesPositions = useSetAtom(saveDndNotesPositionsAtom);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(sortedNotes);
  }, [sortedNotes]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const oldIndex = items.findIndex((note) => note.id === active.id);
    const newIndex = items.findIndex((note) => note.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleSave = async () => {
    await setSaveDndNotesPositions(items);
    setIsDndActive(false);
    setSortType("Custom");
  };

  return (
    <>
      <div className="flex justify-center items-center mb-5">
        <Button color="green" onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="p-6 border-2 border-gray-500 border-dashed">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 auto-rows-fr">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <SortableContext
              items={items.map((note) => note.id)}
              strategy={rectSortingStrategy}
            >
              {items.map((note) => (
                <DndNote key={note.id} note={note} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default DndNotesList;
