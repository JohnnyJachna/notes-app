import { useState } from "react";
import { useEffect } from "react";

import styles from "../css-modules/NoteEditor.module.css";
import Button from "../Button";

const NoteEditor = ({ note, closeEditor }) => {
  const [header, setHeader] = useState();
  const [content, setContent] = useState();
  const [sources, setSources] = useState();
  const [tags, setTags] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    setHeader(note.header);
    setContent(note.content);
    setSources(note.sources);
    setTags(note.tags);
    setDate(note.date);
  }, []);

  const updateHeader = (e) => {
    setHeader(e.target.value);
  };
  const updateContent = (e) => {
    setContent(e.target.value);
  };
  const updateSources = (e) => {
    setSources(e.target.value);
  };
  const updateTags = (e) => {
    setTags(e.target.value);
  };
  const updateDate = (e) => {
    setDate(e.target.value);
  };

  const handleClick = () => {
    closeEditor({
      id: note.id,
      header: header,
      content: content,
      sources: sources,
      tags: tags,
      date: date,
    });
  };

  return (
    <div className={styles.editor}>
      <textarea
        id="Header"
        placeholder="Header..."
        value={header}
        onChange={updateHeader}
      ></textarea>
      <textarea
        id="Content"
        placeholder="Content..."
        value={content}
        onChange={updateContent}
      ></textarea>
      <textarea
        id="Sources"
        placeholder="Sources..."
        value={sources}
        onChange={updateSources}
      ></textarea>
      <textarea
        id="Tags"
        placeholder="Tags..."
        value={tags}
        onChange={updateTags}
      ></textarea>
      <textarea
        id="Date"
        placeholder="Date..."
        value={date}
        onChange={updateDate}
      ></textarea>
      <Button type="button" name="Close" onClick={handleClick} />
    </div>
  );
};

export default NoteEditor;
