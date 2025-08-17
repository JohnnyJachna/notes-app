import React, { useState } from "react";
import { deleteNoteAtom } from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotePreview from "./preview/NotePreview";
import NoteEditor from "./editor/NoteEditor";

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
      <Card>
        <NotePreview noteAtom={props.noteAtom} />
        <Button onClick={() => setShowEditor(true)}>edit</Button>
        <Button color="red" onClick={handleDeleteNote}>
          delete
        </Button>
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
