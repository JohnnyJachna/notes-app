import { useEffect } from "react";
import { useParams } from "react-router";

import {
  loadableNotesAtom,
  addNoteAtom,
  notesAtom,
  notesSetIDAtom,
} from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotesList from "./list/NotesList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const NotesSection = () => {
  const { setID } = useParams();

  const loadableNotes = useAtomValue(loadableNotesAtom);
  const setNotes = useSetAtom(notesAtom);
  const addNote = useSetAtom(addNoteAtom);
  const setNotesSetID = useSetAtom(notesSetIDAtom);

  useEffect(() => {
    setNotesSetID(setID);
  }, [setID, setNotesSetID]);

  useEffect(() => {
    if (loadableNotes.state === "hasData") {
      setNotes(loadableNotes.data);
    }
  }, [loadableNotes, setNotes]);

  const handleAddNote = async () => {
    const date = new Date().toLocaleString();
    const body = {
      header: "Header...",
      content: "Content...",
      create_date: date,
      update_date: date,
      set_id: setID,
    };
    await addNote(body);
  };

  return (
    <div className={styles.section}>
      <NotesList />
      <Button type="button" name="Add Note" onClick={handleAddNote} />
    </div>
  );
};

export default NotesSection;
