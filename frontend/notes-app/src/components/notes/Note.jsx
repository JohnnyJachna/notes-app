// import NoteHeader from "./NoteHeader";
// import NoteContent from "./NoteContent";
// import NoteSources from "./NoteSources";
// import NoteTags from "./NoteTags";
// import NoteDate from "./NoteDate";
import { useState, useEffect } from "react";
import { useAPI } from "../../utils/api";
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
    tags: props.tags,
    sources: props.sources,
  };

  const [showEditor, setShowEditor] = useState(false);
  const [noteData, setNoteData] = useState(data);
  const [tags, setTags] = useState();
  const [sources, setSources] = useState();

  const { makeRequest } = useAPI();

  useEffect(() => {
    fetchTags();
    fetchSources();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await makeRequest(`sets/${data.set_id}/tags`);
      setTags(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await makeRequest(`sets/${data.set_id}/sources`);
      setSources(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeEditor = (updatedNote) => {
    setNoteData({
      ...noteData,
      header: updatedNote.header,
      content: updatedNote.content,
      update_date: updatedNote.update_date,
      tags: updatedNote.tags,
      sources: updatedNote.sources,
    });
    setShowEditor(false);
  };

  return (
    <>
      <div className={styles.note}>
        <NotePreview note={noteData} />
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
            <NoteEditor
              note={noteData}
              tagList={tags}
              closeEditor={closeEditor}
            />,
            document.body
          )}
      </div>
    </>
  );
};

export default Note;
