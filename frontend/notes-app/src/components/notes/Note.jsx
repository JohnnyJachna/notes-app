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

const Note = (props) => {
  const data = {
    id: props.id,
    header: props.header,
    content: props.content,
    create_date: props.create_date,
    update_date: props.update_date,
    set_id: props.set_id,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [noteData, setNoteData] = useState(data);

  const closeEditor = (updatedNote) => {
    setNoteData({
      ...noteData,
      header: updatedNote.header,
      content: updatedNote.content,
      update_date: updatedNote.update_date,
    });
    // setNoteData([...noteData, updatedNote]);
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
          onClick={() => props.handleDeleteNote(noteData.id)}
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
