const NoteContentEditor = ({ content, setContent }) => (
  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
    placeholder="Content"
  />
);

export default NoteContentEditor;
