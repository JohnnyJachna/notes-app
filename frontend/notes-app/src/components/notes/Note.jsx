// import NoteHeader from "./NoteHeader";
// import NoteContent from "./NoteContent";
// import NoteSources from "./NoteSources";
// import NoteTags from "./NoteTags";
// import NoteDate from "./NoteDate";
import { useState } from "react";
import { createPortal } from "react-dom";

import Button from "../Button";
import styles from "../css-modules/Note.module.css";
import NotePreview from "./NotePreview";
import NoteEditor from "./NoteEditor";

const Note = ({ id, handleDeleteNote }) => {
  const currentDate = new Date();
  const startDate = currentDate.toLocaleTimeString();

  const data = {
    id: id,
    header: "Temp Header",
    content: "Temp Content",
    sources: "Temp Sources",
    tags: "Temp Tags",
    date: startDate,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [noteData, setNoteData] = useState(data);

  const closeEditor = (editedNote) => {
    setNoteData(editedNote);
    setShowEditor(false);
  };

  return (
    <>
      <div className={styles.note}>
        <NotePreview data={noteData} />
        <Button type="button" name="edit" onClick={() => setShowEditor(true)} />
        <Button
          type="button"
          name="delete"
          onClick={() => handleDeleteNote(id)}
        />
      </div>
      <div>
        {showEditor &&
          createPortal(
            <NoteEditor note={noteData} closeEditor={closeEditor} />,
            document.body
          )}
      </div>
    </>
  );
};

export default Note;
