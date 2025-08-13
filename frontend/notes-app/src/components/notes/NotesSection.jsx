import { useEffect } from "react";
import { useParams } from "react-router";

import {
  loadableNotesAtom,
  addNoteAtom,
  notesAtom,
  notesSetIDAtom,
} from "./NotesAtoms";
import { useAtomValue, useSetAtom } from "jotai/react";

import NotesList from "./NotesList";
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

// const [notesList, setNotesList] = useState([]);
// const { makeRequest } = useAPI();

// let params = useParams();
// const setID = params.setID;

// const date = new Date().toLocaleString();

// useEffect(() => {
//   fetchNotes();
// }, []);

// const fetchNotes = async () => {
//   try {
//     const data = await makeRequest(`sets/${setID}/notes`);
//     setNotesList(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addNote = async () => {
//   const body = {
//     header: "Header...",
//     content: "Content...",
//     create_date: date,
//     update_date: date,
//     set_id: setID,
//   };

//   try {
//     await makeRequest(`sets/${setID}/notes/add`, {
//       method: "POST",
//       body: JSON.stringify(body),
//     });
//     fetchNotes();
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteNote = async (id) => {
//   try {
//     await makeRequest(`sets/${setID}/notes/${id}`, {
//       method: "DELETE",
//       body: id,
//     });
//     fetchNotes();
//   } catch (error) {
//     console.log(error);
//   }
// };
