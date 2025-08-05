import Note from "./Note";

const NotesList = ({ notesList, handleDeleteNote }) => {
  return (
    <>
      <h4>Notes List</h4>
      {notesList.map((note) => (
        <Note id={note.id} key={note.id} handleDeleteNote={handleDeleteNote} />
      ))}
    </>
  );
};

export default NotesList;
