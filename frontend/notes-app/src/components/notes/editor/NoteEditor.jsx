import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { tagsAtom } from "../../tags/TagsAtoms";
import { sourcesAtom } from "../../sources/SourcesAtoms";
import { updateNoteAtom } from "../NotesAtoms";
import NoteHeaderEditor from "./NoteHeaderEditor";
import NoteContentEditor from "./NoteContentEditor";
import NoteTagsEditor from "./NoteTagsEditor";
import NoteSourcesEditor from "./NoteSourcesEditor";
import Button from "../../Button";
import styles from "../../css-modules/NoteEditor.module.css";

const NoteEditor = ({ noteAtom, handleCloseEditor }) => {
  const note = useAtomValue(noteAtom);
  const updateNote = useSetAtom(updateNoteAtom);

  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);
  const [noteTags, setNoteTags] = useState(note.tags);
  const [noteSources, setNoteSources] = useState(note.sources);

  const handleCancel = () => {
    setHeader(note.header);
    setContent(note.content);
    setNoteTags(note.tags);
    setNoteSources(note.sources);
    handleCloseEditor();
  };

  const handleSave = async () => {
    await updateNote({
      note,
      header,
      content,
      tags: noteTags,
      sources: noteSources,
    });
    handleCloseEditor();
  };

  return (
    <div className={styles.editor}>
      <h3>Edit Note</h3>
      <NoteHeaderEditor header={header} setHeader={setHeader} />
      <NoteContentEditor content={content} setContent={setContent} />
      <NoteTagsEditor
        tags={noteTags}
        setTags={setNoteTags}
        allTags={useAtomValue(tagsAtom)}
      />
      <NoteSourcesEditor
        sources={noteSources}
        setSources={setNoteSources}
        allSources={useAtomValue(sourcesAtom)}
      />
      <Button type="button" name="Save" onClick={handleSave} />
      <Button type="button" name="Cancel" onClick={handleCancel} />
    </div>
  );
};

export default NoteEditor;
