import { useState } from "react";

import NotesList from "./NotesList";
import Button from "../Button";

let noteID = 0;

const NotesSection = () => {
  const [notesList, setNotesList] = useState([]);

  const addNote = () => {
    const newNote = { id: noteID };
    const updatedNotesList = [...notesList, newNote];

    setNotesList(updatedNotesList);
    noteID++;
  };

  const deleteNote = (id) => {
    const newNotesList = notesList.filter((note) => note.id !== id);
    setNotesList(newNotesList);
  };

  return (
    <>
      <NotesList notesList={notesList} handleDeleteNote={deleteNote} />
      <Button type="button" name="Add Note" onClick={addNote} />
    </>
  );
};

export default NotesSection;
