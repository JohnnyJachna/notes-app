import React, { useState } from "react";
import { deleteNoteAtom } from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotePreview from "./preview/NotePreview";
import NoteEditor from "./editor/NoteEditor";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

import { Button, Card } from "flowbite-react";

const Note = (props) => {
  const note = useAtomValue(props.noteAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);

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
        className="relative cursor-pointer h-full group [&>div]:p-2 [&>div]:sm:p-3"
        onClick={() => setShowEditor(true)}
      >
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ButtonDelete onClick={() => handleDeleteNote()}></ButtonDelete>
          </div>
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
