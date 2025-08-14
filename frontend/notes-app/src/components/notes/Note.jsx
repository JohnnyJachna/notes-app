import React, { useState } from "react";
import { deleteNoteAtom } from "./NotesAtoms";
import { useAtom, useSetAtom } from "jotai/react";
import { createPortal } from "react-dom";

import Button from "../Button";
import styles from "../css-modules/Note.module.css";
import NotePreview from "./preview/NotePreview";
import NoteEditor from "./editor/NoteEditor";

const Note = (props) => {
  const [note, setNote] = useAtom(props.noteAtom);
  const deleteNote = useSetAtom(deleteNoteAtom);

  const [showEditor, setShowEditor] = useState(false);

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  const handleDeleteNote = async () => {
    await deleteNote(note);
  };

  return (
    <>
      <div className={styles.note}>
        <NotePreview noteAtom={props.noteAtom} />
        <Button type="button" name="edit" onClick={() => setShowEditor(true)} />
        <Button type="button" name="delete" onClick={handleDeleteNote} />
      </div>
      <div>
        {showEditor &&
          createPortal(
            <NoteEditor
              noteAtom={props.noteAtom}
              setNote={setNote}
              handleCloseEditor={handleCloseEditor}
            />,
            document.body
          )}
      </div>
    </>
  );
};

export default React.memo(Note);
