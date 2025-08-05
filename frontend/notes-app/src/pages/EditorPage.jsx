import NotesList from "../components/notes/NotesList";
import SourceList from "../components/sources/SourcesList";
import TagsList from "../components/tags/TagsList";

const Editor = () => {
  return (
    <>
      <h3>Editor Page</h3>
      <NotesList />
      <SourceList />
      <TagsList />
    </>
  );
};

export default Editor;
