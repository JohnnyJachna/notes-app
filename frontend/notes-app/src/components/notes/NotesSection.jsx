import { useEffect } from "react";
import { useParams } from "react-router";

import { addNoteAtom, fetchNotesAtom } from "./NotesAtoms";
import { useSetAtom } from "jotai/react";

import NotesList from "./list/NotesList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const NotesSection = () => {
  const { setID } = useParams();

  const addNote = useSetAtom(addNoteAtom);
  const fetchNotes = useSetAtom(fetchNotesAtom);

  useEffect(() => {
    fetchNotes(setID);
  }, [setID, fetchNotes]);

  const handleAddNote = async () => {
    await addNote(setID);
  };

  return (
    <div className={styles.section}>
      <NotesList />
      <Button type="button" name="Add Note" onClick={handleAddNote} />
    </div>
  );
};

export default NotesSection;
