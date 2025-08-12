import { useState, useEffect } from "react";
import { useAPI } from "../../utils/api";

import styles from "../css-modules/NoteEditor.module.css";
import NoteTags from "./NoteTags";
import Button from "../Button";

const NoteEditor = ({ note, tagList, closeEditor }) => {
  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);
  const [noteTags, setNoteTags] = useState(note.tags);
  const [noteSources, setNoteSources] = useState(note.sources);
  const [tags, setTags] = useState(tagList);
  const [addableTags, setAddableTags] = useState();
  const [tagSelection, setTagSelection] = useState();
  const [tagsAvailable, setTagsAvailable] = useState(false);

  const { makeRequest } = useAPI();

  useEffect(() => {
    getAddableTags();
  }, []);

  const getAddableTags = () => {
    const addable = tags.filter(
      (option) => !noteTags.some((noteTag) => noteTag.id === option.id)
    );

    if (addable && addable.length > 0) {
      setTagsAvailable(true);
      setAddableTags(addable);
      setTagSelection(addable[0].id);
    }
  };

  const addTag = async () => {
    try {
      console.log(tagSelection);
      await makeRequest(
        `sets/${note.set_id}/notes/${note.id}/tags/${tagSelection}`,
        {
          method: "POST",
          body: tagSelection,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeTag = async (id) => {
    try {
      await makeRequest(`sets/${note.set_id}/notes/${note.id}/tags/${id}`, {
        method: "DELETE",
        body: tagSelection,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      tags: noteTags,
      sources: noteSources,
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
      <NoteTags tags={noteTags} editable={true} removeTag={removeTag} />
      <>
        {tagsAvailable ? (
          <>
            <select
              value={tagSelection}
              onChange={(e) => setTagSelection(e.target.value)}
            >
              {addableTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <Button type="button" name="Add" onClick={addTag} />
          </>
        ) : (
          <p>Click edit to add a tag</p>
        )}
      </>
      <Button type="button" name="Done" onClick={handleClick} />
    </div>
  );
};

export default NoteEditor;
