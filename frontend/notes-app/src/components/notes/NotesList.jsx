import Note from "./Note";

const NotesList = ({ notesList }) => {
  return (
    <>
      <h4>Notes List</h4>
      {notesList.map((note) => (
        <Note id={note.id} key={note.id} />
      ))}
    </>
  );
};

export default NotesList;
