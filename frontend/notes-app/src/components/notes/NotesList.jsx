import React from "react";
import Note from "./Note";
import { splitNotesAtom } from "./NotesAtoms";
import { useAtom } from "jotai/react";

const NotesList = () => {
  const [notesList] = useAtom(splitNotesAtom);

  return (
    <>
      <h4>Notes List</h4>
      {notesList.map((singleNote) => (
        <Note key={singleNote.toString()} noteAtom={singleNote} />
      ))}
    </>
  );
};

export default React.memo(NotesList);
