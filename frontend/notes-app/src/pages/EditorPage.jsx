import { useState } from "react";

import NotesList from "../components/notes/NotesList";
import SourceList from "../components/sources/SourcesList";
import TagsList from "../components/tags/TagsList";
import Button from "../components/Button";

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

  const deleteNote = (id) => {
    const newNotesList = notesList.filter((note) => note.id !== id);
    setNotesList(newNotesList);
  };

  const addSource = () => {
    const newSource = { id: sourceID };
    const updatedSourcesList = [...sourcesList, newSource];

    setSourcesList(updatedSourcesList);
    sourceID++;
  };

  const deleteSource = (id) => {
    const newSourcesList = sourcesList.filter((source) => source.id !== id);
    setSourcesList(newSourcesList);
  };

  const addTag = () => {
    const newTag = { id: tagID };
    const updatedTagsList = [...tagsList, newTag];

    setTagsList(updatedTagsList);
    tagID++;
  };

  const deleteTag = (id) => {
    const newTagsList = tagsList.filter((tag) => tag.id !== id);
    setTagsList(newTagsList);
  };

  return (
    <>
      <h3>Editor Page</h3>
      <NotesList notesList={notesList} handleDeleteNote={deleteNote} />
      <Button type="button" name="Add Note" onClick={addNote} />
      <SourceList sourcesList={sourcesList} handleDeleteSource={deleteSource} />
      <Button type="button" name="Add Source" onClick={addSource} />
      <TagsList tagsList={tagsList} handleDeleteTag={deleteTag} />
      <Button type="button" name="Add Tag" onClick={addTag} />
    </>
  );
};

export default Editor;
