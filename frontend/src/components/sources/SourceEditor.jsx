import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateSourceAtom } from "./SourcesAtoms";

import Button from "../Button";
import styles from "../css-modules/NoteEditor.module.css";

const SourceEditor = ({ sourceAtom, handleCloseEditor }) => {
  const source = useAtomValue(sourceAtom);
  const updateSource = useSetAtom(updateSourceAtom);

  const [name, setName] = useState(source.name);
  const [color, setColor] = useState(source.color);
  const [title, setTitle] = useState(source.title);
  const [authors, setAuthors] = useState(source.authors);
  const [publishers, setPublishers] = useState(source.publishers);
  const [pages, setPages] = useState(source.pages);
  const [publishDate, setPublishDate] = useState(source.publish_date);
  const [updateDate, setUpdateDate] = useState(source.update_date);
  const [accessDate, setAccessDate] = useState(source.access_date);

  const handleCancel = () => {
    setName(source.name);
    setColor(source.color);
    setTitle(source.title);
    setAuthors(source.authors);
    setPublishers(source.publishers);
    setPages(source.pages);
    setPublishDate(source.publish_date);
    setUpdateDate(source.update_date);
    setAccessDate(source.access_date);
    handleCloseEditor();
  };

  const handleSave = async () => {
    const originalSource = source;
    await updateSource({
      originalSource,
      name,
      color,
      title,
      authors,
      publishers,
      pages,
      publishDate,
      updateDate,
      accessDate,
    });
    handleCloseEditor();
  };

  return (
    <div className={styles.editor}>
      <div>
        <textarea
          id="Name"
          placeholder="Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
        <textarea
          id="Title"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <textarea
          id="Author"
          placeholder="Author..."
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
        ></textarea>
        <textarea
          id="Publisher"
          placeholder="Publisher..."
          value={publishers}
          onChange={(e) => setPublishers(e.target.value)}
        ></textarea>
        <textarea
          id="Pages"
          placeholder="Pages..."
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        ></textarea>
        <textarea
          id="Publish Date"
          placeholder="Publish Date..."
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        ></textarea>
        <textarea
          id="Update Date"
          placeholder="Update Date..."
          value={updateDate}
          onChange={(e) => setUpdateDate(e.target.value)}
        ></textarea>
        <textarea
          id="Access Date"
          placeholder="Access Date..."
          value={accessDate}
          onChange={(e) => setAccessDate(e.target.value)}
        ></textarea>
      </div>
      <Button type="button" name="Save" onClick={handleSave} />
      <Button type="button" name="Cancel" onClick={handleCancel} />
    </div>
  );
};

export default SourceEditor;
