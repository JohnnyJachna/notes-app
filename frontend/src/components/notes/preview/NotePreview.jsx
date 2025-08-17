import { useAtomValue } from "jotai/react";
import NoteTagsPreview from "./NoteTagsPreview";
import NoteSourcesPreview from "./NoteSourcesPreview";
import styles from "../../css-modules/NotePreview.module.css";

const NotePreview = ({ noteAtom }) => {
  const note = useAtomValue(noteAtom);

  return (
    <div className={styles.note_preview}>
      <p>Header: {note.header}</p>
      <NoteTagsPreview tags={note.tags} />
      <NoteSourcesPreview sources={note.sources} />
      <p>Last Edit: {note.update_date}</p>
    </div>
  );
};

export default NotePreview;
