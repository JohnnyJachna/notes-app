const NoteHeaderEditor = ({ header, setHeader }) => (
  <input
    value={header}
    onChange={(e) => setHeader(e.target.value)}
    placeholder="Header"
  />
);

export default NoteHeaderEditor;
