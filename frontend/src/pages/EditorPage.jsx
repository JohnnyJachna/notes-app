import NotesSection from "../components/notes/NotesSection";
import SourcesSection from "../components/sources/SourcesSection";
import TagsSection from "../components/tags/TagsSection";

const Editor = () => {
  return (
    <>
      <h3>Editor Page</h3>
      <NotesSection />
      <SourcesSection />
      <TagsSection />
    </>
  );
};

export default Editor;
