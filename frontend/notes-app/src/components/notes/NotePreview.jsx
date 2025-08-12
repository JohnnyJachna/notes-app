// import NoteHeader from "./NoteHeader";
// import NoteSources from "./NoteSources";
import NoteTags from "./NoteTags";
// import NoteDate from "./NoteDate";
import styles from "../css-modules/NotePreview.module.css";

const NotePreview = ({ note }) => {
  return (
    <div className={styles.note_preview}>
      <p>Header: {note.header}</p>
      <p>Sources: </p>
      <NoteTags tags={note.tags} />
      <p>Last Edit: {note.update_date}</p>
    </div>
  );
};

export default NotePreview;
