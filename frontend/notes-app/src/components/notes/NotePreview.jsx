import NoteHeader from "./NoteHeader";
import NoteSources from "./NoteSources";
import NoteTags from "./NoteTags";
import NoteDate from "./NoteDate";

const NotePreview = () => {
  return (
    <>
      <NoteHeader />
      <NoteSources />
      <NoteTags />
      <NoteDate />
    </>
  );
};

export default NotePreview;
