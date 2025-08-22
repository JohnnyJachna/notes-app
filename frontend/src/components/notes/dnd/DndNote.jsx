import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NotePreview from "../preview/NotePreview";
import { Card, HR } from "flowbite-react";
import NoteTagsPreview from "../preview/NoteTagsPreview";
import NoteSourcesPreview from "../preview/NoteSourcesPreview";

const DndNote = ({ note }) => {
  const bgColor = validHex(note.color) ? note.color : "#374151";
  const txtColor = getContrastingColor(bgColor);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: note.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <Card
        className="relative h-full cursor-grab active:cursor-grabbing group [&>div]:p-2 [&>div]:sm:p-3 overflow-auto"
        style={{ backgroundColor: bgColor, color: txtColor }}
      >
        <div className="flex flex-col h-full">
          <NotePreview note={note} />
        </div>
      </Card>
    </div>
  );
};

export default DndNote;
