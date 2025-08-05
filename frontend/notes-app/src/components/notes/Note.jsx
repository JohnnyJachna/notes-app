import NoteHeader from "./NoteHeader";
import NoteContent from "./NoteContent";
import NoteSources from "./NoteSources";
import NoteTags from "./NoteTags";
import NoteDate from "./NoteDate";

const Note = () => {
  return (
    <>
      <NoteHeader />
      <NoteContent />
      <NoteSources />
      <NoteTags />
      <NoteDate />
    </>
  );
};

export default Note;
