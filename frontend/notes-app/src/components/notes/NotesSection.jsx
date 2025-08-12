import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAPI } from "../../utils/api";

import NotesList from "./NotesList";
import Button from "../Button";
import styles from "../css-modules/Section.module.css";

const NotesSection = () => {
  const [notesList, setNotesList] = useState([]);
  const { makeRequest } = useAPI();

  let params = useParams();
  const setID = params.setID;

  const date = new Date().toLocaleString();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const data = await makeRequest(`sets/${setID}/notes`);
      setNotesList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    const body = {
      header: "Header...",
      content: "Content...",
      create_date: date,
      update_date: date,
      set_id: setID,
    };

    try {
      await makeRequest(`sets/${setID}/notes/add`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await makeRequest(`sets/${setID}/notes/${id}`, {
        method: "DELETE",
        body: id,
      });
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.section}>
      <NotesList notesList={notesList} handleDeleteNote={deleteNote} />
      <Button type="button" name="Add Note" onClick={addNote} />
    </div>
  );
};

export default NotesSection;
