import { useState } from "react";

import NotesList from "../components/notes/NotesList";
import SourceList from "../components/sources/SourcesList";
import TagsList from "../components/tags/TagsList";
import Button from "../components/Button";
import Note from "../components/notes/Note";

let noteID = 0;

const Editor = () => {
  const [notesList, setNotesList] = useState([]);

  const addNote = () => {
    const newNote = { id: noteID };
    const updatedNotesList = [...notesList, newNote];

    setNotesList(updatedNotesList);
    noteID++;
  };

  return (
    <>
      <h3>Editor Page</h3>
      <NotesList notesList={notesList} />
      <Button type="button" name="Add Note" onClick={addNote} />
      <SourceList />
      <TagsList />
    </>
  );
};

export default Editor;
