import { useState } from "react";
import { useEffect } from "react";

import styles from "../css-modules/NoteEditor.module.css";
import Button from "../Button";

const NoteEditor = ({ note, closeEditor }) => {
  const [header, setHeader] = useState();
  const [content, setContent] = useState();
  const [sources, setSources] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    setHeader(note.header);
    setContent(note.content);
    setSources(note.sources);
    setTags(note.tags);
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
  const getDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleTimeString();
  };

  const handleClick = () => {
    closeEditor({
      id: note.id,
      header: header,
      content: content,
      sources: sources,
      tags: tags,
      date: getDate(),
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
      <Button type="button" name="Done" onClick={handleClick} />
    </div>
  );
};

export default NoteEditor;
