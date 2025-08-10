import { useState } from "react";
import { useAPI } from "../../utils/api";

import styles from "../css-modules/NoteEditor.module.css";
import Button from "../Button";

const NoteEditor = ({ note, closeEditor }) => {
  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);

  const { makeRequest } = useAPI();

  const updateData = async (date) => {
    const body = {
      id: note.id,
      update_date: date,
    };

    if (header !== note.header) {
      body.header = header;
    }
    if (content !== note.content) {
      body.content = content;
    }

    try {
      await makeRequest(`sets/${note.set_id}/notes`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    const updatedNote = {
      header: header,
      content: content,
      update_date: note.update_date,
    };

    if (header !== note.header || content !== note.content) {
      updatedNote.update_date = new Date().toLocaleString();
      updateData(updatedNote.update_date);
    }

    closeEditor(updatedNote);
  };

  return (
    <div className={styles.editor}>
      <textarea
        id="Header"
        placeholder="Header..."
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      ></textarea>
      <textarea
        id="Content"
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <Button type="button" name="Done" onClick={handleClick} />
    </div>
  );
};

export default NoteEditor;
