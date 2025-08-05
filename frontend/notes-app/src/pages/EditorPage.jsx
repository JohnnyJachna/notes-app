import { useState } from "react";

import NotesList from "../components/notes/NotesList";
import SourceList from "../components/sources/SourcesList";
import TagsList from "../components/tags/TagsList";
import Button from "../components/Button";
import Note from "../components/notes/Note";

let noteID = 0;
let sourceID = 0;
let tagID = 0;

const Editor = () => {
  const [notesList, setNotesList] = useState([]);
  const [sourcesList, setSourcesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const addNote = () => {
    const newNote = { id: noteID };
    const updatedNotesList = [...notesList, newNote];

    setNotesList(updatedNotesList);
    noteID++;
  };

  const addSource = () => {
    const newSource = { id: sourceID };
    const updatedSourcesList = [...sourcesList, newSource];

    setSourcesList(updatedSourcesList);
    sourceID++;
  };

  const addTag = () => {
    const newTag = { id: tagID };
    const updatedTagsList = [...tagsList, newTag];

    setTagsList(updatedTagsList);
    tagID++;
  };

  return (
    <>
      <h3>Editor Page</h3>
      <NotesList notesList={notesList} />
      <Button type="button" name="Add Note" onClick={addNote} />
      <SourceList sourcesList={sourcesList} />
      <Button type="button" name="Add Source" onClick={addSource} />
      <TagsList tagsList={tagsList} />
      <Button type="button" name="Add Tag" onClick={addTag} />
    </>
  );
};

export default Editor;
