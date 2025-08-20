import React, { useState } from "react";

import { deleteNoteAtom } from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotePreview from "./preview/NotePreview";
import NoteEditor from "./editor/NoteEditor";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

import { validHex } from "@uiw/react-color";
import { getContrastingColor } from "@uiw/react-color";

import { Card } from "flowbite-react";

const Note = (props) => {
  const note = useAtomValue(props.noteAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);
  const bgColor = validHex(note.color) ? note.color : "#374151";
  const txtColor = getContrastingColor(bgColor);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteNote({ setID: note.set_id, noteID: note.id });
  };

  return (
    <>
      <Card
        className="relative cursor-pointer group [&>div]:p-2 [&>div]:sm:p-3 overflow-auto "
        onClick={() => setShowEditor(true)}
        style={{ backgroundColor: bgColor, color: txtColor }}
      >
        <div
          className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <ButtonDelete onClick={handleDeleteNote} />
        </div>
        <div className="flex flex-col h-full">
          <NotePreview noteAtom={props.noteAtom} />
        </div>
      </Card>
      <NoteEditor
        noteAtom={props.noteAtom}
        open={showEditor}
        handleCloseEditor={handleCloseEditor}
      />
    </>
  );
};

export default React.memo(Note);
